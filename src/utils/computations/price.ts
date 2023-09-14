import {ComponentType} from "~constants/enums/components";
import {ComponentsMeta} from "~constants/meta/components";
import {MAX_PRICE_PERCENTAGE} from "~constants/common";
import {CargoStoreState, ComponentStoreState, TurretStoreState} from "~types/store";
import {TurretEntity} from "~types/store/entity.ts";

export const initialComputationComponents = {
    min: 0,
    max: 0,
    avg: 0,
    volume: 0
};

export function computeComponents(cargoStore: CargoStoreState, turretStore: TurretStoreState, componentStore: ComponentStoreState) {
    const result = {...initialComputationComponents};

    for (const id of Object.keys(componentStore.entities)) {
        const turret: TurretEntity = turretStore.entities[id];
        const components: Record<ComponentType, number> = componentStore.entities[id];

        for (const type of Object.keys(components) as ComponentType[]) {
            const componentQuantity: number = components[type];
            const cargoQuantity: number = cargoStore.entities[type];

            let priceValue = 0;
            let volumeValue = 0;

            if (cargoQuantity) {
                const quantity = (componentQuantity * turret.quantity) - cargoQuantity;

                priceValue = ComponentsMeta[type].price * (quantity < 0 ? 0 : quantity);
                volumeValue = ComponentsMeta[type].volume * (quantity < 0 ? 0 : quantity);
            } else {
                priceValue = ComponentsMeta[type].price * componentQuantity * turret.quantity;
                volumeValue = ComponentsMeta[type].volume * componentQuantity * turret.quantity;
            }

            result.min += priceValue;
            result.max += priceValue + (priceValue * MAX_PRICE_PERCENTAGE);
            result.avg = (result.min + result.max) / 2;
            result.volume += volumeValue;
        }
    }

    for (const id of Object.keys(turretStore.entities)) {
        result.min += turretStore.entities[id].price * turretStore.entities[id].quantity;
        result.max += turretStore.entities[id].price * turretStore.entities[id].quantity;
        result.avg += turretStore.entities[id].price * turretStore.entities[id].quantity;
    }

    return result;
}