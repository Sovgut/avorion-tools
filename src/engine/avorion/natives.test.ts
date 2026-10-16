// Native primitives against values dumped from AvorionServer 2.5.13 (test/fixtures/natives.tsv).
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { makeFastHash, sectorSeed, seedFromString } from './hashes';
import { QuadTree } from './quadtree';
import { Random, Seed } from './natives';

const rows = fs
  .readFileSync(new URL('../../../test/fixtures/natives.tsv', import.meta.url), 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((l) => l.split('\t'));
const byKind = (k: string) => rows.filter((r) => r[0] === k);

describe('makeFastHash', () => {
  it('matches every dumped triple', () => {
    const cases = byKind('hash').filter((r) => !r[4].startsWith('<'));
    expect(cases.length).toBeGreaterThan(2600);
    for (const [, a, b, c, want] of cases) expect(makeFastHash(+a, +b, +c)).toBe(+want);
  });
});

describe('Seed', () => {
  it('hashes strings with CityHash64WithSeed', () => {
    for (const [, s, want, int32] of byKind('seedstr')) {
      const seed = Seed.fromBig(seedFromString(s));
      expect(seed.toString()).toBe(want);
      expect(seed.int32).toBe(+int32);
    }
  });
  it('truncates numbers', () => {
    for (const [, v, want, int32] of byKind('seednum')) {
      const seed = Seed.from(+v);
      expect(seed.toString()).toBe(want);
      expect(seed.int32).toBe(+int32);
    }
  });
  it('derives sector seeds', () => {
    const game = Seed.from('testseed123');
    for (const [, x, y, want] of byKind('sectorseed')) {
      const [h, l] = sectorSeed(+x, +y, game.hi, game.lo);
      expect(new Seed(h, l).toString()).toBe(want);
    }
  });
});

describe('Random', () => {
  const seq = (kind: string, sv: string) => byKind(kind).find((r) => r[1] === sv)![2].split(',');
  const seeds = ['0', '1', 'testseed123', '42', '-5'];
  const fresh = (sv: string) => new Random(Seed.from(sv));
  it.each(seeds)('reproduces sequences for seed %s', (sv) => {
    let r = fresh(sv);
    expect(seq('rint', sv).map(Number)).toEqual(seq('rint', sv).map(() => r.getInt(0, 1000000)));
    r = fresh(sv);
    expect(seq('rintab', sv).map(Number)).toEqual(seq('rintab', sv).map(() => r.getInt(-499, 500)));
    r = fresh(sv);
    expect(seq('rint16', sv).map(Number)).toEqual(seq('rint16', sv).map(() => r.getInt(1, 6)));
    r = fresh(sv);
    expect(seq('rintrev', sv).map(Number)).toEqual(seq('rintrev', sv).map(() => r.getInt(10, 1)));
    r = fresh(sv);
    expect(seq('rfloat0', sv).map(Number)).toEqual(seq('rfloat0', sv).map(() => r.getFloat()));
    r = fresh(sv);
    expect(seq('rfloat01', sv).map(Number)).toEqual(seq('rfloat01', sv).map(() => r.getFloat(0, 1)));
    r = fresh(sv);
    expect(seq('rfloat1', sv).map(Number)).toEqual(seq('rfloat1', sv).map(() => r.getFloat(10)));
    r = fresh(sv);
    expect(seq('rfloatab', sv).map(Number)).toEqual(seq('rfloatab', sv).map(() => r.getFloat(-5, 17.5)));
    r = fresh(sv);
    expect(seq('rtest', sv)).toEqual(seq('rtest', sv).map(() => String(r.test(0.3))));
    r = fresh(sv);
    expect(seq('rbool', sv)).toEqual(seq('rbool', sv).map(() => String(r.getBool())));
    r = fresh(sv);
    expect(seq('rseed', sv)).toEqual(seq('rseed', sv).map(() => r.createSeed().toString()));
  });
});

describe('QuadTree', () => {
  it('matches nearest, nearest-with-radius and get ordering', () => {
    const t = new QuadTree(-499, -499, 500, 500, 7);
    for (const [x, y] of [[10, 0], [-10, 0], [0, 10], [0, -10], [5, 5], [-5, -5], [200, 200], [-300, 100], [7, 1], [1, 7]]) t.insert(x, y);
    const fmt = (p: [number, number] | undefined) => (p ? `${p[0]}:${p[1]}` : 'nil:nil');
    for (const [, x, y, near, nearR, got] of byKind('qt')) {
      expect(fmt(t.nearest(+x, +y))).toBe(near);
      expect(fmt(t.nearest(+x, +y, 8))).toBe(nearR);
      const g = t.get(+x, +y, 12);
      expect(g.xs.map((gx, i) => `${gx}:${g.ys[i]}`).join(',')).toBe(got ?? '');
    }
  });
});

describe('Random draw consumption', () => {
  const lines = fs
    .readFileSync(new URL('../../../test/fixtures/random-draws.tsv', import.meta.url), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split('\t'));
  const probe = (label: string, fn: (r: Random) => unknown) => {
    const row = lines.find((l) => l[0] === label)!;
    const r = new Random(Seed.from('probe'));
    const v = fn(r);
    expect([label, String(v), String(r.getInt(0, 1000000))]).toEqual(row);
  };
  it('skips the draw only for getInt(a, a)', () => {
    probe('none', () => '-');
    probe('getInt55', (r) => r.getInt(5, 5));
    probe('getInt56', (r) => r.getInt(5, 6));
    probe('getFloat22', (r) => r.getFloat(2, 2));
    probe('getFloat00', (r) => r.getFloat(0, 0));
    probe('getFloat0', (r) => r.getFloat(0));
    probe('test0', (r) => r.test(0));
    probe('test1', (r) => r.test(1));
    probe('test2', (r) => r.test(2));
    probe('testneg', (r) => r.test(-1));
    probe('getIntNeg', (r) => r.getInt(-3, -3));
    probe('getIntRev', (r) => r.getInt(7, 6));
    probe('getBool', (r) => r.getBool());
    probe('createSeed', (r) => r.createSeed().toString());
  });
  it('counts multitest successes one draw per try', () => {
    for (const p of [0.1, 0.3, 0.7]) {
      const row = lines.find((l) => l[0] === `mt${p}`)!;
      const r = new Random(Seed.from('probe2'));
      const got = Array.from({ length: 30 }, () => {
        let hits = 0;
        for (let i = 0; i < 4; i++) if (r.test(p)) hits++;
        return hits;
      });
      expect(got.join(',')).toBe(row[1]);
    }
  });
  it('interpolates getFloat(a, b) in double before rounding to float', () => {
    const row = lines.find((l) => l[0] === 'fab')!;
    const r = new Random(Seed.from('probe3'));
    expect(Array.from({ length: 20 }, () => r.getFloat(0.1, 0.7))).toEqual(row[1].split(',').map(Number));
  });
});
