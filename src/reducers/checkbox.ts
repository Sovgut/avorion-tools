import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { CheckboxCommodityStoreState } from "~types/store";
import {
  CheckboxCreateAction,
  CheckboxDeleteAction,
} from "~types/store/actions/checkbox";
import { getCurrentCacheKey } from "~utils/get-cache";

const cacheKey = getCurrentCacheKey('checkbox');

const checkboxSlice = createSlice({
  initialState: LocalState.get<CheckboxCommodityStoreState>(cacheKey, { fallback: { entities: {} as CheckboxCommodityStoreState['entities'] } }),
  name: "checkbox",
  reducers: {
    create(state, action: CheckboxCreateAction) {
      state.entities[action.payload.type] = action.payload.value;
      
      LocalState.set(cacheKey, state);
    },
    delete(state, action: CheckboxDeleteAction) {
      delete state.entities[action.payload];
      
      LocalState.set(cacheKey, state);
    },
    clear() {
      LocalState.set(cacheKey, { entities: {} });

      return { entities: {} as CheckboxCommodityStoreState['entities'] };
    },
  },
});

export const {
  create: createComponentCheckbox,
  delete: deleteComponentCheckbox,
  clear: clearComponentsCheckbox,
} = checkboxSlice.actions;
export default checkboxSlice.reducer;
