import {Component, Turret} from "../../constants";

export interface ComponentState {
    type: Component;
    key: string;
    quantity: number;
}

export interface TurretState {
    type: keyof typeof Turret;
    key: string;
    quantity: number;
    price: number;
    icon: string;
    version: string;
    components: ComponentState[];
}