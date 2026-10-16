// Hash functions behind Avorion's makeFastHash, SectorSeed and Seed(string).

/** Thomas Wang's 32-bit integer mix, on signed int32 with arithmetic shifts. */
function wang(k: number): number {
  k = (~k + (k << 15)) | 0;
  k = (k ^ (k >> 12)) | 0;
  k = Math.imul(k, 5);
  k = (k ^ (k >> 4)) | 0;
  k = Math.imul(k, 0x809);
  k = (k ^ (k >> 16)) | 0;
  return k;
}

/** lua_tointeger as the game reads it: cvttsd2si to int64, then the low 32 bits. */
export function luaToInt32(d: number): number {
  if (d !== d || d >= 2 ** 63 || d < -(2 ** 63)) return 0;
  const t = Math.trunc(d);
  if (t >= -2147483648 && t <= 2147483647) return t | 0;
  return Number(BigInt.asIntN(32, BigInt(t)));
}

/** makeFastHash(a, b, c) = W(c + W(a + W(b))) on int32. */
export function makeFastHash(a: number, b: number, c: number): number {
  return wang((luaToInt32(c) + wang((luaToInt32(a) + wang(luaToInt32(b))) | 0)) | 0);
}

/** Byte hasher behind SectorSeed: h ^= (h << 5) ^ sign_extend(byte), over 64-bit h. Input bytes ≤ 8 per update. */
export class ByteHasher {
  hi = 0;
  lo = 0;

  private byte(b: number): void {
    // sign-extended byte as a 64-bit value
    const sb = b > 127 ? b - 256 : b;
    const bl = sb >>> 0;
    const bh = sb < 0 ? 0xffffffff : 0;
    const shl = (this.lo << 5) >>> 0;
    const shh = ((this.hi << 5) | (this.lo >>> 27)) >>> 0;
    this.lo = (this.lo ^ shl ^ bl) >>> 0;
    this.hi = (this.hi ^ shh ^ bh) >>> 0;
  }

  int32(v: number): void {
    for (let i = 0; i < 4; i++) this.byte((v >>> (8 * i)) & 0xff);
  }

  int64(hi: number, lo: number): void {
    for (let i = 0; i < 4; i++) this.byte((lo >>> (8 * i)) & 0xff);
    for (let i = 0; i < 4; i++) this.byte((hi >>> (8 * i)) & 0xff);
  }
}

/** SectorSeed(x, y, seed): coordinates clamped to the galaxy, then hashed with the 64-bit seed. */
export function sectorSeed(x: number, y: number, seedHi: number, seedLo: number, min = -499, max = 500): [number, number] {
  const cx = Math.max(min, Math.min(max, x | 0));
  const cy = Math.max(min, Math.min(max, y | 0));
  const h = new ByteHasher();
  h.int32(cx);
  h.int32(cy);
  h.int64(seedHi, seedLo);
  return [h.hi, h.lo];
}

// ------------------------------------------------------------------ CityHash64 v1.1

const M64 = (1n << 64n) - 1n;
const k0 = 0xc3a5c85c97cb3127n;
const k1 = 0xb492b66fbe98f273n;
const k2 = 0x9ae16a3b2f90404fn;
const kMul = 0x9ddfea08eb382d69n;

function f64(s: Uint8Array, i: number): bigint {
  let v = 0n;
  for (let k = 7; k >= 0; k--) v = (v << 8n) | BigInt(s[i + k]);
  return v;
}
function f32(s: Uint8Array, i: number): bigint {
  return BigInt((s[i] | (s[i + 1] << 8) | (s[i + 2] << 16) | (s[i + 3] << 24)) >>> 0);
}
const rot = (v: bigint, sh: number) => (sh === 0 ? v : ((v >> BigInt(sh)) | (v << BigInt(64 - sh))) & M64);
const smix = (v: bigint) => v ^ (v >> 47n);
function bswap(v: bigint): bigint {
  let r = 0n;
  for (let i = 0; i < 8; i++) {
    r = (r << 8n) | (v & 0xffn);
    v >>= 8n;
  }
  return r;
}
function hl16(u: bigint, v: bigint, mul = kMul): bigint {
  let a = ((u ^ v) * mul) & M64;
  a ^= a >> 47n;
  let b = ((v ^ a) * mul) & M64;
  b ^= b >> 47n;
  return (b * mul) & M64;
}
function hl0to16(s: Uint8Array): bigint {
  const n = s.length;
  if (n >= 8) {
    const mul = (k2 + BigInt(n) * 2n) & M64;
    const a = (f64(s, 0) + k2) & M64;
    const b = f64(s, n - 8);
    const c = (rot(b, 37) * mul + a) & M64;
    const d = ((rot(a, 25) + b) * mul) & M64;
    return hl16(c, d, mul);
  }
  if (n >= 4) {
    const mul = (k2 + BigInt(n) * 2n) & M64;
    const a = f32(s, 0);
    return hl16((BigInt(n) + (a << 3n)) & M64, f32(s, n - 4), mul);
  }
  if (n > 0) {
    const a = BigInt(s[0]);
    const b = BigInt(s[n >> 1]);
    const c = BigInt(s[n - 1]);
    const y = (a + (b << 8n)) & 0xffffffffn;
    const z = (BigInt(n) + (c << 2n)) & 0xffffffffn;
    return (smix(((y * k2) ^ (z * k0)) & M64) * k2) & M64;
  }
  return k2;
}
function hl17to32(s: Uint8Array): bigint {
  const n = s.length;
  const mul = (k2 + BigInt(n) * 2n) & M64;
  const a = (f64(s, 0) * k1) & M64;
  const b = f64(s, 8);
  const c = (f64(s, n - 8) * mul) & M64;
  const d = (f64(s, n - 16) * k2) & M64;
  return hl16((rot((a + b) & M64, 43) + rot(c, 30) + d) & M64, (a + rot((b + k2) & M64, 18) + c) & M64, mul);
}
function hl33to64(s: Uint8Array): bigint {
  const n = s.length;
  const mul = (k2 + BigInt(n) * 2n) & M64;
  let a = (f64(s, 0) * k2) & M64;
  let b = f64(s, 8);
  const c = f64(s, n - 24);
  const d = f64(s, n - 32);
  const e = (f64(s, 16) * k2) & M64;
  const f = (f64(s, 24) * 9n) & M64;
  const g = f64(s, n - 8);
  const h = (f64(s, n - 16) * mul) & M64;
  const u = (rot((a + g) & M64, 43) + (rot(b, 30) + c) * 9n) & M64;
  const v = (((a + g) ^ d) + f + 1n) & M64;
  const w = (bswap(((u + v) * mul) & M64) + h) & M64;
  const x = (rot((e + f) & M64, 42) + c) & M64;
  const y = ((bswap(((v + w) * mul) & M64) + g) * mul) & M64;
  const z = (e + f + c) & M64;
  a = (bswap(((x + z) * mul + y) & M64) + b) & M64;
  b = (smix(((z + a) * mul + d + h) & M64) * mul) & M64;
  return (b + x) & M64;
}
function wh32(w: bigint, x: bigint, y: bigint, z: bigint, a: bigint, b: bigint): [bigint, bigint] {
  a = (a + w) & M64;
  b = rot((b + a + z) & M64, 21);
  const c = a;
  a = (a + x) & M64;
  a = (a + y) & M64;
  b = (b + rot(a, 44)) & M64;
  return [(a + z) & M64, (b + c) & M64];
}
const wh32s = (s: Uint8Array, i: number, a: bigint, b: bigint) => wh32(f64(s, i), f64(s, i + 8), f64(s, i + 16), f64(s, i + 24), a, b);

export function cityHash64(s: Uint8Array): bigint {
  const n = s.length;
  if (n <= 32) return n <= 16 ? hl0to16(s) : hl17to32(s);
  if (n <= 64) return hl33to64(s);
  let x = f64(s, n - 40);
  let y = (f64(s, n - 16) + f64(s, n - 56)) & M64;
  let z = hl16((f64(s, n - 48) + BigInt(n)) & M64, f64(s, n - 24));
  let v = wh32s(s, n - 64, BigInt(n), z);
  let w = wh32s(s, n - 32, (y + k1) & M64, x);
  x = (x * k1 + f64(s, 0)) & M64;
  let len = (n - 1) & ~63;
  let p = 0;
  do {
    x = (rot((x + y + v[0] + f64(s, p + 8)) & M64, 37) * k1) & M64;
    y = (rot((y + v[1] + f64(s, p + 48)) & M64, 42) * k1) & M64;
    x ^= w[1];
    y = (y + v[0] + f64(s, p + 40)) & M64;
    z = (rot((z + w[0]) & M64, 33) * k1) & M64;
    v = wh32s(s, p, (v[1] * k1) & M64, (x + w[0]) & M64);
    w = wh32s(s, p + 32, (z + w[1]) & M64, (y + f64(s, p + 16)) & M64);
    const t = z;
    z = x;
    x = t;
    p += 64;
    len -= 64;
  } while (len !== 0);
  return hl16((hl16(v[0], w[0]) + smix(y) * k1 + z) & M64, (hl16(v[1], w[1]) + x) & M64);
}

/** Seed(string): CityHash64WithSeed(str, 0). */
export function seedFromString(bytes: string): bigint {
  const s = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) s[i] = bytes.charCodeAt(i) & 0xff;
  return hl16((cityHash64(s) - k2) & M64, 0n);
}
