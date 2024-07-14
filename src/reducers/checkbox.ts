import { createSlice } from "@reduxjs/toolkit";
import { CACHE_CHECKBOX } from "~constants/common";
import { CheckboxCommodityStoreState } from "~types/store";
import {
  CheckboxCreateAction,
  CheckboxDeleteAction,
} from "~types/store/actions/checkbox";
import { Commodity } from "src/data/commodities/enums";
import { LocalState } from "@sovgut/state";

const checkboxSlice = createSlice({
  initialState: LocalState.get<CheckboxCommodityStoreState>(CACHE_CHECKBOX, {
    fallback: { entities: {} as Record<Commodity, true> },
  }),
  name: "checkbox",
  reducers: {
    create(state, action: CheckboxCreateAction) {
      state.entities[action.payload.type] = true;
    },
    delete(state, action: CheckboxDeleteAction) {
      delete state.entities[action.payload.type];
    },
    clear() {
      return { entities: {} as Record<Commodity, true> };
    },
  },
});

export const {
  create: createComponentCheckbox,
  delete: deleteComponentCheckbox,
  clear: clearComponentsCheckbox,
} = checkboxSlice.actions;
export default checkboxSlice.reducer;
