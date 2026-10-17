import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { detectLang, isLang, type Lang } from '@/i18n/languages';

export type { Lang };

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
  /** Price multiple used for the cargo estimate. */
  priceFactor: number;
}

export const initialSettings: SettingsState = {
  lang: typeof navigator !== 'undefined' ? detectLang(navigator.languages ?? [navigator.language]) : 'en',
  priceFactor: PRICE_FACTOR_DEFAULT,
};

const slice = createSlice({
  name: 'settings',
  initialState: initialSettings,
  reducers: {
    setLang(state, a: PayloadAction<Lang>) {
      if (isLang(a.payload)) state.lang = a.payload;
    },
    setPriceFactor(state, a: PayloadAction<number>) {
      const f = Number.isFinite(a.payload) ? a.payload : PRICE_FACTOR_DEFAULT;
      state.priceFactor = Math.round(Math.max(PRICE_FACTOR_MIN, Math.min(PRICE_FACTOR_MAX, f)) * 100) / 100;
    },
  },
});

export const settingsActions = slice.actions;
export const settingsReducer = slice.reducer;
