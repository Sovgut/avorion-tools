// What the active tab needs: per-good demand, what is still to buy, and the price estimate.
import { useMemo } from 'react';
import { goodById } from '@/game/database';
import { useAppSelector } from '@/store';
import type { PlannedTurret, Tab } from '@/store/planner';

/** Cargo bought at traders costs between its base price and this many times the base price. */
export const MAX_PRICE_FACTOR = 4;

export interface NeedRow {
  good: string;
  need: number;
  have: number;
  buy: number;
  /** Cost to buy at base price. */
  cost: number;
  volume: number;
}

export interface Plan {
  tab: Tab | undefined;
  turrets: PlannedTurret[];
  enabled: PlannedTurret[];
  need: Map<string, number>;
  rows: NeedRow[];
  /** Position used for distances: the one set on the map, else the first enabled turret's sector, else 0:0. */
  position: { x: number; y: number };
  positionSource: 'map' | 'turret' | 'default';
  min: number;
  max: number;
  avg: number;
  turretSum: number;
  volume: number;
}

export function computePlan(
  tab: Tab | undefined,
  allTurrets: PlannedTurret[],
  cargo: Record<string, number>,
  position: { x: number; y: number } | null = null,
): Plan {
  const turrets = tab ? allTurrets.filter((t) => t.tabId === tab.id) : [];
  const enabled = turrets.filter((t) => t.enabled);
  const need = new Map<string, number>();
  for (const t of enabled) {
    for (const [good, count] of Object.entries(t.counts)) if (count > 0) need.set(good, (need.get(good) ?? 0) + count * t.qty);
  }
  const rows: NeedRow[] = [...need].map(([good, n]) => {
    const have = cargo[good] ?? 0;
    const buy = Math.max(0, n - have);
    const g = goodById.get(good);
    return { good, need: n, have, buy, cost: buy * (g?.price ?? 0), volume: buy * (g?.volume ?? 0) };
  });
  rows.sort((a, b) => b.cost - a.cost || a.good.localeCompare(b.good));
  const min = rows.reduce((a, r) => a + r.cost, 0);
  const turretSum = enabled.reduce((a, t) => a + t.price * t.qty, 0);
  const me = enabled[0] ?? turrets[0];
  return {
    tab,
    turrets,
    enabled,
    need,
    rows,
    position: position ?? (me ? { x: me.x, y: me.y } : { x: 0, y: 0 }),
    positionSource: position ? 'map' : me ? 'turret' : 'default',
    min: min + turretSum,
    max: min * MAX_PRICE_FACTOR + turretSum,
    avg: (min + min * MAX_PRICE_FACTOR) / 2 + turretSum,
    turretSum,
    volume: rows.reduce((a, r) => a + r.volume, 0),
  };
}

export function usePlan(): Plan {
  const { tabs, currentTabId, turrets, cargo } = useAppSelector((s) => s.planner);
  const position = useAppSelector((s) => s.settings.position);
  return useMemo(
    () =>
      computePlan(
        tabs.find((t) => t.id === currentTabId),
        turrets,
        cargo,
        position,
      ),
    [tabs, currentTabId, turrets, cargo, position],
  );
}
