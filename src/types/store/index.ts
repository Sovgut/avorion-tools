import { Commodity } from "src/data/commodities/enums.ts";
import { Identity } from "./common.ts";
import { TurretEntity } from "./entity.ts";

export interface TurretStoreState {
  entities: Record<Identity, TurretEntity>;
}

export interface CommodityStoreState {
  entities: Record<Identity, Record<Commodity, number>>;
}

export interface CargoStoreState {
  entities: Record<Commodity, number>;
}

export interface CheckboxCommodityStoreState {
  entities: Record<Commodity, true>;
}
