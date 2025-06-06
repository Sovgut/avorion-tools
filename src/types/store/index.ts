import { Commodity } from "~data/commodities/enums.ts";
import { Tab } from "~models/tab.ts";
import { Blueprint } from "~models/blueprint.ts";
import { Component } from "~models/component.ts";
import { Turret } from "~models/turret.ts";

export interface TurretStoreState {
  entities: Turret[];
}

export interface ComponentStoreState {
  entities: Component[];
}

export interface CargoStoreState {
  entities: Record<Commodity, number>;
}

export interface CheckboxCommodityStoreState {
  entities: Record<Commodity, boolean>;
}

export interface BlueprintStoreState {
  entities: Blueprint[];
}

export interface TabStoreState {
  entities: Tab[];
  current: Tab | null;
}