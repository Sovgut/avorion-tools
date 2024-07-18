import { configureStore } from "@reduxjs/toolkit";
import turretReducer from "~reducers/turret";
import cargoReducer from "~reducers/cargo";
import checkboxReducer from "~reducers/checkbox";
import componentReducer from "~reducers/component";
import { debounce } from "lodash";
import {
  CACHE_CARGO,
  CACHE_CHECKBOX,
  CACHE_COMPONENTS,
  CACHE_TURRETS,
} from "~constants/common.ts";
import { LocalState } from "@sovgut/state";

export const store = configureStore({
  reducer: {
    turret: turretReducer,
    cargo: cargoReducer,
    checkbox: checkboxReducer,
    component: componentReducer,
  },
});

store.subscribe(
  debounce(() => {
    const state = store.getState();

    LocalState.setItem(CACHE_TURRETS, state.turret);
    LocalState.setItem(CACHE_COMPONENTS, state.component);
    LocalState.setItem(CACHE_CARGO, state.cargo);
    LocalState.setItem(CACHE_CHECKBOX, state.checkbox);
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
