import { createSlice } from "@reduxjs/toolkit";
import { ComponentStoreState } from "~types/store";
import {
  ComponentCreateAction,
  ComponentDeleteAction,
  ComponentUpdateAction,
} from "~types/store/actions/component";
import { getCurrentCacheKey } from "~utils/get-cache";
import { LocalState } from "@sovgut/state";

const cacheKey = getCurrentCacheKey('components');

const componentSlice = createSlice({
  initialState: LocalState.get<ComponentStoreState>(cacheKey, { 
    fallback: { entities: [] } 
  }),
  name: "component",
  reducers: {
    create(state, action: ComponentCreateAction) {
      state.entities.push(action.payload)

      LocalState.set(cacheKey, state);
    },
    update(state, action: ComponentUpdateAction) {
      state.entities = state.entities.map(entity => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        return action.payload;
      });

      LocalState.set(cacheKey, state);
    },
    delete(state, action: ComponentDeleteAction) {
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
  create: createComponent,
  update: updateComponent,
  delete: deleteComponent,
  clear: clearComponents,
} = componentSlice.actions;
export default componentSlice.reducer;
