import {Component} from "../../constants";
import {ReactNode} from "react";

export type ComponentState = {
    id: string;
    turretId: string;
    type: Component;
    quantity: number;
}

export type InitialComponentContext = {
    records: ComponentState[];

    update(id: string, value: number): void;
    turretComponents(turretId: string): ComponentState[];
};
export type InitialComponentContextProps = {
    children: ReactNode;
}