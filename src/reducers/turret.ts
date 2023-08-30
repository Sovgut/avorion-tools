import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {ComponentPayload, Turret, TurretPayload} from "@/types";
import {TurretType} from "@/constants/enums/turrets";
import {TurretsMeta} from "@/constants/meta/turrets";
import {ComponentType} from "@/constants/enums/components";
import {CACHE_TURRETS} from "@/constants/common";

const persistedState = window.localStorage.getItem(CACHE_TURRETS);
let initialState = {} as Record<string, Turret>;

if (persistedState) {
    initialState = JSON.parse(persistedState);
}

const turretSlice = createSlice({
    initialState,
    name: "turret",
    reducers: {
        add: (state, action: PayloadAction<TurretType>) => {
            const components: Record<ComponentType | string, number> = {};

            for (const turretComponent of TurretsMeta[action.payload].components) {
                components[turretComponent] = 0;
            }

            state[nanoid()] = {
                components: components as Record<ComponentType, number>,
                price: 0.00,
                quantity: 1,
                key: action.payload,
            };
        },
        updateTurret: (state, action: PayloadAction<TurretPayload>) => {
            if (state[action.payload.id]) {
                state[action.payload.id] = action.payload.data;
            }
        },
        updateComponent: (state, action: PayloadAction<ComponentPayload>) => {
            if (state[action.payload.turretId]) {
                state[action.payload.turretId].components[action.payload.type] = action.payload.data;
            }
        },
        remove: (state, action: PayloadAction<string>) => {
            if (state[action.payload]) {
                delete state[action.payload];
            }
        },
        reset: () => ({}),
    }
});

export const {
    add: addTurret,
    updateTurret,
    updateComponent,
    remove: removeTurret,
    reset: resetTurrets
} = turretSlice.actions;
export default turretSlice.reducer;