import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { Tab } from "~models/tab";
import { TabStoreState } from "~types/store";
import { TabCreateAction, TabDeleteAction, TabUpdateAction } from "~types/store/actions/tab";
import { getCurrentCacheKey } from "~utils/get-cache";

const cacheKey = getCurrentCacheKey('tabs');

const tabSlice = createSlice({
    initialState: LocalState.get<TabStoreState>(cacheKey, { 
        fallback: { entities: [], current: null as Tab | null } 
    }),
    name: "tab",
    reducers: {
        setCurrent(state, action: PayloadAction<Tab | null>) {
            state.current = action.payload;

            LocalState.set(cacheKey, state);
        },
        create(state, action: TabCreateAction) {
            state.entities.push(action.payload);
            state.current = action.payload;

            LocalState.set(cacheKey,state);
        },
        update(state, action: TabUpdateAction) {
            state.entities = state.entities.map(entity => {
                if (entity.id !== action.payload.id) {
                    return action.payload;
                }

                return action.payload;
            })

            LocalState.set(cacheKey, state);
        },
        delete(state, action: TabDeleteAction) {
            state.entities = state.entities.filter(entity => entity.id !== action.payload);

            LocalState.set(cacheKey, state);
        },
        clear() {
            LocalState.set(cacheKey, { entities: [], current: null });

            return { entities: [], current: null };
        },
    },
});

export const {
    setCurrent: setCurrentTab,
    create: createTab,
    update: updateTab,
    delete: deleteTab,
    clear: clearTabs,
} = tabSlice.actions;
export default tabSlice.reducer;
