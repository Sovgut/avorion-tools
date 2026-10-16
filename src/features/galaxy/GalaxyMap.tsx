// Pan/zoom canvas of the whole galaxy: one pixel per sector at the base, overlays drawn per frame.
import { type PointerEvent as RPointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { db } from '@/game/database';
import { useGameText, useT } from '@/i18n';
import s from './galaxy.module.css';
import {
  FLAG_CENTRAL,
  FLAG_HOME,
  type GalaxyData,
  inGalaxy,
  KIND_BLOCKED,
  KIND_OFFGRID,
  KIND_REGULAR,
  MAX,
  MIN,
  SECTORS,
  SIZE,
  sectorIndex,
  sectorX,
  sectorY,
} from './model';
import { resolveColor } from './queries';

export interface MapMarkers {
  /** Sector indices per layer color, each drawn as a filled cell. */
  layers: { color: string; sectors: number[] }[];
  /** Rings where each material's asteroids stop appearing. */
  belts: boolean;
  you: { x: number; y: number };
  selected: { x: number; y: number } | null;
  /** Dashed route from you to a sector. */
  route: { x: number; y: number } | null;
}

interface View {
  /** Pixels per sector. */
  scale: number;
  /** Sector coordinates at the canvas center. */
  cx: number;
  cy: number;
}

const BARRIER = 150;
const MAX_SCALE = 48;
/** From this many pixels per sector a click picks exactly the cell under the pointer. */
const EXACT_PICK_SCALE = 10;
/** Below that, a click snaps to a sector with stations within this many screen pixels. */
const SNAP_PX = 8;
/** Movement beyond this many pixels turns a press into a pan; a finger wobbles more than a mouse. */
const DRAG_PX = { mouse: 6, touch: 10 } as const;

/** Faint tints for the material belts, after the materials' colours in the game. */
const BELT_COLORS: Record<string, string> = {
  Iron: 'rgba(196,140,96,0.07)',
  Titanium: 'rgba(225,228,235,0.05)',
  Naonite: 'rgba(90,210,110,0.07)',
  Trinium: 'rgba(80,170,255,0.08)',
  Xanion: 'rgba(255,215,70,0.08)',
  Ogonite: 'rgba(255,130,50,0.09)',
  Avorion: 'rgba(255,60,90,0.11)',
};

/** Lightness of faction territory: the central area a faction controls strongly, then its outskirts. */
const CENTRAL_LIGHT = 0.17;
const OUTER_LIGHT = 0.1;

function factionColor(index: number, light: number): [number, number, number] {
  // a stable, muted hue per faction
  let h = (index * 2654435761) >>> 0;
  h = (h ^ (h >>> 15)) >>> 0;
  const hue = (h % 360) / 360;
  const sat = 0.32;
  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
  const p = 2 * light - q;
  const tc = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(tc(hue + 1 / 3) * 255), Math.round(tc(hue) * 255), Math.round(tc(hue - 1 / 3) * 255)];
}

/** The base image: territory tint, rifts, hidden and regular sectors; y grows upward. */
function renderBase(g: GalaxyData): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = SIZE;
  c.height = SIZE;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(SIZE, SIZE);
  const d = img.data;
  const tints = new Map<number, [number, number, number]>();
  for (let i = 0; i < SECTORS; i++) {
    const x = i % SIZE;
    const row = SIZE - 1 - Math.floor(i / SIZE);
    const o = (row * SIZE + x) * 4;
    const f = g.flags[i];
    const kind = f & 3;
    let r = 11;
    let gg = 11;
    let b = 12;
    const fi = g.faction[i];
    if (fi) {
      // as on the game's map, the faction's central area is brighter than its outskirts
      const central = (f & FLAG_CENTRAL) !== 0;
      const key = fi * 2 + (central ? 1 : 0);
      let tint = tints.get(key);
      if (!tint) {
        tint = factionColor(fi, central ? CENTRAL_LIGHT : OUTER_LIGHT);
        tints.set(key, tint);
      }
      [r, gg, b] = tint;
    }
    if (kind === KIND_BLOCKED) {
      // rifts are empty space cutting through territory, as on the game's map
      r = 11;
      gg = 11;
      b = 12;
    } else if (kind === KIND_OFFGRID) {
      r += 16;
      gg += 16;
      b += 18;
    } else if (kind === KIND_REGULAR) {
      r = 110;
      gg = 110;
      b = 118;
      if (f & FLAG_HOME) {
        r = 236;
        gg = 236;
        b = 238;
      }
    }
    d[o] = r;
    d[o + 1] = gg;
    d[o + 2] = b;
    d[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export function GalaxyMap({
  galaxy,
  markers,
  onSelect,
  focusOn,
}: {
  galaxy: GalaxyData;
  markers: MapMarkers;
  onSelect: (x: number, y: number) => void;
  focusOn: { x: number; y: number } | null;
}) {
  const t = useT();
  const gt = useGameText();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const base = useMemo(() => renderBase(galaxy), [galaxy]);
  const [view, setView] = useState<View | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ moved: boolean; startX: number; startY: number; slop: number; pinch?: number } | null>(null);

  // track the container size
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const fitView = (w: number, h: number): View => ({ scale: Math.min(w, h) / (SIZE + 40), cx: 0.5, cy: 0.5 });
  const v = view ?? (size.w > 0 ? fitView(size.w, size.h) : null);

  // fly to a requested sector once the canvas has a size
  const [flown, setFlown] = useState<{ x: number; y: number } | null>(null);
  if (focusOn && focusOn !== flown && size.w > 0) {
    setFlown(focusOn);
    setView({ scale: Math.max(view?.scale ?? 0, Math.min(size.w, size.h) / 120), cx: focusOn.x, cy: focusOn.y });
  }

  // draw
  useEffect(() => {
    const c = canvas.current;
    if (!c || !v) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.round(size.w * dpr);
    c.height = Math.round(size.h * dpr);
    const ctx = c.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, size.w, size.h);
    const sx = (x: number) => size.w / 2 + (x - v.cx) * v.scale;
    const sy = (y: number) => size.h / 2 - (y - v.cy) * v.scale;
    // base image: pixel (0,0) is sector (MIN, MAX)
    ctx.imageSmoothingEnabled = v.scale < 1;
    ctx.drawImage(base, sx(MIN - 0.5), sy(MAX + 0.5), SIZE * v.scale, SIZE * v.scale);

    // rings and barrier
    const ox = sx(0);
    const oy = sy(0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(66,66,70,0.6)';
    for (const r of [500, 400, 300, 200]) {
      ctx.beginPath();
      ctx.arc(ox, oy, r * v.scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    // material belts: each material tints the ring where it is the best one available, and a dashed
    // line marks where its asteroids end
    if (markers.belts) {
      // the outer belts reach past the galaxy's corners; tint only the galaxy itself
      ctx.save();
      ctx.beginPath();
      ctx.rect(sx(MIN - 0.5), sy(MAX + 0.5), SIZE * v.scale, SIZE * v.scale);
      ctx.clip();
      db.materials.forEach((m, k) => {
        const inner = Math.max(0, ...db.materials.slice(k + 1).map((n) => n.max));
        if (m.max <= inner) return;
        ctx.fillStyle = BELT_COLORS[m.name] ?? 'rgba(214,201,170,0.06)';
        ctx.beginPath();
        ctx.arc(ox, oy, m.max * v.scale, 0, Math.PI * 2);
        ctx.arc(ox, oy, inner * v.scale, 0, Math.PI * 2, true);
        ctx.fill();
      });
      ctx.restore();
      ctx.setLineDash([2, 5]);
      ctx.lineWidth = 1;
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      for (const m of db.materials) {
        if (m.max >= 707) continue;
        ctx.strokeStyle = 'rgba(214,201,170,0.55)';
        ctx.beginPath();
        ctx.arc(ox, oy, m.max * v.scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(214,201,170,0.85)';
        ctx.fillText(gt.text(m.name).toUpperCase(), ox, oy + m.max * v.scale - 4);
      }
      ctx.setLineDash([]);
    }
    const barrier = resolveColor('var(--c-barrier)');
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = barrier;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(ox, oy, BARRIER * v.scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = barrier;
    ctx.fillText(t('BARRIER'), ox, oy - BARRIER * v.scale - 8);
    ctx.fillStyle = '#85858b';
    ctx.fillText(t('CORE'), ox, oy + 4);

    // layer sectors fill their whole cell, bottom layer first; zoomed far out a cell stays 3px so it shows
    const side = Math.max(3, v.scale);
    for (const layer of [...markers.layers].reverse()) {
      ctx.fillStyle = resolveColor(layer.color);
      for (const i of layer.sectors) {
        const px = sx(sectorX(i));
        const py = sy(sectorY(i));
        if (px < -side || py < -side || px > size.w + side || py > size.h + side) continue;
        ctx.fillRect(px - side / 2, py - side / 2, side, side);
      }
    }

    // grid and coordinates when zoomed in, over the fills
    if (v.scale >= 14) {
      ctx.strokeStyle = 'rgba(48,48,51,0.7)';
      ctx.lineWidth = 1;
      const x0 = Math.floor(v.cx - size.w / 2 / v.scale);
      const x1 = Math.ceil(v.cx + size.w / 2 / v.scale);
      const y0 = Math.floor(v.cy - size.h / 2 / v.scale);
      const y1 = Math.ceil(v.cy + size.h / 2 / v.scale);
      ctx.beginPath();
      for (let x = x0; x <= x1; x++) {
        ctx.moveTo(sx(x - 0.5), 0);
        ctx.lineTo(sx(x - 0.5), size.h);
      }
      for (let y = y0; y <= y1; y++) {
        ctx.moveTo(0, sy(y - 0.5));
        ctx.lineTo(size.w, sy(y - 0.5));
      }
      ctx.stroke();
      // coordinates on regular sectors, sized so the longest label on screen fits its cell with a
      // margin (mono glyphs are 0.6em wide); too small to read, they are left out
      const labels: { x: number; y: number; text: string }[] = [];
      let longest = 0;
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          if (!inGalaxy(x, y) || (galaxy.flags[sectorIndex(x, y)] & 3) !== KIND_REGULAR) continue;
          const text = `${x}:${y}`;
          labels.push({ x, y, text });
          longest = Math.max(longest, text.length);
        }
      const fontPx = Math.min(11, (v.scale - 6) / (longest * 0.6));
      if (labels.length > 0 && fontPx >= 6) {
        ctx.font = `600 ${fontPx}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // regular sectors are light grey, white or a layer colour, so dark text reads on all of them
        ctx.fillStyle = 'rgba(17,17,18,0.8)';
        for (const l of labels) ctx.fillText(l.text, sx(l.x), sy(l.y));
        ctx.textBaseline = 'alphabetic';
      }
    }

    const cyan = resolveColor('var(--c-cyan)');
    const you = markers.you;
    if (markers.route) {
      ctx.setLineDash([8, 6]);
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx(you.x), sy(you.y));
      ctx.lineTo(sx(markers.route.x), sy(markers.route.y));
      ctx.stroke();
      ctx.setLineDash([]);
    }
    if (markers.selected) {
      // a square just outside the cell's edges; zoomed out, never smaller than 14px so it stays visible
      const half = Math.max(7, v.scale / 2 + 1);
      ctx.strokeStyle = '#ececee';
      ctx.lineWidth = 2;
      ctx.strokeRect(sx(markers.selected.x) - half, sy(markers.selected.y) - half, half * 2, half * 2);
    }
    const yx = sx(you.x);
    const yy = sy(you.y);
    ctx.strokeStyle = cyan;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(yx, yy, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(yx - 14, yy);
    ctx.lineTo(yx + 14, yy);
    ctx.moveTo(yx, yy - 14);
    ctx.lineTo(yx, yy + 14);
    ctx.stroke();
    ctx.fillStyle = cyan;
    ctx.textAlign = 'left';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText(`${t('YOU')} ${you.x}:${you.y}`, yx + 12, yy - 12);
  }, [v, size, markers, galaxy, base, t, gt]);

  const toSector = (at: View, clientX: number, clientY: number) => {
    const rect = canvas.current!.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    return { x: at.cx + (px - size.w / 2) / at.scale, y: at.cy - (py - size.h / 2) / at.scale };
  };

  const zoomAt = (clientX: number, clientY: number, factor: number) => {
    if (!v) return;
    const before = toSector(v, clientX, clientY);
    const scale = Math.max(fitView(size.w, size.h).scale * 0.8, Math.min(MAX_SCALE, v.scale * factor));
    const rect = canvas.current!.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    setView({ scale, cx: before.x - (px - size.w / 2) / scale, cy: before.y + (py - size.h / 2) / scale });
  };

  // wheel needs a non-passive listener to prevent page scroll
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0015));
    };
    c.addEventListener('wheel', onWheel, { passive: false });
    return () => c.removeEventListener('wheel', onWheel);
  });

  const onPointerDown = (e: RPointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    drag.current = {
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      slop: e.pointerType === 'mouse' ? DRAG_PX.mouse : DRAG_PX.touch,
    };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      drag.current.pinch = Math.hypot(a.x - b.x, a.y - b.y);
      drag.current.moved = true;
    }
  };

  const onPointerMove = (e: RPointerEvent<HTMLCanvasElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev || !v || !drag.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && drag.current.pinch) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, dist / drag.current.pinch);
      drag.current.pinch = dist;
      return;
    }
    if (Math.hypot(e.clientX - drag.current.startX, e.clientY - drag.current.startY) > drag.current.slop) drag.current.moved = true;
    if (drag.current.moved) setView({ ...v, cx: v.cx - (e.clientX - prev.x) / v.scale, cy: v.cy + (e.clientY - prev.y) / v.scale });
  };

  const onPointerUp = (e: RPointerEvent<HTMLCanvasElement>) => {
    pointers.current.delete(e.pointerId);
    const d = drag.current;
    if (pointers.current.size === 0) drag.current = null;
    if (d && !d.moved && v) {
      const p = toSector(v, e.clientX, e.clientY);
      // sector centres sit on whole coordinates, so the cell under the pointer is the rounded point
      const rx = Math.round(p.x);
      const ry = Math.round(p.y);
      let best: { x: number; y: number; d: number } | null = null;
      // zoomed out, cells are a few pixels wide: snap to a nearby station dot so it can be hit at all
      if (v.scale < EXACT_PICK_SCALE) {
        const radius = Math.ceil(SNAP_PX / v.scale);
        for (let y = ry - radius; y <= ry + radius; y++) {
          for (let x = rx - radius; x <= rx + radius; x++) {
            if (!inGalaxy(x, y) || (galaxy.flags[sectorIndex(x, y)] & 3) !== KIND_REGULAR) continue;
            const dd = Math.hypot(x - p.x, y - p.y) * v.scale;
            if (dd <= SNAP_PX && (!best || dd < best.d)) best = { x, y, d: dd };
          }
        }
      }
      if (best) onSelect(best.x, best.y);
      else if (inGalaxy(rx, ry)) onSelect(rx, ry);
    }
  };

  return (
    <div ref={wrap} className={s.mapWrap}>
      <canvas
        ref={canvas}
        className={s.canvas}
        style={{ width: size.w, height: size.h }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div className={s.zoomBtns}>
        <button
          type="button"
          aria-label="+"
          onClick={() =>
            v &&
            zoomAt(canvas.current!.getBoundingClientRect().left + size.w / 2, canvas.current!.getBoundingClientRect().top + size.h / 2, 1.6)
          }
        >
          +
        </button>
        <button
          type="button"
          aria-label="−"
          onClick={() =>
            v &&
            zoomAt(
              canvas.current!.getBoundingClientRect().left + size.w / 2,
              canvas.current!.getBoundingClientRect().top + size.h / 2,
              1 / 1.6,
            )
          }
        >
          −
        </button>
        <button type="button" aria-label={t('Reset view')} title={t('Reset view')} onClick={() => setView(null)}>
          ⟲
        </button>
      </div>
    </div>
  );
}
