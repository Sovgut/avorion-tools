import {type TurretState} from "../turret/types";

export interface ITurretHeader {
    turret: TurretState

    onRemove(tKey: string): void;
}