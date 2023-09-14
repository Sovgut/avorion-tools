import {createSlice} from "@reduxjs/toolkit";
import {CACHE_COMPONENTS} from "~constants/common";
import {persistedState} from "~utils/persisted-state.ts";
import {ComponentStoreState} from "~types/store";
import {ComponentCreateAction, ComponentDeleteAction, ComponentUpdateAction} from "~types/store/actions/component";
import {ComponentType} from "~constants/enums/components";

const componentSlice = createSlice({
    initialState: persistedState<ComponentStoreState>(CACHE_COMPONENTS, {entities: {}}),
    name: "component",
    reducers: {
        create(state, action: ComponentCreateAction) {
            if (!state.entities[action.payload.identity]) {
                state.entities[action.payload.identity] = {} as Record<ComponentType, number>;
            }

            state.entities[action.payload.identity][action.payload.entity.type] = action.payload.entity.quantity;
        },
        update(state, action: ComponentUpdateAction) {
            state.entities[action.payload.identity][action.payload.entity.type] = action.payload.entity.quantity;
        },
        delete(state, action: ComponentDeleteAction) {
            delete state.entities[action.payload.identity];
        },
        clear() {
            return {entities: {}};
        },
    },
});

export const {
    create: createComponent,
    update: updateComponent,
    delete: deleteComponent,
    clear: clearComponents,
} = componentSlice.actions;
export default componentSlice.reducer;