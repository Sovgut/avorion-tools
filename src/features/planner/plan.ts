// What the active tab needs: per-good demand, what is still to buy, and the price estimate.
import { useMemo } from 'react';
import { goodById } from '@/game/database';
import { useAppSelector } from '@/store';
import type { PlannedTurret, Tab } from '@/store/planner';
import { PRICE_FACTOR_DEFAULT, PRICE_FACTOR_MAX, PRICE_FACTOR_MIN } from '@/store/settings';

export interface NeedRow {
  good: string;
  need: number;
  have: number;
  /** Marked as bought: nothing is left to buy. */
  bought: boolean;
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
  /** Cargo cost at the base price. */
  cargoCost: number;
  /** Totals with the cargo at the lowest, chosen and highest price multiple. */
  min: number;
  estimate: number;
  max: number;
  priceFactor: number;
  turretSum: number;
  volume: number;
}

export function computePlan(
  tab: Tab | undefined,
  allTurrets: PlannedTurret[],
  cargo: Record<string, number>,
  bought: Record<string, true>,
  priceFactor = PRICE_FACTOR_DEFAULT,
): Plan {
  const turrets = tab ? allTurrets.filter((t) => t.tabId === tab.id) : [];
  const enabled = turrets.filter((t) => t.enabled);
  const need = new Map<string, number>();
  for (const t of enabled) {
    for (const [good, count] of Object.entries(t.counts)) if (count > 0) need.set(good, (need.get(good) ?? 0) + count * t.qty);
  }
  const rows: NeedRow[] = [...need].map(([good, n]) => {
    const have = cargo[good] ?? 0;
    const isBought = bought[good] === true;
    const buy = isBought ? 0 : Math.max(0, n - have);
    const g = goodById.get(good);
    return { good, need: n, have, bought: isBought, buy, cost: buy * (g?.price ?? 0), volume: buy * (g?.volume ?? 0) };
  });
  // bought goods sink to the bottom, the rest go by cost to buy
  rows.sort((a, b) => Number(a.bought) - Number(b.bought) || b.cost - a.cost || a.good.localeCompare(b.good));
  const cargoCost = rows.reduce((a, r) => a + r.cost, 0);
  const turretSum = enabled.reduce((a, t) => a + t.price * t.qty, 0);
  return {
    tab,
    turrets,
    enabled,
    need,
    rows,
    cargoCost,
    min: cargoCost * PRICE_FACTOR_MIN + turretSum,
    estimate: cargoCost * priceFactor + turretSum,
    max: cargoCost * PRICE_FACTOR_MAX + turretSum,
    priceFactor,
    turretSum,
    volume: rows.reduce((a, r) => a + r.volume, 0),
  };
}

export function usePlan(): Plan {
  const { tabs, currentTabId, turrets, cargo, bought } = useAppSelector((s) => s.planner);
  const priceFactor = useAppSelector((s) => s.settings.priceFactor);
  return useMemo(
    () =>
      computePlan(
        tabs.find((t) => t.id === currentTabId),
        turrets,
        cargo,
        bought,
        priceFactor,
      ),
    [tabs, currentTabId, turrets, cargo, bought, priceFactor],
  );
}
