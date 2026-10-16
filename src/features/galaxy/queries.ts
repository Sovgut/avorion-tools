// Questions the app asks a generated galaxy.
import { productionByIndex } from '@/game/database';
import { type GalaxyData, KIND_OFFGRID, KIND_REGULAR, type StationSector, sectorX, sectorY } from './model';

export interface LayerDef {
  id: string;
  /** English label (translated in the UI). */
  name: string;
  color: string;
  /** Contents fields that count as this layer. */
  fields: string[];
  /** Counts stations in hidden sectors (smuggler hideouts, pirate bases) instead of regular ones. */
  hidden?: boolean;
}

export const PLAN_LAYER: LayerDef = { id: 'plan', name: 'Needed for plan', color: 'var(--c-accent)', fields: [] };

export const STATION_LAYERS: LayerDef[] = [
  { id: 'shipyards', name: 'Shipyards', color: 'var(--c-cyan)', fields: ['shipyards'] },
  { id: 'equipmentDocks', name: 'Equipment docks', color: 'var(--c-violet)', fields: ['equipmentDocks'] },
  { id: 'turretFactories', name: 'Turret factories', color: 'var(--c-green)', fields: ['turretFactories'] },
  { id: 'tradingPosts', name: 'Trading posts', color: 'var(--c-red)', fields: ['tradingPosts', 'planetaryTradingPosts'] },
  { id: 'repairDocks', name: 'Repair docks', color: 'oklch(0.78 0.12 250)', fields: ['repairDocks'] },
  { id: 'resourceDepots', name: 'Resource depots', color: 'oklch(0.8 0.12 110)', fields: ['resourceDepots'] },
  { id: 'scrapyards', name: 'Scrapyards', color: 'oklch(0.72 0.06 60)', fields: ['scrapyards'] },
  { id: 'smugglersMarkets', name: 'Smuggler markets', color: 'oklch(0.75 0.13 340)', fields: ['smugglersMarkets'], hidden: true },
  { id: 'headquarters', name: 'Headquarters', color: 'oklch(0.92 0.02 75)', fields: ['headquarters'] },
];

export const ALL_LAYERS = [PLAN_LAYER, ...STATION_LAYERS];

/** CSS color variables resolved for canvas drawing. */
export function resolveColor(css: string): string {
  const m = /^var\((--[\w-]+)\)$/.exec(css);
  if (!m) return css;
  return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || '#888';
}

export function hasLayer(g: GalaxyData, s: StationSector, layer: LayerDef): boolean {
  const kind = g.flags[s.i] & 3;
  if (kind !== (layer.hidden ? KIND_OFFGRID : KIND_REGULAR)) return false;
  return layer.fields.some((f) => (s.counts[f] ?? 0) > 0);
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
