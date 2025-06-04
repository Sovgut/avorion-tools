import { Turret } from "~data/turrets/enums";
import { Commodity } from "~data/commodities/enums";
import { Rarity } from "~data/common";

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

export interface BlueprintEntity {
    id: string;
    name: string;
    rarity: Rarity;
    reference: TurretEntity;
    components: CommodityEntity[];
}

export interface TabEntity {
    id: string;
    name: string;
    turretsRefs: string[];
}