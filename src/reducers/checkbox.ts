import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ComponentType} from "@/constants/enums/components";
import {CACHE_CHECKBOX} from "@/constants/common";

const persistedState = window.localStorage.getItem(CACHE_CHECKBOX);
let initialState = {} as Record<ComponentType, boolean>;

if (persistedState) {
    initialState = JSON.parse(persistedState);
}

const checkboxSlice = createSlice({
    initialState,
    name: "checkbox",
    reducers: {
        add: (state, action: PayloadAction<ComponentType>) => {
            state[action.payload] = true;
        },
        remove: (state, action: PayloadAction<ComponentType>) => {
            if (state[action.payload]) {
                delete state[action.payload];
            }
        }
    }
});

export const {add: checkboxAdd, remove: checkboxRemove} = checkboxSlice.actions;
export default checkboxSlice.reducer;