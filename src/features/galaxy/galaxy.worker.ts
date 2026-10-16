/// <reference lib="webworker" />
// Runs the game's generation scripts for blocks of rows.
import * as Comlink from 'comlink';
import { GalaxyGenerator, type SectorInfo, SectorKind } from '@/engine/galaxy/generator';
import { db } from '@/game/database';
import meta from '@/generated/galaxy-meta.json';
import {
  type BossSector,
  type Faction,
  FLAG_ANCIENT_GATES,
  FLAG_CENTRAL,
  FLAG_GATES,
  FLAG_HOME,
  type GalaxyBlock,
  MIN,
  packAsteroids,
  SIZE,
  type StationSector,
  sectorIndex,
} from './model';

let generator: GalaxyGenerator | undefined;
const templateIndex = new Map(db.templates.map((t, i) => [t.id, i + 1]));

export interface GenerateSettings {
  seed: string;
  mapFactions: number;
  rifts: number;
  barrier: boolean;
}

const api = {
  async init(settings: GenerateSettings): Promise<void> {
    const { modules } = await import('@/generated/galaxy-scripts.js');
    generator = new GalaxyGenerator({ settings, modules, stubs: meta.stubs, worldBosses: db.worldBosses.length });
  },

  factions(): Faction[] {
    return generator!.factions();
  },

  block(y0: number, y1: number): GalaxyBlock {
    const gen = generator!;
    const rows = y1 - y0 + 1;
    const flags = new Uint8Array(rows * SIZE);
    const template = new Uint8Array(rows * SIZE);
    const faction = new Int32Array(rows * SIZE);
    const asteroids = new Uint8Array(rows * SIZE);
    const stations: StationSector[] = [];
    const bosses: BossSector[] = [];
    for (let y = y0; y <= y1; y++) {
      for (let x = MIN; x < MIN + SIZE; x++) {
        const s = gen.sector(x, y);
        const o = (y - y0) * SIZE + (x - MIN);
        let f = s.kind as number;
        if (s.home) f |= FLAG_HOME;
        if (s.central) f |= FLAG_CENTRAL;
        if (s.gates) f |= FLAG_GATES;
        if (s.ancientGates) f |= FLAG_ANCIENT_GATES;
        flags[o] = f;
        template[o] = s.template ? (templateIndex.get(s.template.replace(/^data\/scripts\//, '')) ?? 0) : 0;
        faction[o] = s.faction ?? 0;
        asteroids[o] = packAsteroids(s.resourceAsteroids ?? 0, s.claimableAsteroids ?? 0);
        if (s.boss) bosses.push({ i: sectorIndex(x, y), boss: s.boss });
        if (s.stations)
          stations.push({ i: sectorIndex(x, y), name: s.name, counts: s.stations, factories: s.factories ?? [], mines: s.mines ?? [] });
      }
    }
    gen.clearCaches();
    return Comlink.transfer({ y0, y1, flags, template, faction, asteroids, stations, bosses }, [
      flags.buffer,
      template.buffer,
      faction.buffer,
      asteroids.buffer,
    ]);
  },

  /** Everything about one sector, for the details panel. */
  sector(x: number, y: number): SectorInfo & { kindName: string } {
    const s = generator!.sector(x, y);
    return { ...s, kindName: SectorKind[s.kind] };
  },
};

export type GalaxyWorkerApi = typeof api;
Comlink.expose(api);
