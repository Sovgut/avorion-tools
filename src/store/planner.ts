import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RarityId } from '@/game/database';

export const MAX_TABS = 10;
export const MAX_QUANTITY = 999_999;
export const MAX_PRICE = 9_999_999_999;
export const MAX_COUNT = 9_999_999;
export const SECTOR_MIN = -499;
export const SECTOR_MAX = 500;

export interface Tab {
  id: string;
  name: string;
}

export interface PlannedTurret {
  id: string;
  tabId: string;
  /** Turret type id (WeaponType key, e.g. "ChainGun"). */
  type: string;
  qty: number;
  /** Price of one turret bought outright, in credits. */
  price: number;
  x: number;
  y: number;
  enabled: boolean;
  /** Component counts from the in-game turret factory, per good id. */
  counts: Record<string, number>;
}

export interface Blueprint {
  id: string;
  type: string;
  name: string;
  rarity: RarityId;
  counts: Record<string, number>;
  /** Turret price and the sector it is built in; absent on blueprints that never had them. */
  price?: number;
  x?: number;
  y?: number;
}

export interface PlannerState {
  tabs: Tab[];
  currentTabId: string | null;
  turrets: PlannedTurret[];
  /** Cargo already in the hold, per good id; it is taken off what is left to buy. */
  cargo: Record<string, number>;
  /** Goods marked as bought in the game: nothing more is to buy for them. */
  bought: Record<string, true>;
  blueprints: Blueprint[];
  seq: number;
}

export const initialPlanner: PlannerState = { tabs: [], currentTabId: null, turrets: [], cargo: {}, bought: {}, blueprints: [], seq: 1 };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.trunc(Number.isFinite(v) ? v : 0)));

function newTurret(state: PlannerState, tabId: string, type: string, components: string[]): PlannedTurret {
  return {
    id: `t${state.seq++}`,
    tabId,
    type,
    qty: 1,
    price: 0,
    x: 0,
    y: 0,
    enabled: true,
    counts: Object.fromEntries(components.map((c) => [c, 0])),
  };
}

const slice = createSlice({
  name: 'planner',
  initialState: initialPlanner,
  reducers: {
    /** Creates a tab with its first turret and makes it current. */
    createTab(state, a: PayloadAction<{ name: string; type: string; components: string[] }>) {
      if (state.tabs.length >= MAX_TABS) return;
      const tab = { id: `tab${state.seq++}`, name: a.payload.name.trim().slice(0, 60) };
      state.tabs.push(tab);
      state.currentTabId = tab.id;
      state.turrets.push(newTurret(state, tab.id, a.payload.type, a.payload.components));
    },
    selectTab(state, a: PayloadAction<string>) {
      if (state.tabs.some((t) => t.id === a.payload)) state.currentTabId = a.payload;
    },
    renameTab(state, a: PayloadAction<{ id: string; name: string }>) {
      const tab = state.tabs.find((t) => t.id === a.payload.id);
      if (tab && a.payload.name.trim()) tab.name = a.payload.name.trim().slice(0, 60);
    },
    removeTab(state, a: PayloadAction<string>) {
      state.tabs = state.tabs.filter((t) => t.id !== a.payload);
      state.turrets = state.turrets.filter((t) => t.tabId !== a.payload);
      if (state.currentTabId === a.payload) state.currentTabId = state.tabs[0]?.id ?? null;
    },
    addTurret(state, a: PayloadAction<{ type: string; components: string[] }>) {
      if (!state.currentTabId) return;
      state.turrets.push(newTurret(state, state.currentTabId, a.payload.type, a.payload.components));
    },
    removeTurret(state, a: PayloadAction<string>) {
      state.turrets = state.turrets.filter((t) => t.id !== a.payload);
    },
    updateTurret(state, a: PayloadAction<{ id: string; qty?: number; price?: number; x?: number; y?: number; enabled?: boolean }>) {
      const t = state.turrets.find((x) => x.id === a.payload.id);
      if (!t) return;
      const p = a.payload;
      if (p.qty !== undefined) t.qty = clamp(p.qty, 1, MAX_QUANTITY);
      if (p.price !== undefined) t.price = clamp(p.price, 0, MAX_PRICE);
      if (p.x !== undefined) t.x = clamp(p.x, SECTOR_MIN, SECTOR_MAX);
      if (p.y !== undefined) t.y = clamp(p.y, SECTOR_MIN, SECTOR_MAX);
      if (p.enabled !== undefined) t.enabled = p.enabled;
    },
    setCount(state, a: PayloadAction<{ id: string; good: string; count: number }>) {
      const t = state.turrets.find((x) => x.id === a.payload.id);
      if (t) t.counts[a.payload.good] = clamp(a.payload.count, 0, MAX_COUNT);
    },
    setCounts(state, a: PayloadAction<{ id: string; counts: Record<string, number> }>) {
      const t = state.turrets.find((x) => x.id === a.payload.id);
      if (!t) return;
      for (const good of Object.keys(t.counts)) t.counts[good] = clamp(a.payload.counts[good] ?? 0, 0, MAX_COUNT);
    },
    setCargo(state, a: PayloadAction<{ good: string; count: number }>) {
      const v = clamp(a.payload.count, 0, MAX_COUNT);
      if (v === 0) delete state.cargo[a.payload.good];
      else state.cargo[a.payload.good] = v;
    },
    setBought(state, a: PayloadAction<{ good: string; bought: boolean }>) {
      if (a.payload.bought) state.bought[a.payload.good] = true;
      else delete state.bought[a.payload.good];
    },
    /** Empties the hold and clears every "bought" mark. */
    clearCargo(state) {
      state.cargo = {};
      state.bought = {};
    },
    saveBlueprint(state, a: PayloadAction<Omit<Blueprint, 'id'>>) {
      state.blueprints.push({ ...a.payload, id: `bp${state.seq++}`, name: a.payload.name.trim().slice(0, 60) });
    },
    /** Copies a blueprint's counts, and its price and sector when it has them, onto a turret. */
    applyBlueprint(state, a: PayloadAction<{ turretId: string; blueprintId: string }>) {
      const t = state.turrets.find((x) => x.id === a.payload.turretId);
      const b = state.blueprints.find((x) => x.id === a.payload.blueprintId);
      if (!t || !b) return;
      for (const good of Object.keys(t.counts)) t.counts[good] = clamp(b.counts[good] ?? 0, 0, MAX_COUNT);
      if (b.price !== undefined) t.price = clamp(b.price, 0, MAX_PRICE);
      if (b.x !== undefined && b.y !== undefined) {
        t.x = clamp(b.x, SECTOR_MIN, SECTOR_MAX);
        t.y = clamp(b.y, SECTOR_MIN, SECTOR_MAX);
      }
    },
    removeBlueprint(state, a: PayloadAction<string>) {
      state.blueprints = state.blueprints.filter((b) => b.id !== a.payload);
    },
  },
});

export const plannerActions = slice.actions;
export const plannerReducer = slice.reducer;
