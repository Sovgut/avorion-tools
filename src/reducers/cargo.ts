import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Component} from "@/types";
import {ComponentType} from "@/constants/enums/components";
import {CACHE_CARGO} from "@/constants/common";

const persistedState = window.localStorage.getItem(CACHE_CARGO);
let initialState = {} as Record<ComponentType, number>;

if (persistedState) {
    initialState = JSON.parse(persistedState);
}

const cargoSlice = createSlice({
    initialState,
    name: "cargo",
    reducers: {
        add: (state, action: PayloadAction<Component>) => {
            if (state[action.payload.key]) {
                state[action.payload.key] += action.payload.quantity;
            } else {
                state[action.payload.key] = action.payload.quantity;
            }
        },
        remove: (state, action: PayloadAction<ComponentType>) => {
            if (state[action.payload]) {
                delete state[action.payload];
            }
        },
    }
});

export const {
    add: cargoComponentAdd,
    remove: cargoComponentRemove,
} = cargoSlice.actions;
export default cargoSlice.reducer;