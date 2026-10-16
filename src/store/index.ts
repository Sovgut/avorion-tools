import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { loadPersisted, savePersisted } from './persistence';
import { plannerReducer } from './planner';
import { settingsReducer } from './settings';
import { uiReducer } from './ui';

const reducer = combineReducers({ planner: plannerReducer, settings: settingsReducer, ui: uiReducer });

export const store = configureStore({ reducer, preloadedState: loadPersisted() });

let pending: ReturnType<typeof setTimeout> | undefined;
store.subscribe(() => {
  clearTimeout(pending);
  pending = setTimeout(() => {
    pending = undefined;
    savePersisted(store.getState());
  }, 200);
});
// a change made right before the tab closes would otherwise be lost in the debounce
window.addEventListener('pagehide', () => {
  if (pending === undefined) return;
  clearTimeout(pending);
  pending = undefined;
  savePersisted(store.getState());
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
