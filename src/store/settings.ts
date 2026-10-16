import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Lang = 'en' | 'ru';

export interface GalaxyParams {
  /** The server seed string as `/seed` prints it. */
  seed: string;
  mapFactions: number;
  rifts: number;
  barrier: boolean;
}

export interface SettingsState {
  lang: Lang;
  galaxy: GalaxyParams | null;
  /** Visible map layers. */
  layers: string[];
  /** Where the player is, set on the map; null falls back to the current tab's turret sector. */
  position: { x: number; y: number } | null;
}

export const DEFAULT_GALAXY = { mapFactions: 350, rifts: 200, barrier: true };

export const initialSettings: SettingsState = {
  lang: typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en',
  galaxy: null,
  layers: ['plan', 'turretFactories'],
  position: null,
};

const slice = createSlice({
  name: 'settings',
  initialState: initialSettings,
  reducers: {
    setLang(state, a: PayloadAction<Lang>) {
      state.lang = a.payload;
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
    toggleLayer(state, a: PayloadAction<string>) {
      state.layers = state.layers.includes(a.payload) ? state.layers.filter((l) => l !== a.payload) : [...state.layers, a.payload];
    },
  },
});

export const settingsActions = slice.actions;
export const settingsReducer = slice.reducer;
