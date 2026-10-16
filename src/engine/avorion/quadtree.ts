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

export class QuadTree {
  private readonly root: QNode;
  private count = 0;

  constructor(minX: number, minY: number, maxX: number, maxY: number, readonly maxLevel: number) {
    this.root = new QNode(fr(minX), fr(minY), fr(maxX), fr(maxY), 0, null);
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
  }

  private collect(n: QNode, xs: number[], ys: number[]): void {
    if (n.children) for (const c of n.children) this.collect(c, xs, ys);
    for (let i = 0; i < n.xs.length; i++) {
      xs.push(n.xs[i]);
      ys.push(n.ys[i]);
    }
  }

  private getInto(n: QNode, px: number, py: number, rr: number, xs: number[], ys: number[]): void {
    if (n.children) {
      for (const c of n.children) {
        let d = 0;
        if (c.minX > px) {
          const t = fr(px - c.minX);
          d = fr(d + fr(t * t));
        } else if (px > c.maxX) {
          const t = fr(px - c.maxX);
          d = fr(d + fr(t * t));
        }
        if (c.minY > py) {
          const t = fr(py - c.minY);
          d = fr(d + fr(t * t));
        } else if (py > c.maxY) {
          const t = fr(py - c.maxY);
          d = fr(d + fr(t * t));
        }
        if (rr >= d) this.getInto(c, px, py, rr, xs, ys);
      }
    }
    for (let i = 0; i < n.xs.length; i++) {
      const dy = fr(n.ys[i] - py);
      const dx = fr(n.xs[i] - px);
      const d = fr(fr(dy * dy) + fr(dx * dx));
      if (rr > d) {
        xs.push(n.xs[i]);
        ys.push(n.ys[i]);
      }
    }
  }

  /** Points strictly inside the circle, in tree order. */
  get(px: number, py: number, radius: number): { xs: number[]; ys: number[] } {
    px = fr(px);
    py = fr(py);
    const r = fr(radius);
    const xs: number[] = [];
    const ys: number[] = [];
    this.getInto(this.root, px, py, fr(r * r), xs, ys);
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
