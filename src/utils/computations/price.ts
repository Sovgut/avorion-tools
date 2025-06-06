import { CommodityMetadata } from "~data/commodities/metadata";
import { MAX_PRICE_PERCENTAGE } from "~constants/common";
import { CargoStoreState } from "~types/store";
import { Turret } from "~models/turret";
import { Component } from "~models/component";

export const initialComputationComponents = {
  min: 0,
  max: 0,
  avg: 0,
  volume: 0,
};

export function computeComponents(
  cargoStore: CargoStoreState,
  turretStore: Turret[],
  componentStore: Component[]
) {
  const result = { ...initialComputationComponents };

  for (const turret of turretStore) {
    if (typeof turret.enabled === 'boolean' && !turret.enabled) {
      continue;
    }

    for (const component of componentStore) {
      if (component.turret_id !== turret.id) {
        continue;
      }

      const componentQuantity: number = component.quantity * turret.quantity;
      const cargoQuantity: number = cargoStore.entities[component.type] || 0;

      let priceValue = 0;
      let volumeValue = 0;

      if (cargoQuantity) {
        const quantity = componentQuantity - cargoQuantity;

        priceValue =
          CommodityMetadata[component.type].price * (quantity < 0 ? 0 : quantity);
        volumeValue =
          CommodityMetadata[component.type].volume * (quantity < 0 ? 0 : quantity);
      } else {
        priceValue =
          CommodityMetadata[component.type].price * componentQuantity;
        volumeValue =
          CommodityMetadata[component.type].volume * componentQuantity;
      }

      result.min += priceValue;
      result.max += priceValue + priceValue * MAX_PRICE_PERCENTAGE;
      result.avg = (result.min + result.max) / 2;
      result.volume += volumeValue;
    }
  }

  for (const turret of turretStore) {
    if (typeof turret.enabled === 'boolean' && !turret.enabled) {
      continue;
    }

    result.min +=
      turret.price * turret.quantity;
    result.max +=
      turret.price * turret.quantity;
    result.avg +=
      turret.price * turret.quantity;
  }

  return result;
}
