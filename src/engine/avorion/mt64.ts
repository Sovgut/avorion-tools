// std::mt19937_64 on 32-bit halves. The game's Random class is a thin wrapper around it.
import { mul64 } from './int64';

const N = 312;
const M = 156;
// 6364136223846793005
const F_HI = 0x5851f42d;
const F_LO = 0x4c957f2d;
// 0xB5026F5AA96619E9
const A_HI = 0xb5026f5a;
const A_LO = 0xa96619e9;

export class MT19937_64 {
  private readonly hi = new Uint32Array(N);
  private readonly lo = new Uint32Array(N);
  private idx = N;
  /** High half of the most recent output. */
  outHi = 0;

  constructor(seedHi: number, seedLo: number) {
    const hi = this.hi;
    const lo = this.lo;
    hi[0] = seedHi;
    lo[0] = seedLo;
    for (let i = 1; i < N; i++) {
      const ph = hi[i - 1];
      const pl = lo[i - 1];
      // x = prev ^ (prev >> 62)
      const xl = (pl ^ (ph >>> 30)) >>> 0;
      const [mh, ml] = mul64(F_HI, F_LO, ph, xl);
      const sum = ml + i;
      lo[i] = sum >>> 0;
      hi[i] = (mh + (sum > 0xffffffff ? 1 : 0)) >>> 0;
    }
  }

  private twist(): void {
    const hi = this.hi;
    const lo = this.lo;
    for (let i = 0; i < N; i++) {
      const j = i + 1 === N ? 0 : i + 1;
      const k = i + M < N ? i + M : i + M - N;
      const yh = hi[i];
      const yl = ((lo[i] & 0x80000000) | (lo[j] & 0x7fffffff)) >>> 0;
      let nh = (hi[k] ^ (yh >>> 1)) >>> 0;
      let nl = (lo[k] ^ ((yl >>> 1) | (yh << 31))) >>> 0;
      if (yl & 1) {
        nh = (nh ^ A_HI) >>> 0;
        nl = (nl ^ A_LO) >>> 0;
      }
      hi[i] = nh;
      lo[i] = nl;
    }
    this.idx = 0;
  }

  /** Next output; returns the low 32 bits and stores the high half in `outHi`. */
  next(): number {
    if (this.idx >= N) this.twist();
    let yh = this.hi[this.idx];
    let yl = this.lo[this.idx];
    this.idx++;
    // y ^= (y >> 29) & 0x5555555555555555
    let sl = ((yl >>> 29) | (yh << 3)) & 0x55555555;
    let sh = (yh >>> 29) & 0x55555555;
    yl = (yl ^ sl) >>> 0;
    yh = (yh ^ sh) >>> 0;
    // y ^= (y << 17) & 0x71D67FFFEDA60000
    sh = ((yh << 17) | (yl >>> 15)) & 0x71d67fff;
    sl = (yl << 17) & 0xeda60000;
    yh = (yh ^ sh) >>> 0;
    yl = (yl ^ sl) >>> 0;
    // y ^= (y << 37) & 0xFFF7EEE000000000
    yh = (yh ^ ((yl << 5) & 0xfff7eee0)) >>> 0;
    // y ^= y >> 43
    yl = (yl ^ (yh >>> 11)) >>> 0;
    this.outHi = yh;
    return yl;
  }
}
