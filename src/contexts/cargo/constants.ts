import {InitialCargoContext} from "./types";

export const INITIAL_CARGO_CONTEXT_STATE: InitialCargoContext = {
    records: [],

    add: () => undefined,
    remove: () => undefined,
    byType: () => [],
    unite: () => [],
    estimation: () => 0,
}