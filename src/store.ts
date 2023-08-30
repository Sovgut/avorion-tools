import {configureStore} from "@reduxjs/toolkit";
import turretReducer from "@/reducers/turret";
import cargoReducer from "@/reducers/cargo";
import checkboxReducer from "@/reducers/checkbox";
import {CACHE_CARGO, CACHE_CHECKBOX, CACHE_TURRETS} from "@/constants/common";

export const store = configureStore({
    reducer: {
        turret: turretReducer,
        cargo: cargoReducer,
        checkbox: checkboxReducer,
    }
});

store.subscribe(() => {
    const state = store.getState();
    const turretStateAsJson = JSON.stringify(state.turret);
    const cargoStateAsJson = JSON.stringify(state.cargo);
    const checkboxStateAsJson = JSON.stringify(state.checkbox);

    window.localStorage.setItem(CACHE_TURRETS, turretStateAsJson);
    window.localStorage.setItem(CACHE_CARGO, cargoStateAsJson);
    window.localStorage.setItem(CACHE_CHECKBOX, checkboxStateAsJson);
})

export type RootState = ReturnType<typeof store.getState>;