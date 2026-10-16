// printf-style number formatting matching the msvcrt runtime the game links against:
// exponents always carry at least three digits ("1e+020") and infinities print as "1.#INF".

function special(n: number, upper: boolean): string | undefined {
  if (n !== n) return upper ? '-1.#IND' : '-1.#IND';
  if (n === Infinity) return '1.#INF';
  if (n === -Infinity) return '-1.#INF';
  return undefined;
}

function fixExponent(s: string, upper: boolean): string {
  // JS toExponential gives "1.5e+2"; msvcrt pads the exponent to three digits.
  const i = s.indexOf('e');
  if (i === -1) return s;
  const mant = s.slice(0, i);
  const sign = s[i + 1];
  let digits = s.slice(i + 2);
  while (digits.length < 3) digits = `0${digits}`;
  return mant + (upper ? 'E' : 'e') + sign + digits;
}

export function formatE(n: number, prec: number, upper = false, alt = false): string {
  const sp = special(n, upper);
  if (sp !== undefined) return sp;
  let s = fixExponent(Math.abs(n).toExponential(prec), upper);
  if (alt && prec === 0) s = s.replace(/([eE])/, '.$1');
  return (n < 0 || Object.is(n, -0) ? '-' : '') + s;
}

export function formatF(n: number, prec: number, alt = false): string {
  const sp = special(n, false);
  if (sp !== undefined) return sp;
  let s = Math.abs(n).toFixed(prec);
  if (Math.abs(n) >= 1e21) s = bigFixed(Math.abs(n), prec);
  if (alt && prec === 0) s += '.';
  return (n < 0 || Object.is(n, -0) ? '-' : '') + s;
}

function bigFixed(n: number, prec: number): string {
  let s = BigInt(n).toString();
  if (prec > 0) s += `.${'0'.repeat(prec)}`;
  return s;
}

export function formatG(n: number, prec: number, upper = false, alt = false): string {
  const sp = special(n, upper);
  if (sp !== undefined) return sp;
  if (prec === 0) prec = 1;
  if (n === 0) {
    let z = '0';
    if (alt) z = `0.${'0'.repeat(prec - 1)}`;
    return (Object.is(n, -0) ? '-' : '') + z;
  }
  const e = Math.abs(n).toExponential(prec - 1);
  const x = parseInt(e.slice(e.indexOf('e') + 1), 10);
  let s: string;
  if (prec > x && x >= -4) {
    s = Math.abs(n).toFixed(prec - 1 - x);
    if (!alt && s.indexOf('.') !== -1) s = s.replace(/\.?0+$/, '');
  } else {
    let m = e.slice(0, e.indexOf('e'));
    if (!alt && m.indexOf('.') !== -1) m = m.replace(/\.?0+$/, '');
    s = fixExponent(m + e.slice(e.indexOf('e')), upper);
  }
  return (n < 0 ? '-' : '') + s;
}

function pad(s: string, width: number, left: boolean, zero: boolean): string {
  if (s.length >= width) return s;
  if (left) return s + ' '.repeat(width - s.length);
  if (zero) {
    const signed = s[0] === '-' || s[0] === '+' || s[0] === ' ';
    const head = signed ? s[0] : '';
    const body = signed ? s.slice(1) : s;
    return head + '0'.repeat(width - s.length) + body;
  }
  return ' '.repeat(width - s.length) + s;
}

export interface Spec {
  flags: string;
  width: number;
  precision: number | undefined;
  conv: string;
}

/** Formats one numeric conversion the way C printf would. */
export function formatNumber(spec: Spec, n: number): string {
  const { flags, width, conv } = spec;
  const left = flags.includes('-');
  const plus = flags.includes('+');
  const space = flags.includes(' ');
  const alt = flags.includes('#');
  let zero = flags.includes('0') && !left;
  let s: string;
  switch (conv) {
    case 'd':
    case 'i': {
      const v = BigInt.asIntN(64, BigInt(Math.trunc(n)));
      s = (v < 0n ? -v : v).toString();
      if (spec.precision !== undefined) {
        zero = false;
        if (s.length < spec.precision) s = '0'.repeat(spec.precision - s.length) + s;
        if (spec.precision === 0 && v === 0n) s = '';
      }
      s = (v < 0n ? '-' : plus ? '+' : space ? ' ' : '') + s;
      break;
    }
    case 'u':
    case 'x':
    case 'X':
    case 'o': {
      const v = BigInt.asUintN(64, BigInt(Math.trunc(n)));
      const radix = conv === 'o' ? 8 : conv === 'u' ? 10 : 16;
      s = v.toString(radix);
      if (conv === 'X') s = s.toUpperCase();
      if (spec.precision !== undefined) {
        zero = false;
        if (s.length < spec.precision) s = '0'.repeat(spec.precision - s.length) + s;
      }
      if (alt && v !== 0n) {
        if (conv === 'x') s = `0x${s}`;
        else if (conv === 'X') s = `0X${s}`;
        else if (conv === 'o' && s[0] !== '0') s = `0${s}`;
      }
      break;
    }
    case 'e':
    case 'E':
      s = formatE(n, spec.precision ?? 6, conv === 'E', alt);
      if (n >= 0 && (plus || space)) s = (plus ? '+' : ' ') + s;
      break;
    case 'f':
    case 'F':
      s = formatF(n, spec.precision ?? 6, alt);
      if (n >= 0 && (plus || space)) s = (plus ? '+' : ' ') + s;
      break;
    case 'g':
    case 'G':
      s = formatG(n, spec.precision ?? 6, conv === 'G', alt);
      if (n >= 0 && (plus || space)) s = (plus ? '+' : ' ') + s;
      break;
    case 'a':
    case 'A':
      s = n.toString(16);
      break;
    default:
      throw new Error(`bad conversion ${conv}`);
  }
  return pad(s, width, left, zero);
}

export function padString(s: string, spec: Spec): string {
  if (spec.precision !== undefined) s = s.slice(0, spec.precision);
  return pad(s, spec.width, spec.flags.includes('-'), false);
}
