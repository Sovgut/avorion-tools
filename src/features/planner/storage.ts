import { useStore } from 'react-redux';
import { type RootState, useAppDispatch } from '@/store';
import { savePersisted } from '@/store/persistence';
import { plannerReducer } from '@/store/planner';

type PlannerAction = Parameters<typeof plannerReducer>[1];

/**
 * Dispatches a planner action that adds to the saved state, but only if the state with it
 * still fits in local storage. Returns false, and changes nothing, when it would not.
 */
export function useStoredDispatch() {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();
  return (action: PlannerAction): boolean => {
    const state = store.getState();
    if (savePersisted({ ...state, planner: plannerReducer(state.planner, action) }) === 'full') return false;
    dispatch(action);
    return true;
  };
}
