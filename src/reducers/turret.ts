import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { TurretStoreState } from "~types/store";
import {
  TurretCreateAction,
  TurretDeleteAction,
  TurretUpdateAction,
} from "~types/store/actions/turret";
import { getCurrentCacheKey } from "~utils/get-cache";

const cacheKey = getCurrentCacheKey('turrets');

const turretSlice = createSlice({
  initialState: LocalState.get<TurretStoreState>(cacheKey, { 
    fallback: { entities: [] } 
  }),
  name: "turret",
  reducers: {
    create(state, action: TurretCreateAction) {
      state.entities.push(action.payload)

      LocalState.set(cacheKey, state)
    },
    update(state, action: TurretUpdateAction) {
      state.entities = state.entities.map(entity => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        return action.payload;
      })

      LocalState.set(cacheKey, state)
    },
    delete(state, action: TurretDeleteAction) {
      state.entities = state.entities.filter(entity => entity.id !== action.payload);

      LocalState.set(cacheKey, state)
    },
    clear() {
      LocalState.set(cacheKey, {
        entities: [],
      })

      return { entities: [] };
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
