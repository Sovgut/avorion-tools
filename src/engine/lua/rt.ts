// Helpers that compiled chunks call, and a Lua state that loads compiled modules.
import {
  add,
  call,
  callv,
  concat,
  div,
  eq,
  first,
  index,
  LuaError,
  LuaMulti,
  LuaTable,
  type LuaValue,
  le,
  len,
  lt,
  method,
  methodv,
  mod,
  mret,
  mretv,
  mul,
  nth,
  pow,
  setindex,
  sub,
  tonum,
  truthy,
  unm,
} from './runtime';
import { type BaseLibOptions, createGlobals, luaNext } from './stdlib';

export type ChunkFn = (...va: LuaValue[]) => LuaValue;
export type ModuleFactory = (R: Rt) => ChunkFn;

export interface Rt {
  first: typeof first;
  nth: typeof nth;
  mret: typeof mret;
  mretv: typeof mretv;
  va: (va: LuaValue[]) => LuaValue;
  truthy: typeof truthy;
  index: typeof index;
  setindex: typeof setindex;
  call: typeof call;
  callv: typeof callv;
  method: typeof method;
  methodv: typeof methodv;
  add: typeof add;
  sub: typeof sub;
  mul: typeof mul;
  div: typeof div;
  mod: typeof mod;
  pow: typeof pow;
  unm: typeof unm;
  concat: typeof concat;
  len: typeof len;
  eq: typeof eq;
  lt: typeof lt;
  le: typeof le;
  gt: (a: LuaValue, b: LuaValue) => boolean;
  ge: (a: LuaValue, b: LuaValue) => boolean;
  newTable: (na: number, nh: number, ops: LuaValue[] | undefined, tail?: LuaValue, hasTail?: boolean) => LuaTable;
  forNum: (v: LuaValue, what: string) => number;
  forIter: (f: LuaValue, s: LuaValue, c: LuaValue) => LuaValue[] | undefined;
  gget: (name: string) => LuaValue;
  gset: (name: string, v: LuaValue) => void;
  LuaError: typeof LuaError;
}

const LFIELDS_PER_FLUSH = 50;

/** OP_NEWTABLE followed by the constructor's stores: named fields immediately, list items in SETLIST batches. */
function newTable(na: number, nh: number, ops: LuaValue[] | undefined, tail?: LuaValue, hasTail = false): LuaTable {
  const t = new LuaTable(na, nh);
  let pending: LuaValue[] = [];
  let flushed = 0;
  const flush = (items: LuaValue[]) => {
    const last = flushed + items.length;
    if (last > t.arr.length) t.resizeArray(last);
    for (let i = items.length - 1; i >= 0; i--) t.setInt(flushed + i + 1, items[i]);
    flushed = last;
  };
  if (ops) {
    for (let i = 0; i < ops.length; ) {
      if (ops[i] === 0) {
        pending.push(ops[i + 1]);
        i += 2;
        if (pending.length === LFIELDS_PER_FLUSH) {
          flush(pending);
          pending = [];
        }
      } else {
        const k = ops[i + 1];
        if (k === undefined) throw new LuaError('table index is nil');
        t.set(k, ops[i + 2]);
        i += 3;
      }
    }
  }
  if (hasTail) {
    if (tail instanceof LuaMulti) pending.push(...tail.v);
    else pending.push(tail);
  }
  if (pending.length > 0) flush(pending);
  return t;
}

function forNum(v: LuaValue, what: string): number {
  const n = tonum(v);
  if (n === undefined) throw new LuaError(`'for' ${what} value must be a number`);
  return n;
}

function forIter(f: LuaValue, s: LuaValue, c: LuaValue): LuaValue[] | undefined {
  if (f === luaNext && s instanceof LuaTable) return s.next(c);
  const r = call(f, s, c);
  if (r instanceof LuaMulti) return r.v;
  return [r];
}

function va(v: LuaValue[]): LuaValue {
  return v.length === 1 ? v[0] : new LuaMulti(v);
}

export function createRt(G: LuaTable): Rt {
  return {
    first,
    nth,
    mret,
    mretv,
    va,
    truthy,
    index,
    setindex,
    call,
    callv,
    method,
    methodv,
    add,
    sub,
    mul,
    div,
    mod,
    pow,
    unm,
    concat,
    len,
    eq,
    lt,
    le,
    gt: (a, b) => lt(b, a),
    ge: (a, b) => le(b, a),
    newTable,
    forNum,
    forIter,
    gget: (name) => {
      const v = G.getStr(name);
      if (v !== undefined || G.metatable === undefined) return v;
      return index(G, name);
    },
    gset: (name, v) => setindex(G, name, v),
    LuaError,
  };
}

export interface LuaStateOptions extends BaseLibOptions {
  /** Compiled modules keyed by their path relative to the game root, e.g. "data/scripts/lib/utility.lua". */
  modules: Record<string, ModuleFactory>;
}

/** One Lua VM: its own globals and module cache, like a script context in the game. */
export class LuaState {
  readonly G: LuaTable;
  readonly R: Rt;
  private readonly loaded = new Map<string, LuaValue>();
  private readonly loading = new Set<string>();

  constructor(private readonly opts: LuaStateOptions) {
    this.G = createGlobals(opts);
    this.R = createRt(this.G);
  }

  hasModule(path: string): boolean {
    return path in this.opts.modules;
  }

  /** Runs a module once and caches its first result. */
  require(path: string): LuaValue {
    if (this.loaded.has(path)) return this.loaded.get(path);
    const factory = this.opts.modules[path];
    if (!factory) throw new LuaError(`module '${path}' is not compiled`);
    if (this.loading.has(path)) return undefined;
    this.loading.add(path);
    try {
      const result = first(factory(this.R)());
      this.loaded.set(path, result);
      return result;
    } finally {
      this.loading.delete(path);
    }
  }

  /** Runs a module's chunk again (no caching), returning all results. */
  run(path: string, ...args: LuaValue[]): LuaValue {
    const factory = this.opts.modules[path];
    if (!factory) throw new LuaError(`module '${path}' is not compiled`);
    return factory(this.R)(...args);
  }

  global(name: string): LuaValue {
    return this.G.get(name);
  }
}
