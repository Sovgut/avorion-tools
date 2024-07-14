import { Turret } from "src/data/turrets/enums";
import { Commodity } from "src/data/commodities/enums";

export interface TurretEntity {
    type: Turret;
    price: number;
    quantity: number;
}

export interface CommodityEntity {
    type: Commodity;
    quantity: number;
}