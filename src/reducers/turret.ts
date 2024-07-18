import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { CACHE_TURRETS } from "~constants/common";
import { TurretStoreState } from "~types/store";
import {
  TurretCreateAction,
  TurretDeleteAction,
  TurretUpdateAction,
} from "~types/store/actions/turret";

const turretSlice = createSlice({
  initialState: LocalState.getItem<TurretStoreState>(CACHE_TURRETS, {
    fallback: { entities: {} },
  }),
  name: "turret",
  reducers: {
    create(state, action: TurretCreateAction) {
      state.entities[action.payload.identity] = action.payload.entity;
    },
    update(state, action: TurretUpdateAction) {
      state.entities[action.payload.identity] = action.payload.entity;
    },
    delete(state, action: TurretDeleteAction) {
      delete state.entities[action.payload.identity];
    },
    clear() {
      return { entities: {} };
    },
  },
});

export const {
  create: createTurret,
  update: updateTurret,
  delete: deleteTurret,
  clear: clearTurrets,
} = turretSlice.actions;
export default turretSlice.reducer;
