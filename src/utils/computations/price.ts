import {ComponentType} from "~constants/enums/components";
import {ComponentsMeta} from "~constants/meta/components";
import {MAX_PRICE_PERCENTAGE} from "~constants/common";
import {CargoStoreState, ComponentStoreState, TurretStoreState} from "~types/store";
import {TurretEntity} from "~types/store/entity.ts";

export function computeComponents(cargoStore: CargoStoreState, turretStore: TurretStoreState, componentStore: ComponentStoreState) {
    let min = 0;
    let max = 0;
    let avg = 0;
    let volume = 0;

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

            min += priceValue;
            max += priceValue + (priceValue * MAX_PRICE_PERCENTAGE);
            avg = (min + max) / 2;
            volume += volumeValue;
        }
    }

    for (const id of Object.keys(turretStore.entities)) {
        min += turretStore.entities[id].price * turretStore.entities[id].quantity;
        max += turretStore.entities[id].price * turretStore.entities[id].quantity;
        avg += turretStore.entities[id].price * turretStore.entities[id].quantity;
    }

    return {min, max, avg, volume};
}