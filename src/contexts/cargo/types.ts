import {Component} from "../../constants";
import {ReactNode} from "react";

export type ICargoState = Record<Component, number>

export interface ICargoContextProvider {
    children: ReactNode;
}

export interface ICargoContext {
    container: Partial<ICargoState>;

    update(type: Component, quantity: number): void;

    clear(): void;
}