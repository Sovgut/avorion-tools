import { configureStore } from "@reduxjs/toolkit";
import turretReducer from "~reducers/turret";
import cargoReducer from "~reducers/cargo";
import checkboxReducer from "~reducers/checkbox";
import componentReducer from "~reducers/component";
import blueprintReducer from "~reducers/blueprint";
import tabReducer from "~reducers/tab";
import { debounce } from "lodash";
import {
  CACHE_CARGO,
  CACHE_CHECKBOX,
  CACHE_COMPONENTS,
  CACHE_TURRETS,
} from "~constants/common.ts";
import { LocalState } from "@sovgut/state";

const DEBOUNCE_TIME = 10_000;

export const store = configureStore({
  reducer: {
    turret: turretReducer,
    cargo: cargoReducer,
    checkbox: checkboxReducer,
    component: componentReducer,
    blueprint: blueprintReducer,
    tab: tabReducer,
  },
});

store.subscribe(
  debounce(() => {
    const state = store.getState();

    LocalState.set(CACHE_TURRETS, state.turret);
    LocalState.set(CACHE_COMPONENTS, state.component);
    LocalState.set(CACHE_CARGO, state.cargo);
    LocalState.set(CACHE_CHECKBOX, state.checkbox);
  }, DEBOUNCE_TIME)
);

export type RootState = ReturnType<typeof store.getState>;
