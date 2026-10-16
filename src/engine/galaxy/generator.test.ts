// The generator against sectors dumped from AvorionServer 2.5.13 (test/fixtures/galaxy-testseed123.tsv.gz).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { describe, expect, it } from 'vitest';
import meta from '../../generated/galaxy-meta.json';
import { modules } from '../../generated/galaxy-scripts.js';
import { GalaxyGenerator, SectorKind } from './generator';

const root = path.resolve(process.cwd());

const raw = zlib.gunzipSync(fs.readFileSync(path.join(root, 'test/fixtures/galaxy-testseed123.tsv.gz'))).toString('latin1');
const header = raw.split('\n').filter((l) => l.startsWith('#'));
const fixtureVersion = /Avorion (\S+),/.exec(header[0])![1];
const rows = header[1].replace('# rows: ', '').split(',').map(Number);
const truth = new Map<string, string[]>();
for (const line of raw.split('\n')) {
  if (!line || line.startsWith('#')) continue;
  const p = line.split('\t');
  truth.set(`${p[0]}:${p[1]}`, p);
}

const KIND = { [SectorKind.Regular]: 'R', [SectorKind.Offgrid]: 'O', [SectorKind.Blocked]: 'B', [SectorKind.Empty]: '' } as const;
const IGNORED = new Set([
  'xsotan',
  'faction',
  'neighbor',
  'neighborTradingPosts',
  'seed',
  'ships',
  'stations',
  'defenders',
  'asteroidEstimation',
  'resourceAsteroids',
  'claimableAsteroids',
  'miners',
  'pirates',
]);

// The fixture describes one game version; after a game update it has to be dumped again.
describe.skipIf(meta.version !== fixtureVersion)(`galaxy generation (Avorion ${fixtureVersion})`, () => {
  const gen = new GalaxyGenerator({
    settings: { seed: 'testseed123', mapFactions: 350, rifts: 200, barrier: true },
    modules,
    stubs: meta.stubs,
  });

  it('classifies, names and seeds every sector of the sampled rows', () => {
    let mismatches = 0;
    for (const y of rows) {
      for (let x = -499; x <= 500; x++) {
        const s = gen.sector(x, y, false);
        const t = truth.get(`${x}:${y}`);
        const got =
          s.kind === SectorKind.Empty
            ? ''
            : [
                KIND[s.kind],
                String(s.faction ?? 'nil'),
                s.template,
                s.name,
                String(s.gates),
                String(s.ancientGates),
                s.generationSeed,
              ].join('|');
        const want = t ? [t[2], t[5], t[7], t[8], t[9], t[10], t[11] === 'nil' ? '' : t[11]].join('|') : '';
        if (got !== want && mismatches++ < 5) expect(got, `${x}:${y}`).toBe(want);
      }
    }
    expect(mismatches).toBe(0);
  });

  it('predicts station contents and factory productions', () => {
    const db = JSON.parse(fs.readFileSync(path.join(root, 'src/generated/database.json'), 'utf8'));
    const prodById = new Map<number, { factory: string; results: { good: string }[] }>(db.productions.map((p: any) => [p.index, p]));
    const describe = (ids: number[] | undefined) =>
      (ids ?? [])
        .map(
          (i) =>
            `${prodById.get(i)!.factory}[${prodById
              .get(i)!
              .results.map((r) => r.good)
              .join('+')}]`,
        )
        .join(';');
    let checked = 0;
    for (const t of truth.values()) {
      if (!t[12]) continue;
      const s = gen.sector(+t[0], +t[1]);
      const want = t[12]
        .split(',')
        .map((kv) => kv.split('='))
        .filter(([k, v]) => !IGNORED.has(k) && Number(v) > 0)
        .map(([k, v]) => `${k}=${v}`)
        .sort()
        .join(',');
      const got = Object.entries(s.stations ?? {})
        .map(([k, v]) => `${k}=${v}`)
        .sort()
        .join(',');
      expect(got, `${t[0]}:${t[1]} stations`).toBe(want);
      const [wantFactories, wantMines] = t[13].split('|');
      expect(describe(s.factories), `${t[0]}:${t[1]} factories`).toBe(wantFactories);
      expect(describe(s.mines), `${t[0]}:${t[1]} mines`).toBe(wantMines);
      checked++;
    }
    expect(checked).toBeGreaterThan(900);
  });
});
