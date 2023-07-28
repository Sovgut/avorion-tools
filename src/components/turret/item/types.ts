import {type TurretState} from "../types";

export interface ITurretItem {
    turret: TurretState;

    onComponentChange(tKey: string, cKey: string, value: string | null): void;

    onRemoveTurret(tKey: string): void;

    onTurretQuantityChange(tKey: string, value: string | null): void;

    onTurretPriceChange(tKey: string, value: string | null): void;
}