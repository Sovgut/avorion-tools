import {Component} from "../../constants";
import {IComponentsCalculationsContext} from "./types";

export const MIN_QUANTITY = 0;
export const MIN_PRICE = 0;
export const MIN_VOLUME = 0;
export const MIN_PRICE_MULTIPLICATION = 0.10 // %10
export const MAX_PRICE_MULTIPLICATION = 3.00 // %300

export const INITIAL_CONTEXT_STATE: IComponentsCalculationsContext = {
    calculateComponentQuantity(type: Component): number {
        return 0;
    },
    calculateAvgPrice(): number {
        return 0;
    },
    calculateMaxPrice(): number {
        return 0;
    },
    isComponentQuantityModified(type: Component): boolean {
        return false;
    },
    calculateVolume(): number {
        return 0;
    },
    calculateMinPrice(): number {
        return 0;
    }
}