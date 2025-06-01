import { Turret } from "~data/turrets/enums";
import { Commodity } from "~data/commodities/enums";

export interface TurretEntity {
    type: Turret;
    price: number;
    quantity: number;
    enabled: boolean;
    location: { x: number; y: number }
}

export interface CommodityEntity {
    type: Commodity;
    quantity: number;
}