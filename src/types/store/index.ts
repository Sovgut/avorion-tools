import { Commodity } from "~data/commodities/enums.ts";
import { Identity } from "./common.ts";
import { BlueprintEntity, TabEntity, TurretEntity } from "./entity.ts";

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

export interface BlueprintStoreState {
  entities: Record<Identity, BlueprintEntity>;
}

export interface TabStoreState {
  entities: Record<Identity, TabEntity>;
}