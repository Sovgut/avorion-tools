import {ReactNode} from "react";
import {Component} from "../../constants";

export interface IComponentsCalculationsContextProvider {
    children: ReactNode;
}

export interface IComponentsCalculationsContext {
    calculateComponentQuantity(type: Component): number;

    isComponentQuantityModified(type: Component): boolean;

    calculateMinPrice(): number;

    calculateMaxPrice(): number;

    calculateAvgPrice(): number;

    calculateVolume(): number;
}