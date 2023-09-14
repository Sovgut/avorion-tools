import {TurretType} from "~constants/enums/turrets.ts";
import {ComponentType} from "~constants/enums/components.ts";

export interface TurretEntity {
    type: TurretType;
    price: number;
    quantity: number;
}

export interface ComponentEntity {
    type: ComponentType;
    quantity: number;
}