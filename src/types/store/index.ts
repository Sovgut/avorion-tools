import {Identity} from "./common.ts";
import {TurretEntity} from "./entity.ts";
import {ComponentType} from "~constants/enums/components.ts";

export interface TurretStoreState {
    entities: Record<Identity, TurretEntity>;
}

export interface ComponentStoreState {
    entities: Record<Identity, Record<ComponentType, number>>;
}

export interface CargoStoreState {
    entities: Record<ComponentType, number>;
}

export interface CheckboxComponentStoreState {
    entities: Record<ComponentType, true>;
}