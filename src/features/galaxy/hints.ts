// "Where to buy": the nearest producer of each good the plan still needs, from the loaded galaxy.
import { useMemo } from 'react';
import type { Plan } from '@/features/planner/plan';
import { stationByProduction } from '@/game/database';
import { useGameText } from '@/i18n';
import { useGalaxy } from './client';
import { nearestProducers } from './queries';

export interface BuyHint {
  x: number;
  y: number;
  distance: number;
  /** Translated title of the producing station. */
  station: string;
  sectorName: string;
}

export function useBuyHints(plan: Plan): Map<string, BuyHint> {
  const galaxy = useGalaxy();
  const gt = useGameText();
  return useMemo(() => {
    const out = new Map<string, BuyHint>();
    if (galaxy.state !== 'ready') return out;
    for (const r of plan.rows) {
      if (r.buy <= 0) continue;
      const [nearest] = nearestProducers(galaxy.data, r.good, plan.position, 1);
      if (!nearest) continue;
      const st = stationByProduction.get(nearest.productions[0]);
      out.set(r.good, {
        x: nearest.x,
        y: nearest.y,
        distance: nearest.distance,
        station: st ? gt.station(st) : '',
        sectorName: nearest.sector.name,
      });
    }
    return out;
  }, [galaxy, plan, gt]);
}
