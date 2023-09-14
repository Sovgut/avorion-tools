import {ComponentType} from "~constants/enums/components";
import {ComponentStoreState, TurretStoreState} from "~types/store";

export function uniteComponents(turrets: TurretStoreState, components: ComponentStoreState): Record<ComponentType, number> {
    const result: Record<ComponentType, number> = {} as Record<ComponentType, number>;

    for (const id of Object.keys(components.entities)) {

        for (const type of Object.keys(components.entities[id]) as ComponentType[]) {
            const quantity = components.entities[id][type];

            if (typeof result[type] === 'number') {
                result[type] += quantity * turrets.entities[id].quantity;
            } else {
                result[type] = quantity * turrets.entities[id].quantity;
            }
        }
    }

    return result;
}