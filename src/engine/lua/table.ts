// A Lua 5.2 table that reproduces the reference implementation (ltable.c) closely enough
// that `next`/`pairs` visit keys in the same order as the game's embedded Lua 5.2.1.
// Game scripts feed `pairs` order into random selection, so the array/hash split, the
// node placement, collision chaining, `lastfree` and every rehash have to match.

export type LuaValue = unknown;

const MAXBITS = 30;
const MAXASIZE = 1 << MAXBITS;
const INT_MIN = -2147483648;

const f64 = new Float64Array(1);
const u32 = new Uint32Array(f64.buffer);

/** C `(int)d` as emitted by GCC on x64 (cvttsd2si): truncates, out-of-range gives INT_MIN. */
export function cInt(d: number): number {
  if (d !== d || d >= 2147483648 || d <= -2147483649) return INT_MIN;
  return d < 0 ? Math.ceil(d) : Math.floor(d);
}

/**
 * luai_hashnum + the sign fix in hashnum(): a non-negative int.
 * The game's Lua is built for x86_64 with LUA_IEEE754TRICK, so the hash is the sum of the
 * two 32-bit halves of (n + 1.0), not the portable frexp-based one.
 */
function hashNumber(n: number): number {
  f64[0] = n + 1.0;
  let i = (u32[0] + u32[1]) | 0;
  if (i < 0) {
    if (i === INT_MIN) i = 0;
    i = -i;
  }
  return i;
}

const strHashCache = new Map<string, number>();
/** luaS_hash with a fixed seed. The game seeds it randomly per state, so string-key order is never deterministic there. */
export function hashString(s: string): number {
  let h = strHashCache.get(s);
  if (h !== undefined) return h;
  const l = s.length;
  h = (0 ^ l) >>> 0;
  const step = (l >> 5) + 1;
  for (let l1 = l; l1 >= step; l1 -= step) {
    h = (h ^ (((h << 5) >>> 0) + (h >>> 2) + (s.charCodeAt(l1 - 1) & 0xff))) >>> 0;
  }
  if (strHashCache.size < 200000) strHashCache.set(s, h);
  return h;
}

const objectIds = new WeakMap<object, number>();
let nextObjectId = 1;
function objectId(o: object): number {
  let id = objectIds.get(o);
  if (id === undefined) {
    id = (nextObjectId++ * 2654435761) >>> 0;
    objectIds.set(o, id);
  }
  return id;
}

function ceilLog2(x: number): number {
  // luaO_ceillog2 for x >= 1
  let l = 0;
  x--;
  while (x >= 256) {
    l += 8;
    x = Math.floor(x / 256);
  }
  while (x > 0) {
    l++;
    x >>>= 1;
  }
  return l;
}

/** Array index of a key per arrayindex(): an int in (0, MAXASIZE], else -1. */
function arrayIndex(k: LuaValue): number {
  if (typeof k === 'number') {
    const i = cInt(k);
    if (i === k) return i;
  }
  return -1;
}

export function fb2int(x: number): number {
  const e = (x >> 3) & 0x1f;
  if (e === 0) return x;
  return ((x & 7) + 8) << (e - 1);
}

export function int2fb(x: number): number {
  let e = 0;
  if (x < 8) return x;
  while (x >= 0x10) {
    x = (x + 1) >> 1;
    e++;
  }
  return ((e + 1) << 3) | (x - 8);
}

export class LuaError extends Error {
  constructor(public value: LuaValue, public traceback?: string) {
    super(typeof value === 'string' ? value : 'Lua error');
  }
}

export class LuaTable {
  /** Array part; its length is `sizearray`. */
  arr: LuaValue[] = [];
  keys: LuaValue[] = [undefined];
  vals: LuaValue[] = [undefined];
  nexts: number[] = [-1];
  lsize = 0;
  dummy = true;
  lastfree = 0;
  metatable: LuaTable | undefined = undefined;

  /** Mirrors OP_NEWTABLE: sizes are the constructor's counts, rounded the way the bytecode encodes them. */
  constructor(narray = 0, nhash = 0) {
    if (narray !== 0 || nhash !== 0) this.resize(fb2int(int2fb(narray)), fb2int(int2fb(nhash)));
  }

  get sizenode(): number {
    return 1 << this.lsize;
  }

  private mainPosition(k: LuaValue): number {
    const size = 1 << this.lsize;
    switch (typeof k) {
      case 'number':
        return hashNumber(k) % ((size - 1) | 1);
      case 'string':
        return hashString(k) & (size - 1);
      case 'boolean':
        return (k ? 1 : 0) & (size - 1);
      default:
        return objectId(k as object) % ((size - 1) | 1);
    }
  }

  private findNode(k: LuaValue): number {
    let n = this.mainPosition(k);
    const keys = this.keys;
    const nexts = this.nexts;
    do {
      if (keys[n] === k) return n;
      n = nexts[n];
    } while (n !== -1);
    return -1;
  }

  private findNodeNumber(k: number): number {
    let n = hashNumber(k) % (((1 << this.lsize) - 1) | 1);
    const keys = this.keys;
    const nexts = this.nexts;
    do {
      if (keys[n] === k) return n;
      n = nexts[n];
    } while (n !== -1);
    return -1;
  }

  private findNodeString(k: string): number {
    let n = hashString(k) & ((1 << this.lsize) - 1);
    const keys = this.keys;
    const nexts = this.nexts;
    do {
      if (keys[n] === k) return n;
      n = nexts[n];
    } while (n !== -1);
    return -1;
  }

  /** luaH_get. */
  get(k: LuaValue): LuaValue {
    if (typeof k === 'string') {
      const n = this.findNodeString(k);
      return n === -1 ? undefined : this.vals[n];
    }
    if (typeof k === 'number') {
      const i = cInt(k);
      if (i === k) return this.getInt(i);
      if (k !== k) return undefined;
      const n = this.findNodeNumber(k);
      return n === -1 ? undefined : this.vals[n];
    }
    if (k === undefined) return undefined;
    const n = this.findNode(k);
    return n === -1 ? undefined : this.vals[n];
  }

  /** luaH_getint. */
  getInt(i: number): LuaValue {
    if (i >= 1 && i <= this.arr.length) return this.arr[i - 1];
    const n = this.findNodeNumber(i);
    return n === -1 ? undefined : this.vals[n];
  }

  getStr(k: string): LuaValue {
    const n = this.findNodeString(k);
    return n === -1 ? undefined : this.vals[n];
  }

  /** luaH_set followed by the store: an absent key gets a node even when `v` is nil. */
  set(k: LuaValue, v: LuaValue): void {
    if (typeof k === 'number') {
      const i = cInt(k);
      if (i === k) {
        this.setInt(i, v);
        return;
      }
      if (k !== k) throw new LuaError('table index is NaN');
      const n = this.findNodeNumber(k);
      if (n !== -1) this.vals[n] = v;
      else this.newKey(k, v);
      return;
    }
    if (typeof k === 'string') {
      const n = this.findNodeString(k);
      if (n !== -1) this.vals[n] = v;
      else this.newKey(k, v);
      return;
    }
    if (k === undefined) throw new LuaError('table index is nil');
    const n = this.findNode(k);
    if (n !== -1) this.vals[n] = v;
    else this.newKey(k, v);
  }

  /** luaH_setint. */
  setInt(i: number, v: LuaValue): void {
    if (i >= 1 && i <= this.arr.length) {
      this.arr[i - 1] = v;
      return;
    }
    const n = this.findNodeNumber(i);
    if (n !== -1) this.vals[n] = v;
    else this.newKey(i, v);
  }

  /** True when a store to `k` would find an existing slot (array slot or node, even with a nil value). */
  hasSlot(k: LuaValue): boolean {
    if (typeof k === 'number') {
      const i = cInt(k);
      if (i === k && i >= 1 && i <= this.arr.length) return true;
      if (k !== k) return false;
      return this.findNodeNumber(k) !== -1;
    }
    if (typeof k === 'string') return this.findNodeString(k) !== -1;
    if (k === undefined) return false;
    return this.findNode(k) !== -1;
  }

  private getFreePos(): number {
    while (this.lastfree > 0) {
      this.lastfree--;
      if (this.keys[this.lastfree] === undefined) return this.lastfree;
    }
    return -1;
  }

  /** luaH_newkey + store. */
  private newKey(k: LuaValue, v: LuaValue): void {
    let mp = this.mainPosition(k);
    if (this.vals[mp] !== undefined || this.dummy) {
      const f = this.getFreePos();
      if (f === -1) {
        this.rehash(k);
        this.set(k, v);
        return;
      }
      let othern = this.mainPosition(this.keys[mp]);
      if (othern !== mp) {
        while (this.nexts[othern] !== mp) othern = this.nexts[othern];
        this.nexts[othern] = f;
        this.keys[f] = this.keys[mp];
        this.vals[f] = this.vals[mp];
        this.nexts[f] = this.nexts[mp];
        this.nexts[mp] = -1;
        this.vals[mp] = undefined;
      } else {
        this.nexts[f] = this.nexts[mp];
        this.nexts[mp] = f;
        mp = f;
      }
    }
    this.keys[mp] = k;
    this.vals[mp] = v;
  }

  private setNodeVector(size: number): void {
    if (size === 0) {
      this.keys = [undefined];
      this.vals = [undefined];
      this.nexts = [-1];
      this.lsize = 0;
      this.dummy = true;
      this.lastfree = 0;
      return;
    }
    const lsize = ceilLog2(size);
    if (lsize > MAXBITS) throw new LuaError('table overflow');
    const n = 1 << lsize;
    this.keys = new Array(n).fill(undefined);
    this.vals = new Array(n).fill(undefined);
    this.nexts = new Array(n).fill(-1);
    this.lsize = lsize;
    this.dummy = false;
    this.lastfree = n;
  }

  /** luaH_resize. */
  resize(nasize: number, nhsize: number): void {
    const oldasize = this.arr.length;
    const oldKeys = this.keys;
    const oldVals = this.vals;
    const oldSize = 1 << this.lsize;
    if (nasize > oldasize) {
      for (let i = oldasize; i < nasize; i++) this.arr.push(undefined);
    }
    this.setNodeVector(nhsize);
    if (nasize < oldasize) {
      const old = this.arr;
      this.arr = old.slice(0, nasize);
      for (let i = nasize; i < oldasize; i++) {
        if (old[i] !== undefined) this.setInt(i + 1, old[i]);
      }
    }
    for (let i = oldSize - 1; i >= 0; i--) {
      const v = oldVals[i];
      if (v !== undefined) this.set(oldKeys[i], v);
    }
  }

  /** luaH_resizearray, used by OP_SETLIST. */
  resizeArray(nasize: number): void {
    this.resize(nasize, this.dummy ? 0 : 1 << this.lsize);
  }

  private rehash(ek: LuaValue): void {
    const nums = new Array<number>(MAXBITS + 1).fill(0);
    // numusearray
    let ause = 0;
    let i = 1;
    const asize = this.arr.length;
    for (let lg = 0, ttlg = 1; lg <= MAXBITS; lg++, ttlg *= 2) {
      let lc = 0;
      let lim = ttlg;
      if (lim > asize) {
        lim = asize;
        if (i > lim) break;
      }
      for (; i <= lim; i++) if (this.arr[i - 1] !== undefined) lc++;
      nums[lg] += lc;
      ause += lc;
    }
    let nasize = ause;
    let totaluse = nasize;
    // numusehash
    let hashAuse = 0;
    let hashUse = 0;
    for (let n = (1 << this.lsize) - 1; n >= 0; n--) {
      if (this.vals[n] !== undefined) {
        hashAuse += countInt(this.keys[n], nums);
        hashUse++;
      }
    }
    nasize += hashAuse;
    totaluse += hashUse;
    nasize += countInt(ek, nums);
    totaluse++;
    // computesizes
    let a = 0;
    let na = 0;
    let n = 0;
    for (let k = 0, twotoi = 1; twotoi / 2 < nasize; k++, twotoi *= 2) {
      if (nums[k] > 0) {
        a += nums[k];
        if (a > twotoi / 2) {
          n = twotoi;
          na = a;
        }
      }
      if (a === nasize) break;
    }
    this.resize(n, totaluse - na);
  }

  /** luaH_getn: the `#` border. */
  length(): number {
    let j = this.arr.length;
    if (j > 0 && this.arr[j - 1] === undefined) {
      let i = 0;
      while (j - i > 1) {
        const m = Math.floor((i + j) / 2);
        if (this.arr[m - 1] === undefined) j = m;
        else i = m;
      }
      return i;
    }
    if (this.dummy) return j;
    // unbound_search
    let i = j;
    j++;
    while (this.getInt(j) !== undefined) {
      i = j;
      j *= 2;
      if (j > 2147483647) {
        i = 1;
        while (this.getInt(i) !== undefined) i++;
        return i - 1;
      }
    }
    while (j - i > 1) {
      const m = Math.floor((i + j) / 2);
      if (this.getInt(m) === undefined) j = m;
      else i = m;
    }
    return i;
  }

  /** luaH_next: returns [key, value] or undefined at the end. */
  next(k: LuaValue): [LuaValue, LuaValue] | undefined {
    let i = this.findIndex(k);
    const asize = this.arr.length;
    for (; i < asize; i++) {
      const v = this.arr[i];
      if (v !== undefined) return [i + 1, v];
    }
    const size = 1 << this.lsize;
    for (i -= asize; i < size; i++) {
      const v = this.vals[i];
      if (v !== undefined) return [this.keys[i], v];
    }
    return undefined;
  }

  private findIndex(k: LuaValue): number {
    if (k === undefined) return 0;
    const ai = arrayIndex(k);
    if (ai > 0 && ai <= this.arr.length) return ai;
    let n = this.mainPosition(k);
    for (;;) {
      if (this.keys[n] === k) return n + 1 + this.arr.length;
      n = this.nexts[n];
      if (n === -1) throw new LuaError("invalid key to 'next'");
    }
  }
}

function countInt(key: LuaValue, nums: number[]): number {
  const k = arrayIndex(key);
  if (k > 0 && k <= MAXASIZE) {
    nums[ceilLog2(k)]++;
    return 1;
  }
  return 0;
}
