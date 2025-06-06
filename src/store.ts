import { configureStore } from "@reduxjs/toolkit";
import turretReducer from "~reducers/turret";
import cargoReducer from "~reducers/cargo";
import checkboxReducer from "~reducers/checkbox";
import componentReducer from "~reducers/component";
import blueprintReducer from "~reducers/blueprint";
import tabReducer from "~reducers/tab";

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

export type RootState = ReturnType<typeof store.getState>;
