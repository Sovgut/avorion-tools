import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {Component, ComponentPayload, Turret, TurretPayload} from "@/types";
import {TurretType} from "@/constants/enums/turrets";
import {TurretsMeta} from "@/constants/meta/turrets";

const turretsSlice = createSlice({
    name: "turrets",
    initialState: {} as Record<string, Turret>,
    reducers: {
        add: (state, action: PayloadAction<TurretType>) => {
            const components: Record<string, Component> = {};

            for (const turretComponent of TurretsMeta[action.payload].components) {
                components[nanoid()] = {
                    key: turretComponent,
                    quantity: 0,
                }
            }

            state[nanoid()] = {
                components,
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
                if (state[action.payload.turretId].components[action.payload.id]) {
                    state[action.payload.turretId].components[action.payload.id] = action.payload.data;
                }
            }
        },
        remove: (state, action: PayloadAction<string>) => {
            if (state[action.payload]) {
                delete state[action.payload];
            }
        },
        clear: (state) => state = {},
    }
});

export const {add: addTurret, updateTurret, updateComponent, remove: removeTurret, clear: clearTurrets} = turretsSlice.actions;
export default turretsSlice.reducer;