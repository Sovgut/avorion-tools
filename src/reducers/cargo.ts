import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { CargoStoreState } from "~types/store";
import {
  CargoCreateAction,
  CargoDeleteAction,
} from "~types/store/actions/cargo";
import { getCurrentCacheKey } from "~utils/get-cache";

const cacheKey = getCurrentCacheKey('cargo');

const cargoSlice = createSlice({
  initialState: LocalState.get<CargoStoreState>(cacheKey, { fallback: { entities: {} as CargoStoreState['entities'] } }),
  name: "cargo",
  reducers: {
    create(state, action: CargoCreateAction) {
      state.entities[action.payload.type] = action.payload.quantity

      LocalState.set(cacheKey, state);
    },
    delete(state, action: CargoDeleteAction) {
      delete state.entities[action.payload];

      LocalState.set(cacheKey, state);
    },
    clear() {
      LocalState.set(cacheKey, { entities: {} });

      return { entities: {} as CargoStoreState['entities'] };
    },
  },
});

export const {
  create: createCargoComponent,
  delete: deleteCargoComponent,
  clear: clearCargoComponents,
} = cargoSlice.actions;
export default cargoSlice.reducer;
