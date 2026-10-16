// Compact in-memory galaxy: one byte or int per sector plus a list of sectors with stations.

export const SIZE = 1000;
export const MIN = -499;
export const MAX = 500;
export const SECTORS = SIZE * SIZE;

/** Low two bits of `flags`. */
export const KIND_EMPTY = 0;
export const KIND_REGULAR = 1;
export const KIND_OFFGRID = 2;
export const KIND_BLOCKED = 3;
export const FLAG_HOME = 0x04;
export const FLAG_CENTRAL = 0x08;
export const FLAG_GATES = 0x10;
export const FLAG_ANCIENT_GATES = 0x20;

export const sectorIndex = (x: number, y: number) => (y - MIN) * SIZE + (x - MIN);
export const sectorX = (i: number) => (i % SIZE) + MIN;
export const sectorY = (i: number) => Math.floor(i / SIZE) + MIN;
export const inGalaxy = (x: number, y: number) => x >= MIN && x <= MAX && y >= MIN && y <= MAX;

export interface StationSector {
  /** Sector index. */
  i: number;
  name: string;
  /** Station counts by contents field (shipyards, factories, ...). */
  counts: Record<string, number>;
  /** Production indices of the factories and mines. */
  factories: number[];
  mines: number[];
}

export interface Faction {
  index: number;
  x: number;
  y: number;
}

export interface GalaxyKey {
  seed: string;
  mapFactions: number;
  rifts: number;
  barrier: boolean;
  /** Game version of the compiled scripts. */
  version: string;
}

export interface GalaxyData {
  key: GalaxyKey;
  /** Kind in the low bits and FLAG_* bits, per sector. */
  flags: Uint8Array;
  /** Index into database templates plus one; 0 for none. */
  template: Uint8Array;
  /** Map faction index, or 0 outside faction territory. */
  faction: Int32Array;
  stations: StationSector[];
  factions: Faction[];
}

export interface GalaxyBlock {
  y0: number;
  y1: number;
  flags: Uint8Array;
  template: Uint8Array;
  faction: Int32Array;
  stations: StationSector[];
}

/** Bumped whenever generated data changes shape or meaning, so cached galaxies are rebuilt. */
export const DATA_REVISION = 3;

export function cacheKey(k: GalaxyKey): string {
  return JSON.stringify([DATA_REVISION, k.version, k.seed, k.mapFactions, k.rifts, k.barrier]);
}

export function emptyGalaxy(key: GalaxyKey): GalaxyData {
  return {
    key,
    flags: new Uint8Array(SECTORS),
    template: new Uint8Array(SECTORS),
    faction: new Int32Array(SECTORS),
    stations: [],
    factions: [],
  };
}

export function mergeBlock(g: GalaxyData, b: GalaxyBlock): void {
  const offset = (b.y0 - MIN) * SIZE;
  g.flags.set(b.flags, offset);
  g.template.set(b.template, offset);
  g.faction.set(b.faction, offset);
  for (const s of b.stations) g.stations.push(s);
}
