import { createSlice } from "@reduxjs/toolkit";
import { CACHE_COMPONENTS } from "~constants/common";
import { CommodityStoreState } from "~types/store";
import {
  ComponentCreateAction,
  ComponentDeleteAction,
  ComponentUpdateAction,
} from "~types/store/actions/component";
import { Commodity } from "~data/commodities/enums";
import { LocalState } from "@sovgut/state";

const componentSlice = createSlice({
  initialState: LocalState.get<CommodityStoreState>(CACHE_COMPONENTS, {
    fallback: { entities: {} },
  }),
  name: "component",
  reducers: {
    create(state, action: ComponentCreateAction) {
      if (!state.entities[action.payload.identity]) {
        state.entities[action.payload.identity] = {} as Record<
          Commodity,
          number
        >;
      }

      state.entities[action.payload.identity][action.payload.entity.type] =
        action.payload.entity.quantity;
    },
    update(state, action: ComponentUpdateAction) {
      state.entities[action.payload.identity][action.payload.entity.type] =
        action.payload.entity.quantity;
    },
    delete(state, action: ComponentDeleteAction) {
      delete state.entities[action.payload.identity];
    },
    clear() {
      return { entities: {} };
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
