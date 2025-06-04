import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { CACHE_BLUEPRINTS, CACHE_TABS } from "~constants/common";
import { TabStoreState } from "~types/store";
import { TabCreateAction, TabDeleteAction, TabUpdateAction } from "~types/store/actions/tab";

const tabSlice = createSlice({
    initialState: LocalState.get<TabStoreState>(CACHE_TABS, {
        fallback: { entities: {} },
    }),
    name: "tab",
    reducers: {
        create(state, action: TabCreateAction) {
            state.entities[action.payload.identity] = action.payload.entity;

            LocalState.set(CACHE_BLUEPRINTS, state);
        },
        update(state, action: TabUpdateAction) {
            state.entities[action.payload.identity] = action.payload.entity;

            LocalState.set(CACHE_BLUEPRINTS, state);
        },
        delete(state, action: TabDeleteAction) {
            delete state.entities[action.payload.identity];

            LocalState.set(CACHE_BLUEPRINTS, state);
        },
        clear() {
            LocalState.set(CACHE_BLUEPRINTS, { entities: {} });

            return { entities: {} };
        },
    },
});

export const {
    create: createTab,
    update: updateTab,
    delete: deleteTab,
    clear: clearTabs,
} = tabSlice.actions;
export default tabSlice.reducer;
