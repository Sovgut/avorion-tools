import { Commodity } from "~data/commodities/enums";
import { Component } from "~models/component";
import { Turret } from "~models/turret";

export function uniteComponents(
  turrets: Turret[],
  components: Component[]
): Record<Commodity, number> {
  const result: Record<Commodity, number> = {} as Record<Commodity, number>;

  for (const turret of turrets) {
    if (typeof turret.enabled === 'boolean' && !turret.enabled) {
      continue;
    }

    for (const component of components) {
      if (component.turret_id !== turret.id) {
        continue;
      }

      if (typeof result[component.type] === "number") {
        result[component.type] += component.quantity * turret.quantity;
      } else {
        result[component.type] = component.quantity * turret.quantity;
      }
    }
  }

  return result;
}
