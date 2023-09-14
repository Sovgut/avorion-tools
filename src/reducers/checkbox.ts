import {createSlice} from "@reduxjs/toolkit";
import {CACHE_CHECKBOX} from "~constants/common";
import {CheckboxComponentStoreState} from "~types/store";
import {persistedState} from "~utils/persisted-state.ts";
import {CheckboxCreateAction, CheckboxDeleteAction} from "~types/store/actions/checkbox";
import {ComponentType} from "~constants/enums/components.ts";

const checkboxSlice = createSlice({
    initialState: persistedState<CheckboxComponentStoreState>(CACHE_CHECKBOX, {entities: {} as Record<ComponentType, true>}),
    name: "checkbox",
    reducers: {
        create(state, action: CheckboxCreateAction) {
            state.entities[action.payload.type] = true;
        },
        delete(state, action: CheckboxDeleteAction) {
            delete state.entities[action.payload.type];
        },
        clear() {
            return {entities: {} as Record<ComponentType, true>}
        }
    }
});

export const {
    create: createComponentCheckbox,
    delete: deleteComponentCheckbox,
    clear: clearComponentsCheckbox
} = checkboxSlice.actions;
export default checkboxSlice.reducer;