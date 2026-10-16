import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useGo } from '@/app/nav';
import { type Plan, usePlan } from '@/features/planner/plan';
import { db, goodById, goodIcon, productionByIndex, stationByProduction } from '@/game/database';
import { fmt, useGameText, useT } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { DEFAULT_GALAXY, settingsActions } from '@/store/settings';
import { Button, CoordInput, GameIcon, NumberInput, Switch, TextInput } from '@/ui';
import { useIsMobile } from '@/ui/hooks';
import { useGalaxy } from './client';
import { GalaxyMap, type MapMarkers } from './GalaxyMap';
import s from './galaxy.module.css';
import {
  FLAG_ANCIENT_GATES,
  FLAG_GATES,
  FLAG_HOME,
  type GalaxyData,
  inGalaxy,
  KIND_BLOCKED,
  KIND_OFFGRID,
  KIND_REGULAR,
  sectorIndex,
} from './model';
import { ALL_LAYERS, hasLayer, nearestProducers, PLAN_LAYER, stationSectorAt } from './queries';
import { templateName } from './templates';

function parseSel(v: string | null): { x: number; y: number } | null {
  const m = v ? /^(-?\d+):(-?\d+)$/.exec(v) : null;
  if (!m) return null;
  const x = Number(m[1]);
  const y = Number(m[2]);
  return inGalaxy(x, y) ? { x, y } : null;
}

interface Best {
  good: string;
  buy: number;
  x: number;
  y: number;
  distance: number;
  station: string;
}

function useBest(galaxy: GalaxyData | undefined, plan: Plan): Best[] {
  const gt = useGameText();
  return useMemo(() => {
    if (!galaxy) return [];
    const out: Best[] = [];
    for (const r of plan.rows) {
      if (r.buy <= 0) continue;
      const [n] = nearestProducers(galaxy, r.good, plan.position, 1);
      if (!n) continue;
      const st = stationByProduction.get(n.productions[0]);
      out.push({ good: r.good, buy: r.buy, x: n.x, y: n.y, distance: n.distance, station: st ? gt.station(st) : '' });
    }
    return out.sort((a, b) => a.distance - b.distance);
  }, [galaxy, plan, gt]);
}

export function GalaxyPage() {
  const t = useT();
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const params = useAppSelector((st) => st.settings.galaxy);
  const layers = useAppSelector((st) => st.settings.layers);
  const galaxy = useGalaxy();
  const plan = usePlan();
  const [search, setSearch] = useSearchParams();
  const selected = parseSel(search.get('sel'));
  const focus = search.get('focus');
  // a link with `go` flies the map to the sector once, from another page or from this one
  const goTo = search.get('go') ? search.get('sel') : null;
  const [jump, setFly] = useState<{ x: number; y: number } | null>(null);
  const [seenGo, setSeenGo] = useState<string | null>(null);
  if (goTo !== seenGo) {
    setSeenGo(goTo);
    if (goTo) setFly(parseSel(goTo));
  }
  useEffect(() => {
    if (!search.get('go')) return;
    const next = new URLSearchParams(search);
    next.delete('go');
    setSearch(next, { replace: true });
  }, [search, setSearch]);
  const [draft, setDraft] = useState(params?.seed ?? '');
  const [factions, setFactions] = useState(params?.mapFactions ?? DEFAULT_GALAXY.mapFactions);
  const [rifts, setRifts] = useState(params?.rifts ?? DEFAULT_GALAXY.rifts);
  const [barrier, setBarrier] = useState(params?.barrier ?? DEFAULT_GALAXY.barrier);
  const [showServer, setShowServer] = useState(false);

  const generate = () => {
    const seed = draft.trim();
    if (!seed) return;
    dispatch(settingsActions.setGalaxy({ seed, mapFactions: factions, rifts, barrier }));
  };

  const data = galaxy.state === 'ready' ? galaxy.data : undefined;
  const best = useBest(data, plan);
  const route = focus ? best.find((b) => b.good === focus) : undefined;

  const markers = useMemo<MapMarkers>(() => {
    const out: MapMarkers['layers'] = [];
    if (data) {
      const planGoods = new Set(plan.rows.filter((r) => r.buy > 0).map((r) => r.good));
      for (const layer of ALL_LAYERS) {
        if (!layers.includes(layer.id)) continue;
        const sectors: number[] = [];
        for (const st of data.stations) {
          if (layer === PLAN_LAYER) {
            const hit = [...st.factories, ...st.mines].some((pi) => productionByIndex.get(pi)?.results.some((r) => planGoods.has(r.good)));
            if (hit) sectors.push(st.i);
          } else if (hasLayer(data, st, layer)) sectors.push(st.i);
        }
        out.push({ color: layer.color, sectors });
      }
    }
    return { layers: out, you: plan.position, selected, route: route ? { x: route.x, y: route.y } : null };
  }, [data, layers, plan, selected, route]);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    if (!data) return c;
    const planGoods = new Set(plan.rows.filter((r) => r.buy > 0).map((r) => r.good));
    for (const layer of ALL_LAYERS) {
      let n = 0;
      for (const st of data.stations) {
        if (
          layer === PLAN_LAYER
            ? [...st.factories, ...st.mines].some((pi) => productionByIndex.get(pi)?.results.some((r) => planGoods.has(r.good)))
            : hasLayer(data, st, layer)
        )
          n++;
      }
      c.set(layer.id, n);
    }
    return c;
  }, [data, plan]);

  const select = (x: number, y: number) => {
    const next = new URLSearchParams(search);
    next.set('sel', `${x}:${y}`);
    setSearch(next, { replace: true });
  };
  const focusGood = (b: Best) => {
    const next = new URLSearchParams(search);
    next.set('sel', `${b.x}:${b.y}`);
    next.set('focus', b.good);
    setSearch(next, { replace: true });
    setFly({ x: b.x, y: b.y });
  };

  const seedBox = (
    <div className={mobile ? s.mSeedRow : s.seedBox}>
      {!mobile && <span className="label">{t('GALAXY SEED')}</span>}
      <TextInput
        className={mobile ? s.mSeed : s.seed}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && generate()}
        placeholder={t('/seed in game')}
        aria-label={t('GALAXY SEED')}
        spellCheck={false}
      />
      <Button variant="primary" className={mobile ? s.mGenerate : s.generate} onClick={generate} disabled={!draft.trim()}>
        {t('Generate')}
      </Button>
      {!mobile && (
        <span className={s.help}>
          {t('Type')} <span className="mono">/seed</span>{' '}
          {t('in the game chat to get it. Shows the galaxy as it was generated, before players changed it.')}
        </span>
      )}
      <button type="button" className={s.serverToggle} aria-expanded={showServer} onClick={() => setShowServer((v) => !v)}>
        {t('Server settings')} {showServer ? '▴' : '▾'}
      </button>
      {showServer && (
        <div className={s.server}>
          <label className={s.serverRow}>
            <span>{t('Factions')}</span>
            <NumberInput className={s.serverNum} value={factions} onValue={setFactions} max={5000} />
          </label>
          <label className={s.serverRow}>
            <span>{t('Rifts')}</span>
            <NumberInput className={s.serverNum} value={rifts} onValue={setRifts} max={5000} />
          </label>
          <div className={s.serverRow}>
            <span>{t('Barrier')}</span>
            <Switch checked={barrier} onChange={setBarrier} label={t('Barrier')} />
          </div>
        </div>
      )}
    </div>
  );

  const layerList = (
    <div className={mobile ? s.mLayers : s.layers}>
      {!mobile && <span className={`label ${s.layersLabel}`}>{t('LAYERS')}</span>}
      {ALL_LAYERS.map((l) => {
        const on = layers.includes(l.id);
        return (
          <button
            key={l.id}
            type="button"
            className={mobile ? s.mLayer : s.layer}
            aria-pressed={on}
            onClick={() => dispatch(settingsActions.toggleLayer(l.id))}
          >
            <span className={s.layerDot} style={{ background: on ? l.color : 'var(--c-border-strong)' }} />
            <span className={s.layerName}>{t(l.name)}</span>
            {!mobile && data && <span className={s.layerCount}>{fmt(counts.get(l.id) ?? 0)}</span>}
          </button>
        );
      })}
    </div>
  );

  const mapArea = (
    <div className={mobile ? s.mMapBox : s.mapArea}>
      {!mobile && (
        <div className={s.mapHead}>
          <span>
            {params ? (
              <>
                {t('SEED')} <span className={s.seedValue}>{params.seed}</span>
                {data && (
                  <>
                    {' '}
                    · {fmt(data.stations.length)} {t('sectors with stations')}
                  </>
                )}
              </>
            ) : null}
          </span>
          <span>{t('click a sector')}</span>
        </div>
      )}
      {data ? (
        <GalaxyMap key={data.key.seed + JSON.stringify(data.key)} galaxy={data} markers={markers} onSelect={select} focusOn={jump} />
      ) : (
        <div className={s.placeholder}>
          {galaxy.state === 'loading' ? (
            <div className={s.progressBox}>
              <div className={s.progressLabel}>
                {t('Generating galaxy…')} {Math.round(galaxy.progress * 100)}%
              </div>
              <div className={s.progress}>
                <div className={s.progressBar} style={{ width: `${Math.max(2, galaxy.progress * 100)}%` }} />
              </div>
              <div className={s.help}>
                {t('The map is computed by the game’s own generation scripts, sector by sector, the way the server creates them.')}
              </div>
            </div>
          ) : galaxy.state === 'error' ? (
            <div className={s.error}>{galaxy.message}</div>
          ) : (
            <div className={s.help}>{t('Enter the server seed to map your galaxy.')}</div>
          )}
        </div>
      )}
    </div>
  );

  const details =
    data && selected ? <SectorPanel galaxy={data} x={selected.x} y={selected.y} from={plan.position} mobile={mobile} /> : null;
  const bestList = <BestList best={best} plan={plan} active={focus} onPick={focusGood} mobile={mobile} />;

  if (mobile) {
    return (
      <div className={s.mPage}>
        {seedBox}
        {mapArea}
        {layerList}
        <PositionBox plan={plan} mobile />
        {details}
        {bestList}
      </div>
    );
  }

  return (
    <div className={s.grid}>
      <aside className={s.rail}>
        {seedBox}
        {layerList}
        <PositionBox plan={plan} />
      </aside>
      {mapArea}
      <aside className={s.panel}>
        {details}
        {bestList}
      </aside>
    </div>
  );
}

function SectorPanel({
  galaxy,
  x,
  y,
  from,
  mobile,
}: {
  galaxy: GalaxyData;
  x: number;
  y: number;
  from: { x: number; y: number };
  mobile: boolean;
}) {
  const t = useT();
  const gt = useGameText();
  const dispatch = useAppDispatch();
  const go = useGo();
  const i = sectorIndex(x, y);
  const f = galaxy.flags[i];
  const kind = f & 3;
  const st = stationSectorAt(galaxy, i);
  const factionIndex = galaxy.faction[i];
  const faction = factionIndex ? galaxy.factions.find((fc) => fc.index === factionIndex) : undefined;
  const template = galaxy.template[i] ? db.templates[galaxy.template[i] - 1]?.id : undefined;
  const titles = db.stationTitles;
  const kindText =
    kind === KIND_BLOCKED
      ? t('Rift')
      : kind === KIND_OFFGRID
        ? `${t('Hidden sector')}${template ? ` · ${templateName(template, gt.lang)}` : ''}`
        : kind === KIND_REGULAR
          ? template
            ? templateName(template, gt.lang)
            : ''
          : t('Empty space');
  const generic = st
    ? Object.entries(st.counts)
        .filter(([k, n]) => n > 0 && k !== 'factories' && k !== 'mines' && titles[k])
        .map(([k, n]) => ({ key: k, title: gt.text(titles[k]), n }))
    : [];
  const prodList = st ? [...st.factories, ...st.mines] : [];
  const here = x === from.x && y === from.y;
  // unnamed sectors are named by their coordinates, which the header already shows
  const name = st && st.name !== `${x} : ${y}` ? st.name : null;
  return (
    <div className={mobile ? s.mSel : s.sel}>
      <div className={s.selHead}>
        <span className={s.selXY}>
          {x}:{y}
        </span>
        {here ? (
          <span className={s.hereTag}>{t('You are here')}</span>
        ) : (
          <span className={s.selAway}>
            {fmt(Math.hypot(x - from.x, y - from.y))} {t('sectors away')}
          </span>
        )}
      </div>
      {name && <div className={s.selName}>{name}</div>}
      <div className={s.selMeta}>
        {kindText && <>{kindText} · </>}
        {faction ? (
          <>
            {t('Faction territory, home')}{' '}
            <button type="button" className={s.linkXY} onClick={() => go.map(faction.x, faction.y)}>
              {faction.x}:{faction.y}
            </button>
          </>
        ) : (
          t('No faction')
        )}
      </div>
      {!here && (
        <button type="button" className={s.hereBtn} onClick={() => dispatch(settingsActions.setPosition({ x, y }))}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <circle cx="6" cy="6" r="3.5" />
            <path d="M6 0v2.5M6 9.5V12M0 6h2.5M9.5 6H12" strokeLinecap="round" />
          </svg>
          {t('I’m here')}
        </button>
      )}
      {(f & (FLAG_GATES | FLAG_ANCIENT_GATES | FLAG_HOME)) !== 0 && (
        <div className={s.flags}>
          {f & FLAG_HOME ? <span className={s.flag}>{t('Faction home')}</span> : null}
          {f & FLAG_GATES ? <span className={s.flag}>{t('Gates')}</span> : null}
          {f & FLAG_ANCIENT_GATES ? <span className={s.flag}>{t('Ancient gates')}</span> : null}
        </div>
      )}
      {generic.map((g) => (
        <div key={g.key} className={s.station}>
          <span className={s.stationName}>
            {g.title}
            {g.n > 1 ? ` ×${g.n}` : ''}
          </span>
        </div>
      ))}
      {prodList.map((pi, k) => {
        const p = productionByIndex.get(pi);
        if (!p) return null;
        const station = stationByProduction.get(pi);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: one sector can hold the same production several times
          <div key={`${pi}-${k}`} className={s.station}>
            <button type="button" className={s.stationLink} onClick={() => station && go.station(station.id)}>
              {gt.production(p)}
            </button>
            <div className={s.goods}>
              {p.results.map((r) => (
                <button key={r.good} type="button" className={s.goodChip} onClick={() => go.good(r.good)}>
                  {gt.good(r.good)} <span className={s.goodPrice}>¢{fmt(goodById.get(r.good)?.price ?? 0)}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BestList({
  best,
  plan,
  active,
  onPick,
  mobile,
}: {
  best: Best[];
  plan: Plan;
  active: string | null;
  onPick: (b: Best) => void;
  mobile: boolean;
}) {
  const t = useT();
  const gt = useGameText();
  return (
    <div className={s.best}>
      <div className={s.bestTitle}>{t('Best places to buy')}</div>
      {!mobile && (
        <div className={s.help} style={{ marginBottom: 6 }}>
          {t('Nearest producer for each commodity still needed')} · {plan.tab?.name ?? '-'}
        </div>
      )}
      {best.map((b) => (
        <button
          key={b.good}
          type="button"
          className={mobile ? s.mBestRow : s.bestRow}
          aria-pressed={active === b.good}
          onClick={() => onPick(b)}
        >
          <GameIcon src={goodIcon(b.good)} size={20} />
          <div style={{ minWidth: 0 }}>
            <div className={s.bestName}>
              {gt.good(b.good)} <span className={s.mutedMono}>×{fmt(b.buy)}</span>
            </div>
            <div className={s.bestStation}>{b.station}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className={s.cyanMono}>
              {b.x}:{b.y}
            </div>
            <div className={s.mutedMono}>
              {fmt(b.distance)} {t('sec')} · ¢{fmt(goodById.get(b.good)?.price ?? 0)}
            </div>
          </div>
        </button>
      ))}
      {best.length === 0 && <div className={s.help}>{t('Nothing to buy in the active tab. Add turrets and counts in the planner.')}</div>}
    </div>
  );
}

function PositionBox({ plan, mobile }: { plan: Plan; mobile?: boolean }) {
  const t = useT();
  const dispatch = useAppDispatch();
  const set = (p: { x: number; y: number }) => dispatch(settingsActions.setPosition(p));
  return (
    <div className={mobile ? s.mPosition : s.position}>
      <span className="label">{t('YOUR POSITION')}</span>
      <div className={s.posRow}>
        <CoordInput
          className={s.posInput}
          value={plan.position.x}
          onValue={(x) => set({ x, y: plan.position.y })}
          aria-label={`${t('YOUR POSITION')} x`}
        />
        <span className={s.posColon}>:</span>
        <CoordInput
          className={s.posInput}
          value={plan.position.y}
          onValue={(y) => set({ x: plan.position.x, y })}
          aria-label={`${t('YOUR POSITION')} y`}
        />
      </div>
    </div>
  );
}
