import {Component} from "../../constants";
import {ReactNode} from "react";

export type CargoState = {
    type: Component;
    quantity: number;
}

export type InitialCargoContext = {
    records: CargoState[];

    add(type: Component, quantity: number): void;
    remove(type: Component): void;
    byType(type: Component): CargoState[];
    unite(list: CargoState[]): CargoState[];
    estimation(attribute: "price" | "volume"): number;
};
export type InitialCargoContextProps = {
    children: ReactNode;
}