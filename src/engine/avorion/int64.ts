// 64-bit integer helpers on pairs of unsigned 32-bit halves (hi, lo), for hot paths where BigInt is too slow.

/** Full 32×32 → 64 product; returns [hi, lo]. */
export function mulFull32(a: number, b: number): [number, number] {
  const a0 = a & 0xffff;
  const a1 = a >>> 16;
  const b0 = b & 0xffff;
  const b1 = b >>> 16;
  const p00 = a0 * b0;
  const p01 = a0 * b1;
  const p10 = a1 * b0;
  const p11 = a1 * b1;
  const mid = (p00 >>> 16) + (p01 & 0xffff) + (p10 & 0xffff);
  const lo = (((mid & 0xffff) << 16) | (p00 & 0xffff)) >>> 0;
  const hi = (p11 + (p01 >>> 16) + (p10 >>> 16) + Math.floor(mid / 65536)) >>> 0;
  return [hi, lo];
}

/** (ah:al) * (bh:bl) mod 2^64. */
export function mul64(ah: number, al: number, bh: number, bl: number): [number, number] {
  const [ph, pl] = mulFull32(al, bl);
  const hi = (ph + Math.imul(ah, bl) + Math.imul(al, bh)) >>> 0;
  return [hi, pl];
}

export function add64(ah: number, al: number, bh: number, bl: number): [number, number] {
  const lo = al + bl;
  const carry = lo > 0xffffffff ? 1 : 0;
  return [(ah + bh + carry) >>> 0, lo >>> 0];
}

export function toBigInt(hi: number, lo: number): bigint {
  return (BigInt(hi) << 32n) | BigInt(lo);
}

export function fromBigInt(v: bigint): [number, number] {
  const u = BigInt.asUintN(64, v);
  return [Number(u >> 32n), Number(u & 0xffffffffn)];
}

/** Signed decimal of the 64-bit value. */
export function toSignedString(hi: number, lo: number): string {
  return BigInt.asIntN(64, toBigInt(hi, lo)).toString();
}

/** The value as a double (what Seed.value returns), signed. */
export function toSignedNumber(hi: number, lo: number): number {
  if (hi & 0x80000000) {
    // two's complement negative
    const nlo = (~lo + 1) >>> 0;
    const nhi = (~hi + (nlo === 0 ? 1 : 0)) >>> 0;
    return -(nhi * 4294967296 + nlo);
  }
  return hi * 4294967296 + lo;
}

/** C cast double → int64 (truncation toward zero), as [hi, lo]. */
export function fromDouble(d: number): [number, number] {
  if (d !== d) return [0x80000000, 0];
  const t = Math.trunc(d);
  if (t >= 9223372036854775807 || t < -9223372036854775808) return [0x80000000, 0];
  if (Math.abs(t) < 4294967296) {
    if (t >= 0) return [0, t >>> 0];
    const lo = t >>> 0;
    return [0xffffffff, lo];
  }
  return fromBigInt(BigInt(t));
}
