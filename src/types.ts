import {Component} from "./constants";

export interface ComponentState {
    type: Component;
    cKey: string;
    tKey: string;
    quantity: number;
}

export type TTurret =
    "Chaingun" |
    "Bolter" |
    "Laser" |
    "Plasma Gun" |
    "Cannon" |
    "Rocket Launcher" |
    "Railgun" |
    "Repair" |
    "Mining Laser" |
    "Raw Mining Laser" |
    "Salvaging Laser" |
    "Raw Salvaging Laser" |
    "Force Gun" |
    "Tesla Gun" |
    "Lightning Gun" |
    "Pulse Cannon" |
    "Point Defense Cannon" |
    "Point Defense Laser" |
    "Anti Fighter";