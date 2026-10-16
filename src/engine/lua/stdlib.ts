// Lua 5.2 base, table and math libraries (lbaselib.c, ltablib.c, lmathlib.c semantics).
import {
  LuaError,
  LuaMulti,
  LuaTable,
  Userdata,
  call,
  eq,
  first,
  getMetamethod,
  getMetatable,
  len,
  lt,
  mret,
  mretv,
  numberToString,
  tonum,
  truthy,
  type,
  type LuaValue,
} from './runtime';
import { makeStringLib } from './lstrlib';

const addressIds = new WeakMap<object, number>();
let nextAddress = 0x10000000;
export function address(o: object): string {
  let a = addressIds.get(o);
  if (a === undefined) {
    a = nextAddress;
    nextAddress += 0x60;
    addressIds.set(o, a);
  }
  return a.toString(16).toUpperCase().padStart(16, '0');
}

export function tostring(v: LuaValue): string {
  const h = getMetamethod(v, '__tostring');
  if (h !== undefined) {
    const r = first(call(h, v));
    if (typeof r !== 'string') {
      if (typeof r === 'number') return numberToString(r);
      throw new LuaError("'__tostring' must return a string");
    }
    return r;
  }
  switch (typeof v) {
    case 'undefined':
      return 'nil';
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      return numberToString(v);
    case 'string':
      return v;
    case 'function':
      return 'function: ' + address(v);
    default:
      if (v instanceof Userdata) return v.luaTypeName + ': ' + address(v);
      return type(v) + ': ' + address(v as object);
  }
}

function checkTable(v: LuaValue, arg: number, fname: string): LuaTable {
  if (v instanceof LuaTable) return v;
  throw new LuaError(`bad argument #${arg} to '${fname}' (table expected, got ${v === undefined ? 'no value' : type(v)})`);
}

function checkNumber(v: LuaValue, arg: number, fname: string): number {
  const n = tonum(v);
  if (n === undefined) throw new LuaError(`bad argument #${arg} to '${fname}' (number expected, got ${v === undefined ? 'no value' : type(v)})`);
  return n;
}

function checkInt(v: LuaValue, arg: number, fname: string): number {
  const n = checkNumber(v, arg, fname);
  return n < 0 ? Math.ceil(n) : Math.floor(n);
}

function optInt(v: LuaValue, arg: number, fname: string, def: number): number {
  return v === undefined ? def : checkInt(v, arg, fname);
}

/** luaL_len: `#` honoring __len, as the table library uses it. */
function auxLen(t: LuaValue): number {
  const n = len(t);
  if (typeof n !== 'number') throw new LuaError('object length is not a number');
  return n;
}

export function luaNext(t: LuaValue, k: LuaValue): LuaValue {
  const r = checkTable(t, 1, 'next').next(k);
  return r === undefined ? undefined : new LuaMulti(r);
}

function ipairsAux(t: LuaValue, i: LuaValue): LuaValue {
  const n = (i as number) + 1;
  const v = (t as LuaTable).getInt(n);
  return v === undefined ? undefined : new LuaMulti([n, v]);
}

export interface BaseLibOptions {
  print?: (text: string) => void;
}

export function installBaseLib(G: LuaTable, opts: BaseLibOptions = {}): void {
  const def = (name: string, f: (...a: LuaValue[]) => LuaValue) => G.set(name, f);
  G.set('_G', G);
  G.set('_VERSION', 'Lua 5.2');

  def('type', (...a) => {
    if (a.length === 0) throw new LuaError("bad argument #1 to 'type' (value expected)");
    return type(a[0]);
  });
  def('tostring', (v) => tostring(v));
  def('tonumber', (v, base) => {
    if (base === undefined) {
      const n = tonum(v);
      return n;
    }
    const b = checkInt(base, 2, 'tonumber');
    const s = String(v).trim().toLowerCase();
    let neg = false;
    let str = s;
    if (str[0] === '-') {
      neg = true;
      str = str.slice(1);
    }
    if (str === '') return undefined;
    let n = 0;
    for (const c of str) {
      const d = parseInt(c, 36);
      if (isNaN(d) || d >= b) return undefined;
      n = n * b + d;
    }
    return neg ? -n : n;
  });
  def('rawget', (t, k) => checkTable(t, 1, 'rawget').get(k));
  def('rawset', (t, k, v) => {
    checkTable(t, 1, 'rawset').set(k, v);
    return t;
  });
  def('rawequal', (a, b) => a === b);
  def('rawlen', (v) => {
    if (v instanceof LuaTable) return v.length();
    if (typeof v === 'string') return v.length;
    throw new LuaError("table or string expected");
  });
  def('next', luaNext);
  def('pairs', (t) => {
    const h = getMetamethod(t, '__pairs');
    if (h !== undefined) {
      const r = call(h, t);
      const arr = r instanceof LuaMulti ? r.v : [r];
      return new LuaMulti([arr[0], arr[1], arr[2]]);
    }
    checkTable(t, 1, 'pairs');
    return new LuaMulti([luaNext, t, undefined]);
  });
  def('ipairs', (t) => {
    const h = getMetamethod(t, '__ipairs');
    if (h !== undefined) {
      const r = call(h, t);
      const arr = r instanceof LuaMulti ? r.v : [r];
      return new LuaMulti([arr[0], arr[1], arr[2]]);
    }
    checkTable(t, 1, 'ipairs');
    return new LuaMulti([ipairsAux, t, 0]);
  });
  def('select', (n, ...args) => {
    if (n === '#') return args.length;
    let i = checkInt(n, 1, 'select');
    if (i < 0) i = args.length + i;
    else if (i === 0) throw new LuaError("bad argument #1 to 'select' (index out of range)");
    else i--;
    if (i < 0) throw new LuaError("bad argument #1 to 'select' (index out of range)");
    return new LuaMulti(args.slice(i));
  });
  def('getmetatable', (v) => {
    const mt = getMetatable(v);
    if (mt === undefined) return undefined;
    const protectedMt = mt.getStr('__metatable');
    return protectedMt !== undefined ? protectedMt : mt;
  });
  def('setmetatable', (t, mt) => {
    const tbl = checkTable(t, 1, 'setmetatable');
    if (mt !== undefined && !(mt instanceof LuaTable)) throw new LuaError("bad argument #2 to 'setmetatable' (nil or table expected)");
    if (tbl.metatable?.getStr('__metatable') !== undefined) throw new LuaError('cannot change a protected metatable');
    tbl.metatable = mt as LuaTable | undefined;
    return t;
  });
  def('assert', (...a) => {
    if (!truthy(a[0])) {
      if (a.length < 1) throw new LuaError("bad argument #1 to 'assert' (value expected)");
      throw new LuaError(a.length >= 2 ? a[1] : 'assertion failed!');
    }
    return new LuaMulti(a);
  });
  def('error', (msg) => {
    throw new LuaError(msg);
  });
  def('pcall', (f, ...args) => {
    try {
      return mretv([true], call(f, ...args));
    } catch (e) {
      return new LuaMulti([false, errorValue(e)]);
    }
  });
  def('xpcall', (f, handler, ...args) => {
    try {
      return mretv([true], call(f, ...args));
    } catch (e) {
      return mretv([false], call(handler, errorValue(e)));
    }
  });
  def('print', (...a) => {
    opts.print?.(a.map(tostring).join('\t'));
    return undefined;
  });
  def('collectgarbage', () => 0);
  def('unpack', tableUnpack);
}

export function errorValue(e: unknown): LuaValue {
  if (e instanceof LuaError) return e.value;
  if (e instanceof Error) return e.message;
  return String(e);
}

function tableUnpack(t: LuaValue, i0: LuaValue, j0: LuaValue): LuaValue {
  const tbl = checkTable(t, 1, 'unpack');
  const i = optInt(i0, 2, 'unpack', 1);
  const e = j0 === undefined ? auxLen(tbl) : checkInt(j0, 3, 'unpack');
  if (i > e) return new LuaMulti([]);
  const out: LuaValue[] = [];
  for (let k = i; k <= e; k++) out.push(tbl.getInt(k));
  return out.length === 1 ? out[0] : new LuaMulti(out);
}

// ------------------------------------------------------------- table library

function sortComp(f: LuaValue, a: LuaValue, b: LuaValue): boolean {
  if (f !== undefined) return truthy(first(call(f, a, b)));
  return lt(a, b);
}

/** auxsort from ltablib.c (Lua 5.2): same comparisons and swaps, so equal elements land in the same order. */
function auxsort(t: LuaTable, l: number, u: number, f: LuaValue): void {
  while (l < u) {
    let i: number;
    let j: number;
    {
      const al = t.getInt(l);
      const au = t.getInt(u);
      if (sortComp(f, au, al)) {
        t.setInt(l, au);
        t.setInt(u, al);
      }
    }
    if (u - l === 1) break;
    i = Math.floor((l + u) / 2);
    {
      const ai = t.getInt(i);
      const al = t.getInt(l);
      if (sortComp(f, ai, al)) {
        t.setInt(i, al);
        t.setInt(l, ai);
      } else {
        const au = t.getInt(u);
        if (sortComp(f, au, ai)) {
          t.setInt(i, au);
          t.setInt(u, ai);
        }
      }
    }
    if (u - l === 2) break;
    const P = t.getInt(i);
    {
      const x = t.getInt(u - 1);
      t.setInt(i, x);
      t.setInt(u - 1, P);
    }
    i = l;
    j = u - 1;
    for (;;) {
      let ai: LuaValue;
      while (((ai = t.getInt(++i)), sortComp(f, ai, P))) {
        if (i >= u) throw new LuaError('invalid order function for sorting');
      }
      let aj: LuaValue;
      while (((aj = t.getInt(--j)), sortComp(f, P, aj))) {
        if (j <= l) throw new LuaError('invalid order function for sorting');
      }
      if (j < i) break;
      t.setInt(i, aj);
      t.setInt(j, ai);
    }
    {
      const a1 = t.getInt(u - 1);
      const a2 = t.getInt(i);
      t.setInt(u - 1, a2);
      t.setInt(i, a1);
    }
    if (i - l < u - i) {
      j = l;
      i = i - 1;
      l = i + 2;
    } else {
      j = i + 1;
      i = u;
      u = j - 2;
    }
    auxsort(t, j, i, f);
  }
}

export function installTableLib(G: LuaTable): LuaTable {
  const lib = new LuaTable();
  const def = (name: string, f: (...a: LuaValue[]) => LuaValue) => lib.set(name, f);
  def('insert', (...a) => {
    const t = checkTable(a[0], 1, 'insert');
    const e = auxLen(t) + 1;
    let pos: number;
    switch (a.length) {
      case 2:
        pos = e;
        break;
      case 3: {
        pos = checkInt(a[1], 2, 'insert');
        for (let i = e; i > pos; i--) t.setInt(i, t.getInt(i - 1));
        break;
      }
      default:
        throw new LuaError("wrong number of arguments to 'insert'");
    }
    t.setInt(pos, a[a.length - 1]);
    return undefined;
  });
  def('remove', (tv, posv) => {
    const t = checkTable(tv, 1, 'remove');
    const e = auxLen(t);
    let pos = optInt(posv, 2, 'remove', e);
    if (!(1 <= pos && pos <= e)) return new LuaMulti([]);
    const result = t.getInt(pos);
    for (; pos < e; pos++) t.setInt(pos, t.getInt(pos + 1));
    t.setInt(e, undefined);
    return result;
  });
  def('concat', (tv, sepv, iv, jv) => {
    const t = checkTable(tv, 1, 'concat');
    const sep = sepv === undefined ? '' : typeof sepv === 'number' ? numberToString(sepv) : String(sepv);
    const i = optInt(iv, 3, 'concat', 1);
    const last = jv === undefined ? auxLen(t) : checkInt(jv, 4, 'concat');
    const parts: string[] = [];
    for (let k = i; k <= last; k++) {
      const v = t.getInt(k);
      if (typeof v === 'string') parts.push(v);
      else if (typeof v === 'number') parts.push(numberToString(v));
      else throw new LuaError(`invalid value (at index ${k}) in table for 'concat'`);
    }
    return parts.join(sep);
  });
  def('sort', (tv, f) => {
    const t = checkTable(tv, 1, 'sort');
    const n = auxLen(t);
    if (f !== undefined && typeof f !== 'function') throw new LuaError("bad argument #2 to 'sort' (function expected)");
    auxsort(t, 1, n, f);
    return undefined;
  });
  def('unpack', tableUnpack);
  def('pack', (...a) => {
    const t = new LuaTable(a.length, 1);
    t.set('n', a.length);
    for (let i = a.length; i >= 1; i--) t.setInt(i, a[i - 1]);
    return t;
  });
  G.set('table', lib);
  return lib;
}

// ------------------------------------------------------------- math library

export function installMathLib(G: LuaTable): LuaTable {
  const lib = new LuaTable();
  const def = (name: string, f: (...a: LuaValue[]) => LuaValue) => lib.set(name, f);
  const n1 = (name: string, op: (x: number) => number) => def(name, (x) => op(checkNumber(x, 1, name)));
  n1('abs', Math.abs);
  n1('ceil', Math.ceil);
  n1('floor', Math.floor);
  n1('sqrt', Math.sqrt);
  n1('sin', Math.sin);
  n1('cos', Math.cos);
  n1('tan', Math.tan);
  n1('asin', Math.asin);
  n1('acos', Math.acos);
  n1('atan', Math.atan);
  n1('sinh', Math.sinh);
  n1('cosh', Math.cosh);
  n1('tanh', Math.tanh);
  n1('exp', Math.exp);
  n1('log10', Math.log10);
  n1('deg', (x) => x * (180 / Math.PI));
  n1('rad', (x) => x * (Math.PI / 180));
  def('atan2', (y, x) => Math.atan2(checkNumber(y, 1, 'atan2'), checkNumber(x, 2, 'atan2')));
  def('pow', (x, y) => Math.pow(checkNumber(x, 1, 'pow'), checkNumber(y, 2, 'pow')));
  def('fmod', (x, y) => checkNumber(x, 1, 'fmod') % checkNumber(y, 2, 'fmod'));
  def('modf', (xv) => {
    const x = checkNumber(xv, 1, 'modf');
    const ip = x < 0 ? Math.ceil(x) : Math.floor(x);
    return new LuaMulti([ip, x === ip ? 0 : x - ip]);
  });
  def('log', (xv, bv) => {
    const x = checkNumber(xv, 1, 'log');
    if (bv === undefined) return Math.log(x);
    const b = checkNumber(bv, 2, 'log');
    if (b === 10) return Math.log10(x);
    return Math.log(x) / Math.log(b);
  });
  def('ldexp', (m, e) => checkNumber(m, 1, 'ldexp') * Math.pow(2, checkInt(e, 2, 'ldexp')));
  def('min', (...a) => {
    let d = checkNumber(a[0], 1, 'min');
    for (let i = 1; i < a.length; i++) {
      const x = checkNumber(a[i], i + 1, 'min');
      if (x < d) d = x;
    }
    return d;
  });
  def('max', (...a) => {
    let d = checkNumber(a[0], 1, 'max');
    for (let i = 1; i < a.length; i++) {
      const x = checkNumber(a[i], i + 1, 'max');
      if (x > d) d = x;
    }
    return d;
  });
  def('random', () => {
    throw new LuaError('math.random is replaced by the game libraries');
  });
  def('randomseed', () => undefined);
  lib.set('pi', Math.PI);
  lib.set('huge', Infinity);
  G.set('math', lib);
  return lib;
}

export function installStringLib(G: LuaTable): LuaTable {
  const lib = makeStringLib(tostring);
  G.set('string', lib);
  return lib;
}

export function createGlobals(opts: BaseLibOptions = {}): LuaTable {
  const G = new LuaTable();
  installBaseLib(G, opts);
  installTableLib(G);
  installMathLib(G);
  installStringLib(G);
  const os = new LuaTable();
  os.set('time', () => 0);
  os.set('clock', () => 0);
  os.set('date', () => '');
  G.set('os', os);
  return G;
}

export { eq, mret };
