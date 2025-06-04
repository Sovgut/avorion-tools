import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { CACHE_BLUEPRINTS } from "~constants/common";
import { BlueprintStoreState } from "~types/store";
import { BlueprintCreateAction, BlueprintDeleteAction, BlueprintUpdateAction } from "~types/store/actions/blueprint";

const blueprintSlice = createSlice({
  initialState: LocalState.get<BlueprintStoreState>(CACHE_BLUEPRINTS, {
    fallback: { entities: {} },
  }),
  name: "blueprint",
  reducers: {
    create(state, action: BlueprintCreateAction) {
      state.entities[action.payload.identity] = action.payload.entity;

      LocalState.set(CACHE_BLUEPRINTS, state)
    },
    update(state, action: BlueprintUpdateAction) {
      state.entities[action.payload.identity] = action.payload.entity;

      LocalState.set(CACHE_BLUEPRINTS, state)
    },
    delete(state, action: BlueprintDeleteAction) {
      delete state.entities[action.payload.identity];

      LocalState.set(CACHE_BLUEPRINTS, state)
    },
    clear() {
      LocalState.set(CACHE_BLUEPRINTS, { entities: {} });

      return { entities: {} };
    },
  },
});

export const {
  create: createBlueprint,
  update: updateBlueprint,
  delete: deleteBlueprint,
  clear: clearBlueprints,
} = blueprintSlice.actions;
export default blueprintSlice.reducer;
