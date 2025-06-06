import { createSlice } from "@reduxjs/toolkit";
import { LocalState } from "@sovgut/state";
import { BlueprintStoreState } from "~types/store";
import { BlueprintCreateAction, BlueprintDeleteAction, BlueprintUpdateAction } from "~types/store/actions/blueprint";
import { getCurrentCacheKey } from "~utils/get-cache";

const cacheKey = getCurrentCacheKey('blueprints');

const blueprintSlice = createSlice({
  initialState: LocalState.get<BlueprintStoreState>(cacheKey, { fallback: { entities: [] } }),
  name: "blueprint",
  reducers: {
    create(state, action: BlueprintCreateAction) {
      state.entities.push(action.payload);

      LocalState.set(cacheKey, state);
    },
    update(state, action: BlueprintUpdateAction) {
      state.entities = state.entities.map(entity => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        return action.payload;
      });

      LocalState.set(cacheKey, state);
    },
    delete(state, action: BlueprintDeleteAction) {
      state.entities = state.entities.filter(entity => entity.id !== action.payload);

      LocalState.set(cacheKey, state);
    },
    clear() {
      LocalState.set(cacheKey, {
        entities: [],
      });

      return { entities: [] };
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
