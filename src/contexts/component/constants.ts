import {InitialComponentContext} from "./types";

export const DEFAULT_COMPONENT_QUANTITY = 0;
export const DEFAULT_COMPONENT_CONTEXT_STATE: InitialComponentContext = {
    records: [],

    update: () => undefined,
    turretComponents: () => [],
}