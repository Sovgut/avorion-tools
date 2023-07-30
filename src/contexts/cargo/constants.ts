import {ICargoContext} from "./types";
import {Component} from "../../constants";

export const INITIAL_CONTEXT_STATE: ICargoContext = {
    container: {},

    update(type: Component, quantity: number) {
    },
    clear() {
    }
}