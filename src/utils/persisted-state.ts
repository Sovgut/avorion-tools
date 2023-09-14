import {CargoStoreState, CheckboxComponentStoreState, ComponentStoreState, TurretStoreState} from "~types/store";

export function persistedState<Result = unknown>(key: string, initial: Result): Result {
    const persistedState = window.localStorage.getItem(key);

    if (persistedState) {
        return JSON.parse(persistedState) as Result;
    }

    return initial as Result;
}

export function persistState(key: string, state: TurretStoreState | ComponentStoreState | CheckboxComponentStoreState | CargoStoreState): void {
    const string = JSON.stringify(state);

    window.localStorage.setItem(key, string);
}