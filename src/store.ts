import { configureStore } from "@reduxjs/toolkit";
import turretReducer from "~reducers/turret";
import cargoReducer from "~reducers/cargo";
import checkboxReducer from "~reducers/checkbox";
import componentReducer from "~reducers/component";
import animationPageReducer from "~reducers/page-animation";
import { debounce } from "lodash";
import {
  CACHE_CARGO,
  CACHE_CHECKBOX,
  CACHE_COMPONENTS,
  CACHE_TURRETS,
} from "~constants/common.ts";
import { persistState } from "~utils/persisted-state.ts";

export const store = configureStore({
  reducer: {
    turret: turretReducer,
    cargo: cargoReducer,
    checkbox: checkboxReducer,
    component: componentReducer,
    animationPage: animationPageReducer,
  },
});

store.subscribe(
  debounce(() => {
    const state = store.getState();

    persistState(CACHE_TURRETS, state.turret);
    persistState(CACHE_COMPONENTS, state.component);
    persistState(CACHE_CARGO, state.cargo);
    persistState(CACHE_CHECKBOX, state.checkbox);
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
