// Port of Lua 5.2 lstrlib.c. Strings are byte strings: one JS char per byte (0-255).

import { formatNumber, padString, type Spec } from './format';
import {
  call,
  first,
  getMetamethod,
  index,
  LuaError,
  LuaMulti,
  LuaTable,
  type LuaValue,
  mret,
  numberToString,
  stringMeta,
  tonum,
  truthy,
  type,
} from './runtime';

const L_ESC = 37; // '%'
const SPECIALS = '^$*+?.([%-';
const MAXCCALLS = 200;
const CAP_UNFINISHED = -1;
const CAP_POSITION = -2;

interface MatchState {
  src: string;
  pat: string;
  level: number;
  capture: { init: number; len: number }[];
  matchdepth: number;
}

function isalpha(c: number) {
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}
function isdigit(c: number) {
  return c >= 48 && c <= 57;
}
function islower(c: number) {
  return c >= 97 && c <= 122;
}
function isupper(c: number) {
  return c >= 65 && c <= 90;
}
function isspace(c: number) {
  return c === 32 || (c >= 9 && c <= 13);
}
function iscntrl(c: number) {
  return c < 32 || c === 127;
}
function ispunct(c: number) {
  return c > 32 && c < 127 && !isalpha(c) && !isdigit(c);
}
function isxdigit(c: number) {
  return isdigit(c) || (c >= 97 && c <= 102) || (c >= 65 && c <= 70);
}
function isgraph(c: number) {
  return c > 32 && c < 127;
}

function classEnd(ms: MatchState, p: number): number {
  const pat = ms.pat;
  if (p >= pat.length) throw new LuaError("malformed pattern (ends with '%')");
  const c = pat.charCodeAt(p++);
  if (c === L_ESC) {
    if (p >= pat.length) throw new LuaError("malformed pattern (ends with '%')");
    return p + 1;
  }
  if (c === 91 /* [ */) {
    if (pat.charCodeAt(p) === 94 /* ^ */) p++;
    do {
      if (p >= pat.length) throw new LuaError("malformed pattern (missing ']')");
      const cc = pat.charCodeAt(p++);
      if (cc === L_ESC && p < pat.length) p++;
    } while (pat.charCodeAt(p) !== 93 /* ] */);
    return p + 1;
  }
  return p;
}

function singleMatchClass(c: number, cl: number): boolean {
  let res: boolean;
  switch (cl | 32) {
    case 97:
      res = isalpha(c);
      break; // a
    case 99:
      res = iscntrl(c);
      break; // c
    case 100:
      res = isdigit(c);
      break; // d
    case 103:
      res = isgraph(c);
      break; // g
    case 108:
      res = islower(c);
      break; // l
    case 112:
      res = ispunct(c);
      break; // p
    case 115:
      res = isspace(c);
      break; // s
    case 117:
      res = isupper(c);
      break; // u
    case 119:
      res = isalpha(c) || isdigit(c);
      break; // w
    case 120:
      res = isxdigit(c);
      break; // x
    case 122:
      res = c === 0;
      break; // z
    default:
      return cl === c;
  }
  if (isupper(cl)) res = !res;
  return res;
}

function matchBracketClass(ms: MatchState, c: number, p: number, ec: number): boolean {
  const pat = ms.pat;
  let sig = true;
  if (pat.charCodeAt(p + 1) === 94) {
    sig = false;
    p++;
  }
  while (++p < ec) {
    const pc = pat.charCodeAt(p);
    if (pc === L_ESC) {
      p++;
      if (singleMatchClass(c, pat.charCodeAt(p))) return sig;
    } else if (pat.charCodeAt(p + 1) === 45 /* - */ && p + 2 < ec) {
      p += 2;
      if (pc <= c && c <= pat.charCodeAt(p)) return sig;
    } else if (pc === c) return sig;
  }
  return !sig;
}

function singleMatch(ms: MatchState, s: number, p: number, ep: number): boolean {
  if (s >= ms.src.length) return false;
  const c = ms.src.charCodeAt(s);
  const pc = ms.pat.charCodeAt(p);
  switch (pc) {
    case 46: // .
      return true;
    case L_ESC:
      return singleMatchClass(c, ms.pat.charCodeAt(p + 1));
    case 91:
      return matchBracketClass(ms, c, p, ep - 1);
    default:
      return pc === c;
  }
}

function matchBalance(ms: MatchState, s: number, p: number): number {
  if (p + 1 >= ms.pat.length) throw new LuaError("malformed pattern (missing arguments to '%b')");
  if (s >= ms.src.length || ms.src.charCodeAt(s) !== ms.pat.charCodeAt(p)) return -1;
  const b = ms.pat.charCodeAt(p);
  const e = ms.pat.charCodeAt(p + 1);
  let cont = 1;
  while (++s < ms.src.length) {
    const c = ms.src.charCodeAt(s);
    if (c === e) {
      if (--cont === 0) return s + 1;
    } else if (c === b) cont++;
  }
  return -1;
}

function maxExpand(ms: MatchState, s: number, p: number, ep: number): number {
  let i = 0;
  while (singleMatch(ms, s + i, p, ep)) i++;
  while (i >= 0) {
    const res = doMatch(ms, s + i, ep + 1);
    if (res !== -1) return res;
    i--;
  }
  return -1;
}

function minExpand(ms: MatchState, s: number, p: number, ep: number): number {
  for (;;) {
    const res = doMatch(ms, s, ep + 1);
    if (res !== -1) return res;
    if (singleMatch(ms, s, p, ep)) s++;
    else return -1;
  }
}

function startCapture(ms: MatchState, s: number, p: number, what: number): number {
  ms.capture[ms.level] = { init: s, len: what };
  ms.level++;
  const res = doMatch(ms, s, p);
  if (res === -1) ms.level--;
  return res;
}

function endCapture(ms: MatchState, s: number, p: number): number {
  const l = captureToClose(ms);
  ms.capture[l].len = s - ms.capture[l].init;
  const res = doMatch(ms, s, p);
  if (res === -1) ms.capture[l].len = CAP_UNFINISHED;
  return res;
}

function captureToClose(ms: MatchState): number {
  let level = ms.level;
  for (level--; level >= 0; level--) if (ms.capture[level].len === CAP_UNFINISHED) return level;
  throw new LuaError('invalid pattern capture');
}

function checkCapture(ms: MatchState, l: number): number {
  l -= 49; // '1'
  if (l < 0 || l >= ms.level || ms.capture[l].len === CAP_UNFINISHED) throw new LuaError(`invalid capture index %${l + 1}`);
  return l;
}

function matchCapture(ms: MatchState, s: number, l: number): number {
  l = checkCapture(ms, l);
  const len = ms.capture[l].len;
  const cap = ms.src.substr(ms.capture[l].init, len);
  if (ms.src.length - s >= len && ms.src.substr(s, len) === cap) return s + len;
  return -1;
}

function doMatch(ms: MatchState, s: number, p: number): number {
  if (ms.matchdepth-- === 0) throw new LuaError('pattern too complex');
  const pat = ms.pat;
  const plen = pat.length;
  try {
    for (;;) {
      if (p >= plen) return s;
      const pc = pat.charCodeAt(p);
      switch (pc) {
        case 40: // (
          if (pat.charCodeAt(p + 1) === 41) return startCapture(ms, s, p + 2, CAP_POSITION);
          return startCapture(ms, s, p + 1, CAP_UNFINISHED);
        case 41: // )
          return endCapture(ms, s, p + 1);
        case 36: // $
          if (p + 1 === plen) return s === ms.src.length ? s : -1;
          break;
        case L_ESC: {
          const nc = pat.charCodeAt(p + 1);
          if (nc === 98 /* b */) {
            s = matchBalance(ms, s, p + 2);
            if (s !== -1) {
              p += 4;
              continue;
            }
            return -1;
          }
          if (nc === 102 /* f */) {
            p += 2;
            if (pat.charCodeAt(p) !== 91) throw new LuaError("missing '[' after '%f' in pattern");
            const ep = classEnd(ms, p);
            const prev = s === 0 ? 0 : ms.src.charCodeAt(s - 1);
            const cur = s < ms.src.length ? ms.src.charCodeAt(s) : 0;
            if (!matchBracketClass(ms, prev, p, ep - 1) && matchBracketClass(ms, cur, p, ep - 1)) {
              p = ep;
              continue;
            }
            return -1;
          }
          if (isdigit(nc)) {
            s = matchCapture(ms, s, nc);
            if (s !== -1) {
              p += 2;
              continue;
            }
            return -1;
          }
          break;
        }
      }
      // default
      const ep = classEnd(ms, p);
      const epc = ep < plen ? pat.charCodeAt(ep) : 0;
      if (!singleMatch(ms, s, p, ep)) {
        if (epc === 42 /* * */ || epc === 63 /* ? */ || epc === 45 /* - */) {
          p = ep + 1;
          continue;
        }
        return -1;
      }
      switch (epc) {
        case 63: {
          const res = doMatch(ms, s + 1, ep + 1);
          if (res !== -1) return res;
          p = ep + 1;
          continue;
        }
        case 43:
          return maxExpand(ms, s + 1, p, ep);
        case 42:
          return maxExpand(ms, s, p, ep);
        case 45:
          return minExpand(ms, s, p, ep);
        default:
          s++;
          p = ep;
          continue;
      }
    }
  } finally {
    ms.matchdepth++;
  }
}

function getOneCapture(ms: MatchState, i: number, s: number, e: number): LuaValue {
  if (i >= ms.level) {
    if (i === 0) return ms.src.slice(s, e);
    throw new LuaError('invalid capture index');
  }
  const l = ms.capture[i].len;
  if (l === CAP_UNFINISHED) throw new LuaError('unfinished capture');
  if (l === CAP_POSITION) return ms.capture[i].init + 1;
  return ms.src.substr(ms.capture[i].init, l);
}

function getCaptures(ms: MatchState, s: number, e: number, wholeIfNone: boolean): LuaValue[] {
  const n = ms.level === 0 && wholeIfNone ? 1 : ms.level;
  const out: LuaValue[] = [];
  for (let i = 0; i < n; i++) out.push(getOneCapture(ms, i, s, e));
  return out;
}

function newState(src: string, pat: string): MatchState {
  return { src, pat, level: 0, capture: [], matchdepth: MAXCCALLS };
}

function checkStr(v: LuaValue, arg: number, fname: string): string {
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return numberToString(v);
  throw new LuaError(`bad argument #${arg} to '${fname}' (string expected, got ${v === undefined ? 'no value' : type(v)})`);
}

function checkInt(v: LuaValue, arg: number, fname: string, def?: number): number {
  if (v === undefined && def !== undefined) return def;
  const n = tonum(v);
  if (n === undefined)
    throw new LuaError(`bad argument #${arg} to '${fname}' (number expected, got ${v === undefined ? 'no value' : type(v)})`);
  return n < 0 ? Math.ceil(n) : Math.floor(n);
}

function posrelat(pos: number, len: number): number {
  if (pos >= 0) return pos;
  if (-pos > len) return 0;
  return len + pos + 1;
}

function strFindAux(find: boolean, s0: LuaValue, p0: LuaValue, init0: LuaValue, plain: LuaValue): LuaValue {
  const fname = find ? 'find' : 'match';
  const s = checkStr(s0, 1, fname);
  const p = checkStr(p0, 2, fname);
  let init = posrelat(checkInt(init0, 3, fname, 1), s.length);
  if (init < 1) init = 1;
  else if (init > s.length + 1) return undefined;
  if (find && (truthy(plain) || !/[\^$*+?.([%-]/.test(p))) {
    const idx = s.indexOf(p, init - 1);
    if (idx === -1) return undefined;
    return mret(idx + 1, idx + p.length);
  }
  const anchor = p.charCodeAt(0) === 94;
  const ms = newState(s, anchor ? p.slice(1) : p);
  let s1 = init - 1;
  do {
    ms.level = 0;
    ms.matchdepth = MAXCCALLS;
    const e = doMatch(ms, s1, 0);
    if (e !== -1) {
      if (find) return mret(s1 + 1, e, ...getCaptures(ms, -1, -1, false));
      return mret(...getCaptures(ms, s1, e, true));
    }
  } while (s1++ < s.length && !anchor);
  return undefined;
}

function gmatch(s0: LuaValue, p0: LuaValue): LuaValue {
  const s = checkStr(s0, 1, 'gmatch');
  const p = checkStr(p0, 2, 'gmatch');
  let srcpos = 0;
  return () => {
    const ms = newState(s, p);
    for (let src = srcpos; src <= s.length; src++) {
      ms.level = 0;
      ms.matchdepth = MAXCCALLS;
      const e = doMatch(ms, src, 0);
      if (e !== -1) {
        let newstart = e;
        if (e === src) newstart++;
        srcpos = newstart;
        return mret(...getCaptures(ms, src, e, true));
      }
    }
    return undefined;
  };
}

function addValue(ms: MatchState, s: number, e: number, repl: LuaValue): string {
  const tr = type(repl);
  if (tr === 'number' || tr === 'string') {
    const news = typeof repl === 'number' ? numberToString(repl) : (repl as string);
    let out = '';
    for (let i = 0; i < news.length; i++) {
      const c = news.charCodeAt(i);
      if (c !== L_ESC) out += news[i];
      else {
        i++;
        const d = news.charCodeAt(i);
        if (!isdigit(d)) {
          if (d !== L_ESC) throw new LuaError("invalid use of '%' in replacement string");
          out += '%';
        } else if (d === 48) out += ms.src.slice(s, e);
        else {
          const cap = getOneCapture(ms, d - 49, s, e);
          out += typeof cap === 'number' ? numberToString(cap) : (cap as string);
        }
      }
    }
    return out;
  }
  let v: LuaValue;
  const cap0 = getOneCapture(ms, 0, s, e);
  if (tr === 'function') v = first(call(repl, ...getCaptures(ms, s, e, true)));
  else v = index(repl, cap0);
  if (!truthy(v)) return ms.src.slice(s, e);
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return numberToString(v);
  throw new LuaError(`invalid replacement value (a ${type(v)})`);
}

function gsub(s0: LuaValue, p0: LuaValue, repl: LuaValue, maxN: LuaValue): LuaValue {
  const src = checkStr(s0, 1, 'gsub');
  let p = checkStr(p0, 2, 'gsub');
  const tr = type(repl);
  if (!(tr === 'number' || tr === 'string' || tr === 'table' || tr === 'function'))
    throw new LuaError("bad argument #3 to 'gsub' (string/function/table expected)");
  const maxS = maxN === undefined ? src.length + 1 : checkInt(maxN, 4, 'gsub');
  const anchor = p.charCodeAt(0) === 94;
  if (anchor) p = p.slice(1);
  const ms = newState(src, p);
  let s = 0;
  let n = 0;
  let out = '';
  while (n < maxS) {
    ms.level = 0;
    ms.matchdepth = MAXCCALLS;
    const e = doMatch(ms, s, 0);
    if (e !== -1) {
      n++;
      out += addValue(ms, s, e, repl);
    }
    if (e !== -1 && e > s) s = e;
    else if (s < src.length) out += src[s++];
    else break;
    if (anchor) break;
  }
  out += src.slice(s);
  return new LuaMulti([out, n]);
}

function tostringValue(v: LuaValue, tostringFn: (v: LuaValue) => string): string {
  return tostringFn(v);
}

function addQuoted(s: string): string {
  let out = '"';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 34 || c === 92 || c === 10) out += `\\${s[i]}`;
    else if (c === 13) out += '\\r';
    else if (c === 0) out += '\\0';
    else if (iscntrl(c)) {
      const next = i + 1 < s.length ? s.charCodeAt(i + 1) : -1;
      out += isdigit(next) ? `\\${String(c).padStart(3, '0')}` : `\\${c}`;
    } else out += s[i];
  }
  return `${out}"`;
}

export function makeStringLib(tostringFn: (v: LuaValue) => string): LuaTable {
  const lib = new LuaTable();
  const def = (name: string, f: (...a: LuaValue[]) => LuaValue) => lib.set(name, f);

  def('len', (s) => checkStr(s, 1, 'len').length);
  def('sub', (s0, i0, j0) => {
    const s = checkStr(s0, 1, 'sub');
    const l = s.length;
    let i = posrelat(checkInt(i0, 2, 'sub', 1), l);
    let j = posrelat(checkInt(j0, 3, 'sub', -1), l);
    if (i < 1) i = 1;
    if (j > l) j = l;
    if (i > j) return '';
    return s.slice(i - 1, j);
  });
  def('upper', (s) => checkStr(s, 1, 'upper').replace(/[a-z]+/g, (m) => m.toUpperCase()));
  def('lower', (s) => checkStr(s, 1, 'lower').replace(/[A-Z]+/g, (m) => m.toLowerCase()));
  def('rep', (s0, n0, sep0) => {
    const s = checkStr(s0, 1, 'rep');
    const n = checkInt(n0, 2, 'rep');
    if (n <= 0) return '';
    if (sep0 === undefined) return s.repeat(n);
    const sep = checkStr(sep0, 3, 'rep');
    return Array(n).fill(s).join(sep);
  });
  def('reverse', (s) => checkStr(s, 1, 'reverse').split('').reverse().join(''));
  def('byte', (s0, i0, j0) => {
    const s = checkStr(s0, 1, 'byte');
    const l = s.length;
    const posi = posrelat(checkInt(i0, 2, 'byte', 1), l);
    let pose = posrelat(j0 === undefined ? posi : checkInt(j0, 3, 'byte'), l);
    const pi = posi < 1 ? 1 : posi;
    if (pose > l) pose = l;
    if (pi > pose) return mret();
    const out: number[] = [];
    for (let i = pi; i <= pose; i++) out.push(s.charCodeAt(i - 1));
    return mret(...out);
  });
  def('char', (...args) => {
    let out = '';
    args.forEach((a, i) => {
      const c = checkInt(a, i + 1, 'char');
      if (c < 0 || c > 255) throw new LuaError(`bad argument #${i + 1} to 'char' (value out of range)`);
      out += String.fromCharCode(c);
    });
    return out;
  });
  def('find', (s, p, init, plain) => strFindAux(true, s, p, init, plain));
  def('match', (s, p, init) => strFindAux(false, s, p, init, undefined));
  def('gmatch', gmatch);
  def('gsub', gsub);
  def('format', (fmt0, ...args) => {
    const fmt = checkStr(fmt0, 1, 'format');
    let out = '';
    let arg = 0;
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt[i];
      if (c !== '%') {
        out += c;
        continue;
      }
      i++;
      if (fmt[i] === '%') {
        out += '%';
        continue;
      }
      const m = /^([-+ #0]*)(\d*)(?:\.(\d*))?([a-zA-Z])/.exec(fmt.slice(i));
      if (!m) throw new LuaError(`invalid option '%${fmt[i] ?? ''}' to 'format'`);
      i += m[0].length - 1;
      const spec: Spec = {
        flags: m[1],
        width: m[2] ? parseInt(m[2], 10) : 0,
        precision: m[3] !== undefined ? (m[3] === '' ? 0 : parseInt(m[3], 10)) : undefined,
        conv: m[4],
      };
      const argn = ++arg;
      if (argn > args.length) throw new LuaError(`bad argument #${argn + 1} to 'format' (no value)`);
      const v = args[argn - 1];
      switch (spec.conv) {
        case 'c':
          out += padString(String.fromCharCode(checkInt(v, argn + 1, 'format') & 0xff), { ...spec, precision: undefined });
          break;
        case 'd':
        case 'i':
        case 'o':
        case 'u':
        case 'x':
        case 'X':
        case 'e':
        case 'E':
        case 'f':
        case 'F':
        case 'g':
        case 'G':
        case 'a':
        case 'A': {
          const n = tonum(v);
          if (n === undefined) throw new LuaError(`bad argument #${argn + 1} to 'format' (number expected, got ${type(v)})`);
          out += formatNumber(spec, n);
          break;
        }
        case 'q':
          out += addQuoted(checkStr(v, argn + 1, 'format'));
          break;
        case 's':
          out += padString(tostringValue(v, tostringFn), spec);
          break;
        default:
          throw new LuaError(`invalid option '%${spec.conv}' to 'format'`);
      }
    }
    return out;
  });

  stringMeta.set('__index', lib);
  return lib;
}

export { getMetamethod, SPECIALS };
