import { Commodity } from "~data/commodities/enums";
import { CommodityStoreState, TurretStoreState } from "~types/store";
import { serializeCommodity } from "~utils/serialize-commodity";

export function uniteComponents(
  turrets: TurretStoreState,
  components: CommodityStoreState
): Record<Commodity, number> {
  const result: Record<Commodity, number> = {} as Record<Commodity, number>;

  for (const id of Object.keys(components.entities)) {
    if (typeof turrets.entities[id].enabled === 'boolean' && !turrets.entities[id].enabled) {
      continue;
    }

    for (const type of Object.keys(components.entities[id])) {
      const commidity = serializeCommodity(type);
      const quantity = components.entities[id][commidity];

      if (typeof result[commidity] === "number") {
        result[commidity] += quantity * turrets.entities[id].quantity;
      } else {
        result[commidity] = quantity * turrets.entities[id].quantity;
      }
    }
  }

  return result;
}
