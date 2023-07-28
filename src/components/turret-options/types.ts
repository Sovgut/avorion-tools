import {type TurretState} from "../turret/types";

export interface ITurretOptions {
    turret: TurretState;

    onQuantityChange(tKey: string, value: string | null): void;

    onPriceChange(tKey: string, value: string | null): void;
}