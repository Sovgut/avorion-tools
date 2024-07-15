import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { MAX_PRICE_PERCENTAGE } from "~constants/common";
import {
  CargoStoreState,
  CommodityStoreState,
  TurretStoreState,
} from "~types/store";
import { TurretEntity } from "~types/store/entity.ts";
import { serializeCommodity } from "~utils/serialize-commodity";

export const initialComputationComponents = {
  min: 0,
  max: 0,
  avg: 0,
  volume: 0,
};

export function computeComponents(
  cargoStore: CargoStoreState,
  turretStore: TurretStoreState,
  componentStore: CommodityStoreState
) {
  const result = { ...initialComputationComponents };

  for (const id of Object.keys(componentStore.entities)) {
    const turret: TurretEntity = turretStore.entities[id];
    const components: Record<Commodity, number> = componentStore.entities[id];

    for (const type in components) {
      const commodity = serializeCommodity(type);
      const componentQuantity: number = components[commodity];
      const cargoQuantity: number = cargoStore.entities[commodity];

      let priceValue = 0;
      let volumeValue = 0;

      if (cargoQuantity) {
        const quantity = componentQuantity * turret.quantity - cargoQuantity;

        priceValue =
          CommodityMetadata[commodity].price * (quantity < 0 ? 0 : quantity);
        volumeValue =
          CommodityMetadata[commodity].volume * (quantity < 0 ? 0 : quantity);
      } else {
        priceValue =
          CommodityMetadata[commodity].price *
          componentQuantity *
          turret.quantity;
        volumeValue =
          CommodityMetadata[commodity].volume *
          componentQuantity *
          turret.quantity;
      }

      result.min += priceValue;
      result.max += priceValue + priceValue * MAX_PRICE_PERCENTAGE;
      result.avg = (result.min + result.max) / 2;
      result.volume += volumeValue;
    }
  }

  for (const id of Object.keys(turretStore.entities)) {
    result.min +=
      turretStore.entities[id].price * turretStore.entities[id].quantity;
    result.max +=
      turretStore.entities[id].price * turretStore.entities[id].quantity;
    result.avg +=
      turretStore.entities[id].price * turretStore.entities[id].quantity;
  }

  return result;
}
