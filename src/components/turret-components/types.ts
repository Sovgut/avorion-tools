import {type TurretState} from "../turret/types";

export interface ITurretComponents {
    turret: TurretState;

    onComponentChange(tKey: string, cKey: string, value: string | null): void;
}