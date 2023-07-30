import {Component} from "../../constants";
import {TurretMetadata} from "./constants";
import {ReactNode} from "react";
import {TTurret} from "../../types";

export type TTurretMetadata = {
    [type in TTurret]: {
        version: string;
        icon: string;
        components: Component[]
    }
}

export interface ITurretState {
    type: keyof typeof TurretMetadata;
    key: string;
    quantity: number;
    price: number;
    icon: string;
    version: string;
}

export interface ITurretContext {
    container: ITurretState[];
    selected: keyof typeof TurretMetadata;

    remove(key: string): void;

    add(): void;

    update(key: string, attribute: "quantity" | "price", value: number): void;

    select(type: TTurret): void;
}

export interface ITurretContextProvider {
    children: ReactNode;
}