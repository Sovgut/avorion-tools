import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  /** The new-tab picker is open over existing tabs. */
  picking: boolean;
  searchOpen: boolean;
  /** Blueprint dialog for a turret. */
  blueprints: { turretId: string; mode: 'save' | 'saved' } | null;
}

const initial: UiState = { picking: false, searchOpen: false, blueprints: null };

const slice = createSlice({
  name: 'ui',
  initialState: initial,
  reducers: {
    setPicking(state, a: PayloadAction<boolean>) {
      state.picking = a.payload;
    },
    setSearchOpen(state, a: PayloadAction<boolean>) {
      state.searchOpen = a.payload;
    },
    openBlueprints(state, a: PayloadAction<{ turretId: string; mode: 'save' | 'saved' } | null>) {
      state.blueprints = a.payload;
    },
  },
});

export const uiActions = slice.actions;
export const uiReducer = slice.reducer;
