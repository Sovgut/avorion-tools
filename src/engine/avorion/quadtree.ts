// The game's QuadTree<vec2> (float32 boxes, points stored in leaves at maxLevel).
// Child order, inclusive box tests, strict sphere tests and the tie-breaking of `nearest`
// follow the binary: ties resolve to the first point in traversal order when a radius is
// given, and to the last one otherwise (the game keys a std::map by distance and overwrites).
const fr = Math.fround;

class QNode {
  children: QNode[] | null = null;
  xs: number[] = [];
  ys: number[] = [];
  constructor(
    readonly minX: number,
    readonly minY: number,
    readonly maxX: number,
    readonly maxY: number,
    readonly level: number,
    readonly parent: QNode | null,
  ) {}

  contains(x: number, y: number): boolean {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  }

  split(): QNode[] {
    const cx = fr(fr(this.minX + this.maxX) * 0.5);
    const cy = fr(fr(this.minY + this.maxY) * 0.5);
    const l = this.level + 1;
    this.children = [
      new QNode(this.minX, this.minY, cx, cy, l, this),
      new QNode(cx, this.minY, this.maxX, cy, l, this),
      new QNode(this.minX, cy, cx, this.maxY, l, this),
      new QNode(cx, cy, this.maxX, this.maxY, l, this),
    ];
    return this.children;
  }
}

function sqd(px: number, py: number, qx: number, qy: number): number {
  const dx = fr(px - qx);
  const dy = fr(py - qy);
  return fr(fr(dx * dx) + fr(dy * dy));
}

/** Leaf boundaries along one axis, as repeated float halving produces them. */
function axisBounds(min: number, max: number, levels: number): number[] {
  let bounds = [min, max];
  for (let l = 0; l < levels; l++) {
    const next: number[] = [bounds[0]];
    for (let i = 1; i < bounds.length; i++) {
      next.push(fr(fr(bounds[i - 1] + bounds[i]) * 0.5), bounds[i]);
    }
    bounds = next;
  }
  return bounds;
}

/** Interleaves bits: x takes the low bit of every pair, matching child order LL, HL, LH, HH. */
function morton(ix: number, iy: number, levels: number): number {
  let r = 0;
  for (let b = levels - 1; b >= 0; b--) r = r * 4 + ((ix >> b) & 1) + 2 * ((iy >> b) & 1);
  return r;
}

export class QuadTree {
  private readonly root: QNode;
  private count = 0;
  // Points only live in leaves at maxLevel, which tile the root box as a regular grid.
  // Range queries walk that grid and restore the tree's traversal order by Morton rank.
  private readonly bx: number[];
  private readonly by: number[];
  private readonly cells: number;
  private readonly leafX: (number[] | undefined)[];
  private readonly leafY: (number[] | undefined)[];

  constructor(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    readonly maxLevel: number,
  ) {
    this.root = new QNode(fr(minX), fr(minY), fr(maxX), fr(maxY), 0, null);
    this.cells = 1 << maxLevel;
    this.bx = axisBounds(this.root.minX, this.root.maxX, maxLevel);
    this.by = axisBounds(this.root.minY, this.root.maxY, maxLevel);
    this.leafX = new Array(this.cells * this.cells);
    this.leafY = new Array(this.cells * this.cells);
  }

  get empty(): boolean {
    return this.count === 0;
  }

  insert(x: number, y: number): void {
    x = fr(x);
    y = fr(y);
    let n = this.root;
    while (n.level < this.maxLevel) {
      const ch = n.children ?? n.split();
      let next: QNode | null = null;
      for (const c of ch) {
        if (c.contains(x, y)) {
          next = c;
          break;
        }
      }
      if (!next) return;
      n = next;
    }
    n.xs.push(x);
    n.ys.push(y);
    this.count++;
    const rank = morton(this.cellOf(this.bx, x), this.cellOf(this.by, y), this.maxLevel);
    (this.leafX[rank] ??= []).push(x);
    (this.leafY[rank] ??= []).push(y);
  }

  /** Leaf column of a coordinate: a value on a boundary belongs to the lower cell, like the tree's first-match descent. */
  private cellOf(bounds: number[], v: number): number {
    let lo = 0;
    let hi = this.cells - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (v <= bounds[mid + 1]) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  private axisDist2(min: number, max: number, p: number): number {
    if (min > p) {
      const t = fr(p - min);
      return fr(t * t);
    }
    if (p > max) {
      const t = fr(p - max);
      return fr(t * t);
    }
    return 0;
  }

  private collect(n: QNode, xs: number[], ys: number[]): void {
    if (n.children) for (const c of n.children) this.collect(c, xs, ys);
    for (let i = 0; i < n.xs.length; i++) {
      xs.push(n.xs[i]);
      ys.push(n.ys[i]);
    }
  }

  /** Points strictly inside the circle, in tree order. */
  get(px: number, py: number, radius: number): { xs: number[]; ys: number[] } {
    px = fr(px);
    py = fr(py);
    const r = fr(radius);
    const rr = fr(r * r);
    const xs: number[] = [];
    const ys: number[] = [];
    if (this.count === 0) return { xs, ys };
    // candidate leaf range; every leaf whose box is within reach, like the tree's box test
    const lowX = this.cellOf(this.bx, Math.max(this.bx[0], px - r - 1));
    const highX = this.cellOf(this.bx, Math.min(this.bx[this.cells], px + r + 1));
    const lowY = this.cellOf(this.by, Math.max(this.by[0], py - r - 1));
    const highY = this.cellOf(this.by, Math.min(this.by[this.cells], py + r + 1));
    let found: { rank: number; xs: number[]; ys: number[] }[] | undefined;
    for (let iy = lowY; iy <= highY; iy++) {
      const dy = this.axisDist2(this.by[iy], this.by[iy + 1], py);
      if (dy > rr) continue;
      for (let ix = lowX; ix <= highX; ix++) {
        const rank = morton(ix, iy, this.maxLevel);
        const lx = this.leafX[rank];
        if (lx === undefined) continue;
        const d = fr(this.axisDist2(this.bx[ix], this.bx[ix + 1], px) + dy);
        if (!(rr >= d)) continue;
        const ly = this.leafY[rank]!;
        let hitX: number[] | undefined;
        let hitY: number[] | undefined;
        for (let i = 0; i < lx.length; i++) {
          const ddy = fr(ly[i] - py);
          const ddx = fr(lx[i] - px);
          if (rr > fr(fr(ddy * ddy) + fr(ddx * ddx))) {
            (hitX ??= []).push(lx[i]);
            (hitY ??= []).push(ly[i]);
          }
        }
        if (hitX) (found ??= []).push({ rank, xs: hitX, ys: hitY! });
      }
    }
    if (found) {
      found.sort((a, b) => a.rank - b.rank);
      for (const f of found) {
        for (let i = 0; i < f.xs.length; i++) {
          xs.push(f.xs[i]);
          ys.push(f.ys[i]);
        }
      }
    }
    return { xs, ys };
  }

  /** Nearest point; with a radius only points strictly inside it count. Returns undefined when none. */
  nearest(x: number, y: number, radius?: number): [number, number] | undefined {
    const px = fr(x);
    const py = fr(y);
    if (radius !== undefined) {
      const { xs, ys } = this.get(px, py, radius);
      let best = -1;
      let bestD = 0;
      for (let i = 0; i < xs.length; i++) {
        const d = sqd(px, py, xs[i], ys[i]);
        if (best === -1 || bestD > d) {
          best = i;
          bestD = d;
        }
      }
      return best === -1 ? undefined : [xs[best], ys[best]];
    }
    let n: QNode = this.root;
    while (n.children) {
      let next: QNode | null = null;
      for (const c of n.children) {
        if (c.contains(px, py)) {
          next = c;
          break;
        }
      }
      if (!next) break;
      n = next;
    }
    const cx: number[] = [];
    const cy: number[] = [];
    for (let cur: QNode | null = n; ; cur = cur.parent) {
      if (!cur) return undefined;
      this.collect(cur, cx, cy);
      if (cx.length > 0) break;
    }
    const r = fr(Math.sqrt(sqd(px, py, cx[0], cy[0])));
    const { xs, ys } = this.get(px, py, r);
    if (xs.length === 0) return [cx[0], cy[0]];
    // map keyed by distance: equal keys overwrite, the smallest key wins
    let bestD = Infinity;
    let best = -1;
    for (let i = 0; i < xs.length; i++) {
      const d = sqd(px, py, xs[i], ys[i]);
      if (d <= bestD) {
        bestD = d;
        best = i;
      }
    }
    return [xs[best], ys[best]];
  }
}
