// Core Lua 5.2 value semantics for transpiled game scripts: metatables, operators,
// calls with multiple results, string/number coercion and number formatting.
import { LuaError, LuaTable, type LuaValue } from './table';
import { formatG } from './format';

export { LuaError, LuaTable };
export type { LuaValue };

export type LuaFunction = (...args: LuaValue[]) => LuaValue;

/** Multiple results of a call. A single result is passed as the bare value instead. */
export class LuaMulti {
  constructor(public readonly v: LuaValue[]) {}
}

/** Host objects exposed to Lua (Avorion natives). The class supplies the metatable. */
export abstract class Userdata {
  abstract get luaMetatable(): LuaTable;
  readonly luaTypeName: string = 'userdata';
}

export const EMPTY = new LuaMulti([]);

export function first(x: LuaValue): LuaValue {
  return x instanceof LuaMulti ? x.v[0] : x;
}

export function nth(x: LuaValue, i: number): LuaValue {
  if (x instanceof LuaMulti) return x.v[i];
  return i === 0 ? x : undefined;
}

export function multiToArray(x: LuaValue): LuaValue[] {
  if (x instanceof LuaMulti) return x.v;
  return [x];
}

export function mret(...vals: LuaValue[]): LuaValue {
  return vals.length === 1 ? vals[0] : new LuaMulti(vals);
}

/** Results `fixed...` followed by every value of `tail` (a call or vararg in last position). */
export function mretv(fixed: LuaValue[], tail: LuaValue): LuaValue {
  if (tail instanceof LuaMulti) return new LuaMulti(fixed.concat(tail.v));
  fixed.push(tail);
  return fixed.length === 1 ? fixed[0] : new LuaMulti(fixed);
}

export function truthy(v: LuaValue): boolean {
  return v !== undefined && v !== false;
}

export function type(v: LuaValue): string {
  switch (typeof v) {
    case 'undefined':
      return 'nil';
    case 'boolean':
      return 'boolean';
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'function':
      return 'function';
    default:
      if (v instanceof LuaTable) return 'table';
      if (v instanceof Coroutine) return 'thread';
      return 'userdata';
  }
}

export class Coroutine {}

// ---------------------------------------------------------------- metatables

export const stringMeta = new LuaTable();

export function getMetatable(v: LuaValue): LuaTable | undefined {
  if (v instanceof LuaTable) return v.metatable;
  if (typeof v === 'string') return stringMeta;
  if (v instanceof Userdata) return v.luaMetatable;
  return undefined;
}

export function getMetamethod(v: LuaValue, event: string): LuaValue {
  const mt = getMetatable(v);
  return mt === undefined ? undefined : mt.getStr(event);
}

// ---------------------------------------------------------------- numbers & strings

/** lua_Number2str: "%.14g" through msvcrt printf. */
export function numberToString(n: number): string {
  return formatG(n, 14);
}

export function tostr(v: LuaValue): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return numberToString(v);
  throw new LuaError('attempt to concatenate a ' + type(v) + ' value');
}

const hexRe = /^\s*[-+]?0[xX]([0-9a-fA-F]*)(\.[0-9a-fA-F]*)?([pP][-+]?\d+)?\s*$/;
const decRe = /^\s*[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?\s*$/;

/** luaO_str2d: decimal or hex, surrounding spaces allowed, no inf/nan. */
export function str2number(s: string): number | undefined {
  if (/[nN]/.test(s)) return undefined;
  if (decRe.test(s)) return Number(s.trim());
  const m = hexRe.exec(s);
  if (m) {
    const t = s.trim();
    const neg = t[0] === '-';
    const intPart = m[1] || '';
    const frac = m[2] ? m[2].slice(1) : '';
    if (intPart === '' && frac === '') return undefined;
    let r = 0;
    for (const c of intPart) r = r * 16 + parseInt(c, 16);
    let scale = 1 / 16;
    for (const c of frac) {
      r += parseInt(c, 16) * scale;
      scale /= 16;
    }
    if (m[3]) r *= Math.pow(2, parseInt(m[3].slice(1), 10));
    return neg ? -r : r;
  }
  return undefined;
}

export function tonum(v: LuaValue): number | undefined {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return str2number(v);
  return undefined;
}

// ---------------------------------------------------------------- indexing

export function index(o: LuaValue, k: LuaValue): LuaValue {
  for (let loop = 0; loop < 100; loop++) {
    let h: LuaValue;
    if (o instanceof LuaTable) {
      const v = o.get(k);
      if (v !== undefined) return v;
      const mt = o.metatable;
      if (mt === undefined) return undefined;
      h = mt.getStr('__index');
      if (h === undefined) return undefined;
    } else {
      h = getMetamethod(o, '__index');
      if (h === undefined) throw new LuaError(`attempt to index a ${type(o)} value` + (typeof k === 'string' ? ` (field '${k}')` : ''));
    }
    if (typeof h === 'function') return first(h(o, k));
    o = h;
  }
  throw new LuaError("loop in gettable");
}

export function setindex(o: LuaValue, k: LuaValue, v: LuaValue): void {
  for (let loop = 0; loop < 100; loop++) {
    let h: LuaValue;
    if (o instanceof LuaTable) {
      if (o.get(k) !== undefined) {
        o.set(k, v);
        return;
      }
      const mt = o.metatable;
      h = mt === undefined ? undefined : mt.getStr('__newindex');
      if (h === undefined) {
        o.set(k, v);
        return;
      }
    } else {
      h = getMetamethod(o, '__newindex');
      if (h === undefined) throw new LuaError(`attempt to index a ${type(o)} value` + (typeof k === 'string' ? ` (field '${k}')` : ''));
    }
    if (typeof h === 'function') {
      h(o, k, v);
      return;
    }
    o = h;
  }
  throw new LuaError('loop in settable');
}

// ---------------------------------------------------------------- calls

function callMeta(f: LuaValue, args: LuaValue[]): LuaValue {
  const h = getMetamethod(f, '__call');
  if (typeof h !== 'function') throw new LuaError(`attempt to call a ${type(f)} value`);
  return h(f, ...args);
}

export function call(f: LuaValue, ...args: LuaValue[]): LuaValue {
  if (typeof f === 'function') return f(...args);
  return callMeta(f, args);
}

/** Call with `fixed` arguments followed by every value of `tail`. */
export function callv(f: LuaValue, fixed: LuaValue[], tail: LuaValue): LuaValue {
  if (tail instanceof LuaMulti) {
    for (const x of tail.v) fixed.push(x);
  } else fixed.push(tail);
  if (typeof f === 'function') return f(...fixed);
  return callMeta(f, fixed);
}

export function method(o: LuaValue, name: string, ...args: LuaValue[]): LuaValue {
  const f = index(o, name);
  if (typeof f === 'function') return f(o, ...args);
  if (f === undefined) throw new LuaError(`attempt to call method '${name}' (a nil value)`);
  return callMeta(f, [o, ...args]);
}

export function methodv(o: LuaValue, name: string, fixed: LuaValue[], tail: LuaValue): LuaValue {
  const f = index(o, name);
  const args = [o, ...fixed];
  if (tail instanceof LuaMulti) {
    for (const x of tail.v) args.push(x);
  } else args.push(tail);
  if (typeof f === 'function') return f(...args);
  if (f === undefined) throw new LuaError(`attempt to call method '${name}' (a nil value)`);
  return callMeta(f, args);
}

// ---------------------------------------------------------------- arithmetic

function arithMeta(event: string, a: LuaValue, b: LuaValue): LuaValue {
  let h = getMetamethod(a, event);
  if (h === undefined) h = getMetamethod(b, event);
  if (h === undefined) {
    const bad = tonum(a) === undefined ? a : b;
    throw new LuaError(`attempt to perform arithmetic on a ${type(bad)} value`);
  }
  return first(call(h, a, b));
}

function arithSlow(event: string, a: LuaValue, b: LuaValue, op: (x: number, y: number) => number): LuaValue {
  const x = tonum(a);
  const y = tonum(b);
  if (x !== undefined && y !== undefined) return op(x, y);
  return arithMeta(event, a, b);
}

export function luaMod(a: number, b: number): number {
  return a - Math.floor(a / b) * b;
}

export function add(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return arithSlow('__add', a, b, (x, y) => x + y);
}
export function sub(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return arithSlow('__sub', a, b, (x, y) => x - y);
}
export function mul(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return a * b;
  return arithSlow('__mul', a, b, (x, y) => x * y);
}
export function div(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return a / b;
  return arithSlow('__div', a, b, (x, y) => x / y);
}
export function mod(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return a - Math.floor(a / b) * b;
  return arithSlow('__mod', a, b, luaMod);
}
export function pow(a: LuaValue, b: LuaValue): LuaValue {
  if (typeof a === 'number' && typeof b === 'number') return Math.pow(a, b);
  return arithSlow('__pow', a, b, Math.pow);
}
export function unm(a: LuaValue): LuaValue {
  if (typeof a === 'number') return -a;
  const x = tonum(a);
  if (x !== undefined) return -x;
  const h = getMetamethod(a, '__unm');
  if (h === undefined) throw new LuaError(`attempt to perform arithmetic on a ${type(a)} value`);
  return first(call(h, a, a));
}

export function concat(a: LuaValue, b: LuaValue): LuaValue {
  const ta = typeof a;
  const tb = typeof b;
  if ((ta === 'string' || ta === 'number') && (tb === 'string' || tb === 'number')) return tostr(a) + tostr(b);
  let h = getMetamethod(a, '__concat');
  if (h === undefined) h = getMetamethod(b, '__concat');
  if (h === undefined) {
    const bad = ta === 'string' || ta === 'number' ? b : a;
    throw new LuaError(`attempt to concatenate a ${type(bad)} value`);
  }
  return first(call(h, a, b));
}

export function len(a: LuaValue): LuaValue {
  if (typeof a === 'string') return a.length;
  const h = getMetamethod(a, '__len');
  if (h !== undefined) return first(call(h, a, undefined));
  if (a instanceof LuaTable) return a.length();
  throw new LuaError(`attempt to get length of a ${type(a)} value`);
}

// ---------------------------------------------------------------- comparison

export function eq(a: LuaValue, b: LuaValue): boolean {
  if (a === b) return true;
  const ta = typeof a;
  if (ta !== 'object' || typeof b !== 'object') return false;
  if (a instanceof LuaTable && b instanceof LuaTable) {
    const h1 = a.metatable?.getStr('__eq');
    if (h1 === undefined) return false;
    const h2 = b.metatable?.getStr('__eq');
    if (h1 !== h2) return false;
    return truthy(first(call(h1, a, b)));
  }
  if (a instanceof Userdata && b instanceof Userdata) {
    const h1 = a.luaMetatable.getStr('__eq');
    if (h1 === undefined) return false;
    const h2 = b.luaMetatable.getStr('__eq');
    if (h1 !== h2) return false;
    return truthy(first(call(h1, a, b)));
  }
  return false;
}

export function lt(a: LuaValue, b: LuaValue): boolean {
  if (typeof a === 'number' && typeof b === 'number') return a < b;
  if (typeof a === 'string' && typeof b === 'string') return a < b;
  return orderMeta('__lt', a, b);
}

export function le(a: LuaValue, b: LuaValue): boolean {
  if (typeof a === 'number' && typeof b === 'number') return a <= b;
  if (typeof a === 'string' && typeof b === 'string') return a <= b;
  if (type(a) === type(b)) {
    const h = getMetamethod(a, '__le') ?? getMetamethod(b, '__le');
    if (h !== undefined) return truthy(first(call(h, a, b)));
    const h2 = getMetamethod(a, '__lt') ?? getMetamethod(b, '__lt');
    if (h2 !== undefined) return !truthy(first(call(h2, b, a)));
  }
  throw new LuaError(`attempt to compare ${type(a)} with ${type(b)}`);
}

function orderMeta(event: string, a: LuaValue, b: LuaValue): boolean {
  if (type(a) === type(b)) {
    const h = getMetamethod(a, event) ?? getMetamethod(b, event);
    if (h !== undefined) return truthy(first(call(h, a, b)));
  }
  throw new LuaError(`attempt to compare ${type(a)} with ${type(b)}`);
}

// ---------------------------------------------------------------- tables

/** A table built by a constructor: `named` fields go in first (OP_SETTABLE), then the list (OP_SETLIST). */
export function newTable(list: LuaValue[] | undefined, named: LuaValue[] | undefined, tail?: LuaValue, hasTail = false): LuaTable {
  const na = list ? list.length : 0;
  const nh = named ? named.length / 2 : 0;
  const t = new LuaTable(na, nh);
  if (named) {
    for (let i = 0; i < named.length; i += 2) {
      const k = named[i];
      if (k === undefined) throw new LuaError('table index is nil');
      setindex(t, k, named[i + 1]);
    }
  }
  let items = list;
  if (hasTail) {
    items = list ? list.slice() : [];
    if (tail instanceof LuaMulti) for (const x of tail.v) items.push(x);
    else items.push(tail);
  }
  if (items && items.length > 0) {
    if (items.length > t.arr.length) t.resizeArray(items.length);
    for (let i = items.length; i >= 1; i--) t.setInt(i, items[i - 1]);
  }
  return t;
}

/** Plain JS → Lua table helper for natives. */
export function tableFromArray(items: LuaValue[]): LuaTable {
  return newTable(items, undefined);
}

export function tableFromRecord(rec: Record<string, LuaValue>): LuaTable {
  const t = new LuaTable();
  for (const [k, v] of Object.entries(rec)) t.set(k, v);
  return t;
}
