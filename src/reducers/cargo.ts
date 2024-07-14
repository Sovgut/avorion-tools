import { createSlice } from "@reduxjs/toolkit";
import { CACHE_CARGO, MAX_COMPONENT_QUANTITY } from "~constants/common";
import { CargoStoreState } from "~types/store";
import {
  CargoCreateAction,
  CargoDeleteAction,
} from "~types/store/actions/cargo";
import { Commodity } from "src/data/commodities/enums";
import { LocalState } from "@sovgut/state";

const cargoSlice = createSlice({
  initialState: LocalState.get<CargoStoreState>(CACHE_CARGO, {
    fallback: { entities: {} as Record<Commodity, number> },
  }),
  name: "cargo",
  reducers: {
    create(state, action: CargoCreateAction) {
      if (typeof state.entities[action.payload.type] === "number") {
        if (
          state.entities[action.payload.type] + action.payload.quantity >
          MAX_COMPONENT_QUANTITY
        ) {
          state.entities[action.payload.type] = MAX_COMPONENT_QUANTITY;
        } else {
          state.entities[action.payload.type] += action.payload.quantity;
        }
      } else {
        state.entities[action.payload.type] = action.payload.quantity;
      }
    },
    delete(state, action: CargoDeleteAction) {
      delete state.entities[action.payload];
    },
    clear() {
      return { entities: {} as Record<Commodity, number> };
    },
  },
});

export const {
  create: createCargoComponent,
  delete: deleteCargoComponent,
  clear: clearCargoComponents,
} = cargoSlice.actions;
export default cargoSlice.reducer;
