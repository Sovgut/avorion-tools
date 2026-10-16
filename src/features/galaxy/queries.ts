// Questions the app asks a generated galaxy.
import { db, productionByIndex } from '@/game/database';
import {
  claimableAsteroids,
  FLAG_ANCIENT_GATES,
  type GalaxyData,
  KIND_OFFGRID,
  KIND_REGULAR,
  resourceAsteroids,
  SECTORS,
  type StationSector,
  sectorX,
  sectorY,
} from './model';

export interface LayerDef {
  id: string;
  /** English label (translated in the UI). */
  name: string;
  color: string;
  /** Stations, or places worth flying to. */
  group: 'stations' | 'places';
  /** Sector indices this layer marks; the plan layer is computed from the plan instead. */
  select: (g: GalaxyData) => number[];
}

/** Station layers count what regular sectors report; hidden ones count smuggler hideouts and pirate bases. */
function stations(fields: string[], hidden = false) {
  return (g: GalaxyData) =>
    g.stations
      .filter((s) => (g.flags[s.i] & 3) === (hidden ? KIND_OFFGRID : KIND_REGULAR) && fields.some((f) => (s.counts[f] ?? 0) > 0))
      .map((s) => s.i);
}

const templateIndex = new Map(db.templates.map((t, i) => [t.id, i + 1]));

function sectorsWhere(test: (i: number) => boolean): number[] {
  const out: number[] = [];
  for (let i = 0; i < SECTORS; i++) if (test(i)) out.push(i);
  return out;
}

function templates(ids: string[]) {
  const wanted = new Set(ids.map((id) => templateIndex.get(id) ?? -1));
  return (g: GalaxyData) => sectorsWhere((i) => wanted.has(g.template[i]));
}

export const PLAN_LAYER: LayerDef = { id: 'plan', name: 'Needed for plan', color: 'var(--c-accent)', group: 'stations', select: () => [] };

export const STATION_LAYERS: LayerDef[] = [
  { id: 'shipyards', name: 'Shipyards', color: 'var(--c-cyan)', group: 'stations', select: stations(['shipyards']) },
  { id: 'equipmentDocks', name: 'Equipment docks', color: 'var(--c-violet)', group: 'stations', select: stations(['equipmentDocks']) },
  { id: 'turretFactories', name: 'Turret factories', color: 'var(--c-green)', group: 'stations', select: stations(['turretFactories']) },
  {
    id: 'tradingPosts',
    name: 'Trading posts',
    color: 'var(--c-red)',
    group: 'stations',
    select: stations(['tradingPosts', 'planetaryTradingPosts']),
  },
  { id: 'repairDocks', name: 'Repair docks', color: 'oklch(0.78 0.12 250)', group: 'stations', select: stations(['repairDocks']) },
  { id: 'resourceDepots', name: 'Resource depots', color: 'oklch(0.8 0.12 110)', group: 'stations', select: stations(['resourceDepots']) },
  { id: 'scrapyards', name: 'Scrapyards', color: 'oklch(0.72 0.06 60)', group: 'stations', select: stations(['scrapyards']) },
  {
    id: 'smugglersMarkets',
    name: 'Smuggler markets',
    color: 'oklch(0.75 0.13 340)',
    group: 'stations',
    select: stations(['smugglersMarkets'], true),
  },
  { id: 'headquarters', name: 'Headquarters', color: 'oklch(0.92 0.02 75)', group: 'stations', select: stations(['headquarters']) },
];

export const PLACE_LAYERS: LayerDef[] = [
  {
    // world bosses and the asteroid shield boss
    id: 'bosses',
    name: 'Bosses',
    color: 'oklch(0.66 0.24 350)',
    group: 'places',
    select: (g) => [...g.bosses.map((b) => b.i), ...templates(['sectors/asteroidshieldboss'])(g)].sort((a, b) => a - b),
  },
  {
    id: 'resourceAsteroids',
    name: 'Rich asteroids',
    color: 'oklch(0.78 0.15 70)',
    group: 'places',
    select: (g) => sectorsWhere((i) => resourceAsteroids(g.asteroids[i]) > 0),
  },
  {
    id: 'claimableAsteroids',
    name: 'Claimable asteroids',
    color: 'oklch(0.68 0.12 45)',
    group: 'places',
    select: (g) => sectorsWhere((i) => claimableAsteroids(g.asteroids[i]) > 0),
  },
  {
    id: 'wreckage',
    name: 'Wreckage',
    color: 'oklch(0.66 0.05 230)',
    group: 'places',
    select: templates(['sectors/wreckagefield', 'sectors/stationwreckage', 'sectors/wreckageasteroidfield', 'sectors/functionalwreckage']),
  },
  {
    id: 'containers',
    name: 'Container fields',
    color: 'oklch(0.78 0.11 175)',
    group: 'places',
    select: templates(['sectors/containerfield', 'sectors/massivecontainerfield']),
  },
  {
    id: 'pirates',
    name: 'Pirates',
    color: 'oklch(0.6 0.16 30)',
    group: 'places',
    select: templates(['sectors/pirateasteroidfield', 'sectors/piratefight', 'sectors/piratestation']),
  },
  {
    id: 'xsotan',
    name: 'Xsotan',
    color: 'oklch(0.78 0.17 130)',
    group: 'places',
    select: templates(['sectors/xsotanasteroids', 'sectors/xsotantransformed', 'sectors/xsotanbreeders']),
  },
  {
    id: 'travel',
    name: 'Wormholes & ancient gates',
    color: 'oklch(0.8 0.1 280)',
    group: 'places',
    select: (g) => {
      const byTemplate = new Set(templates(['sectors/lonewormhole', 'sectors/ancientgates', 'sectors/teleporter'])(g));
      return sectorsWhere((i) => byTemplate.has(i) || (g.flags[i] & FLAG_ANCIENT_GATES) !== 0);
    },
  },
];

/** Not a set of sectors: rings where each material's asteroids stop appearing. */
export const BELTS_LAYER = { id: 'belts', name: 'Material belts', color: 'oklch(0.8 0.02 75)' };

export const ALL_LAYERS = [PLAN_LAYER, ...STATION_LAYERS, ...PLACE_LAYERS];

const layerCache = new WeakMap<GalaxyData, Map<string, number[]>>();

/** The sectors a layer marks, worked out once per galaxy. */
export function layerSectors(g: GalaxyData, layer: LayerDef): number[] {
  let cache = layerCache.get(g);
  if (!cache) {
    cache = new Map();
    layerCache.set(g, cache);
  }
  let list = cache.get(layer.id);
  if (!list) {
    list = layer.select(g);
    cache.set(layer.id, list);
  }
  return list;
}

/** The materials whose asteroids can appear at a distance from the core, iron first. */
export function materialsAt(distance: number): string[] {
  return db.materials.filter((m) => distance >= m.min && distance <= m.max).map((m) => m.name);
}

/** The world boss in a sector, as the game's title string, or undefined. */
export function bossAt(g: GalaxyData, i: number): string | undefined {
  const b = g.bosses.find((x) => x.i === i);
  return b ? db.worldBosses[b.boss - 1]?.name : undefined;
}

/** CSS color variables resolved for canvas drawing. */
export function resolveColor(css: string): string {
  const m = /^var\((--[\w-]+)\)$/.exec(css);
  if (!m) return css;
  return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || '#888';
}

interface Index {
  /** Sectors (as station list positions) producing each good. */
  producers: Map<string, number[]>;
}

const indexes = new WeakMap<GalaxyData, Index>();

function index(g: GalaxyData): Index {
  let idx = indexes.get(g);
  if (idx) return idx;
  const producers = new Map<string, number[]>();
  g.stations.forEach((s, pos) => {
    const seen = new Set<string>();
    for (const pi of [...s.factories, ...s.mines]) {
      const p = productionByIndex.get(pi);
      if (!p) continue;
      for (const r of p.results) {
        if (seen.has(r.good)) continue;
        seen.add(r.good);
        const list = producers.get(r.good) ?? [];
        list.push(pos);
        producers.set(r.good, list);
      }
    }
  });
  idx = { producers };
  indexes.set(g, idx);
  return idx;
}

export function producingSectors(g: GalaxyData, good: string): StationSector[] {
  return (index(g).producers.get(good) ?? []).map((pos) => g.stations[pos]);
}

export interface NearbyStation {
  sector: StationSector;
  x: number;
  y: number;
  distance: number;
  /** Production indices in that sector that make the good. */
  productions: number[];
}

/** Producers of a good closest to a position (Euclidean distance in sectors). */
export function nearestProducers(g: GalaxyData, good: string, from: { x: number; y: number }, n: number): NearbyStation[] {
  const list = producingSectors(g, good).map((s) => {
    const x = sectorX(s.i);
    const y = sectorY(s.i);
    return {
      sector: s,
      x,
      y,
      distance: Math.hypot(x - from.x, y - from.y),
      productions: [...s.factories, ...s.mines].filter((pi) => productionByIndex.get(pi)?.results.some((r) => r.good === good)),
    };
  });
  list.sort((a, b) => a.distance - b.distance);
  return list.slice(0, n);
}

export function stationSectorAt(g: GalaxyData, i: number): StationSector | undefined {
  let lo = 0;
  let hi = g.stations.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = g.stations[mid].i;
    if (v === i) return g.stations[mid];
    if (v < i) lo = mid + 1;
    else hi = mid - 1;
  }
  return undefined;
}
