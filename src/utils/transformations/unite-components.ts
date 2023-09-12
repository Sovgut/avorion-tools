import {Turret} from "@/types";
import {ComponentType} from "@/constants/enums/components";
import {TurretType} from "@/constants/enums/turrets";

export function uniteComponents(turrets: Record<string, Turret>): Record<ComponentType, number> {
    const components: Record<ComponentType | string, number> = {};

    for (const turretId of Object.keys(turrets)) {
        for (const componentType of Object.keys(turrets[turretId].components)) {
            const component = turrets[turretId as TurretType].components[componentType as ComponentType];

            if (typeof components[componentType] === 'number') {
                components[componentType] += component * turrets[turretId].quantity;
            } else {
                components[componentType] = component * turrets[turretId].quantity;
            }
        }
    }

    return components;
}