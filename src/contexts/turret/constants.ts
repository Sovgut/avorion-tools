import {InitialTurretContext} from "./types";

export const DEFAULT_TURRET_QUANTITY = 1;
export const DEFAULT_TURRET_PRICE = 0;

export const DEFAULT_TURRET_CONTEXT_STATE: InitialTurretContext = {
    records: [],

    add: () => undefined,
    remove: () => undefined,
    clear: () => undefined,
    update: () => undefined
}