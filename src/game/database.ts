// Indexed access to the game database the analyzer extracted (src/generated/database.json).
import raw from '@/generated/database.json';
import type { ConsumerStation, GameDatabase, Good, Production, TurretType } from './schema';

export const db = raw as unknown as GameDatabase;

/** A factory type as the game names it: all productions sharing one title are its variants. */
export interface StationType {
  id: string;
  /** Title pattern, e.g. "${good} Mine ${size}". */
  pattern: string;
  /** Good the title is built from (the first result). */
  titleGood: string;
  variants: Production[];
  mine: boolean;
}

export const goods: Good[] = db.goods;
export const goodById = new Map(goods.map((g) => [g.id, g]));
export const turrets: TurretType[] = db.turrets;
export const turretById = new Map(turrets.map((t) => [t.id, t]));
export const productionByIndex = new Map(db.productions.map((p) => [p.index, p]));
export const consumers: ConsumerStation[] = db.consumers;
export const consumerById = new Map(consumers.map((c) => [c.id, c]));

/** English title without size, e.g. "Steel Factory". */
export function englishTitle(pattern: string, good: string): string {
  return pattern
    .replace('${good}', good)
    .replace('${prefix}', good)
    .replace('${plural}', goodById.get(good)?.plural ?? good)
    .replace('${size}', '')
    .trim();
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const stations: StationType[] = (() => {
  const byTitle = new Map<string, StationType>();
  for (const p of db.productions) {
    const good = p.results[0]?.good ?? '';
    const title = englishTitle(p.factory, good);
    let st = byTitle.get(title);
    if (!st) {
      st = { id: slug(title), pattern: p.factory, titleGood: good, variants: [], mine: p.mine };
      byTitle.set(title, st);
    }
    st.variants.push(p);
  }
  return [...byTitle.values()].sort((a, b) => englishTitle(a.pattern, a.titleGood).localeCompare(englishTitle(b.pattern, b.titleGood)));
})();
export const stationById = new Map(stations.map((s) => [s.id, s]));
export const stationByProduction = new Map<number, StationType>();
for (const s of stations) for (const p of s.variants) stationByProduction.set(p.index, s);

/** Stations producing a good (as any result), best variant first by founding cost. */
export const producersOf = new Map<string, StationType[]>();
/** Stations consuming a good as an ingredient. */
export const consumersOf = new Map<string, StationType[]>();
for (const s of stations) {
  for (const p of s.variants) {
    for (const r of p.results) {
      const list = producersOf.get(r.good) ?? [];
      if (!list.includes(s)) list.push(s);
      producersOf.set(r.good, list);
    }
    for (const i of p.ingredients) {
      const list = consumersOf.get(i.good) ?? [];
      if (!list.includes(s)) list.push(s);
      consumersOf.set(i.good, list);
    }
  }
}

/** Turret types whose factory recipe uses a good. */
export const turretsUsing = new Map<string, TurretType[]>();
for (const t of turrets) {
  for (const ing of t.ingredients) {
    const list = turretsUsing.get(ing.good) ?? [];
    list.push(t);
    turretsUsing.set(ing.good, list);
  }
}

/** Consumer stations (habitats, shipyards...) that buy a good. */
export const consumerStationsBuying = new Map<string, ConsumerStation[]>();
for (const c of consumers) {
  for (const g of c.goods) {
    const list = consumerStationsBuying.get(g) ?? [];
    list.push(c);
    consumerStationsBuying.set(g, list);
  }
}

export const RARITIES = [
  { id: 'petty', name: 'Petty', color: '#808080' },
  { id: 'common', name: 'Common', color: '#dfdfdf' },
  { id: 'uncommon', name: 'Uncommon', color: '#31dd31' },
  { id: 'rare', name: 'Rare', color: '#3198ff' },
  { id: 'exceptional', name: 'Exceptional', color: '#ffca42' },
  { id: 'exotic', name: 'Exotic', color: '#ff420e' },
  { id: 'legendary', name: 'Legendary', color: '#c642ff' },
] as const;

export type RarityId = (typeof RARITIES)[number]['id'];
export const rarityById = new Map(RARITIES.map((r) => [r.id as string, r]));

export function iconUrl(file: string): string {
  return `${import.meta.env.BASE_URL}game-icons/${file}`;
}

export function goodIcon(id: string): string {
  return iconUrl(goodById.get(id)?.icon ?? 'crate.png');
}

/** Icon of a station: the icon of the good its title names. */
export function stationIcon(s: StationType): string {
  return goodIcon(s.titleGood);
}

/** Profit of one production cycle at base prices: results and garbage minus ingredients. */
export function cycleProfit(p: Production): number {
  const value = (list: { good: string; amount: number }[]) => list.reduce((a, x) => a + (goodById.get(x.good)?.price ?? 0) * x.amount, 0);
  return value(p.results) + value(p.garbages) - value(p.ingredients);
}
