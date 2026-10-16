import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { detectLang, isLang, type Lang } from '@/i18n/languages';

export type { Lang };

export interface GalaxyParams {
  /** The server seed string as `/seed` prints it. */
  seed: string;
  mapFactions: number;
  rifts: number;
  barrier: boolean;
}

/**
 * What cargo costs at stations, as a multiple of the base price. The game's bounds:
 * factories and trading posts sell at 0.9-1.32x, supply and demand move that by up to 30%,
 * relations by 0.95-2x, and the turret factory's supplier sells at 3.25x. The range covers
 * the cheapest factory in a surplus up to the supplier in a shortage; hostile relations go past it.
 */
export const PRICE_FACTOR_MIN = 0.6;
export const PRICE_FACTOR_MAX = 4.25;
export const PRICE_FACTOR_DEFAULT = 1.2;

export interface SettingsState {
  lang: Lang;
  galaxy: GalaxyParams | null;
  /** Visible map layers. */
  layers: string[];
  /** Where the player is, set on the map; null falls back to the current tab's turret sector. */
  position: { x: number; y: number } | null;
  /** Price multiple used for the cargo estimate. */
  priceFactor: number;
}

export const DEFAULT_GALAXY = { mapFactions: 350, rifts: 200, barrier: true };

export const initialSettings: SettingsState = {
  lang: typeof navigator !== 'undefined' ? detectLang(navigator.languages ?? [navigator.language]) : 'en',
  galaxy: null,
  layers: ['plan', 'turretFactories'],
  position: null,
  priceFactor: PRICE_FACTOR_DEFAULT,
};

const slice = createSlice({
  name: 'settings',
  initialState: initialSettings,
  reducers: {
    setLang(state, a: PayloadAction<Lang>) {
      if (isLang(a.payload)) state.lang = a.payload;
    },
    setGalaxy(state, a: PayloadAction<GalaxyParams>) {
      state.galaxy = a.payload;
    },
    setPosition(state, a: PayloadAction<{ x: number; y: number } | null>) {
      state.position = a.payload && {
        x: Math.max(-499, Math.min(500, Math.trunc(a.payload.x) || 0)),
        y: Math.max(-499, Math.min(500, Math.trunc(a.payload.y) || 0)),
      };
    },
    setPriceFactor(state, a: PayloadAction<number>) {
      const f = Number.isFinite(a.payload) ? a.payload : PRICE_FACTOR_DEFAULT;
      state.priceFactor = Math.round(Math.max(PRICE_FACTOR_MIN, Math.min(PRICE_FACTOR_MAX, f)) * 100) / 100;
    },
    toggleLayer(state, a: PayloadAction<string>) {
      state.layers = state.layers.includes(a.payload) ? state.layers.filter((l) => l !== a.payload) : [...state.layers, a.payload];
    },
  },
});

export const settingsActions = slice.actions;
export const settingsReducer = slice.reducer;
