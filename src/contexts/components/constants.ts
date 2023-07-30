import {IComponentContext} from "./types";

export const INITIAL_QUANTITY = 0;

export const INITIAL_CONTEXT_STATE: IComponentContext = {
    container: {},

    update(tKey, cType, quantity) {
    },
    flat() {
        return []
    }
}