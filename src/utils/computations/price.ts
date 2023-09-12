import {ComponentType} from "@/constants/enums/components";
import {Turret} from "@/types";
import {ComponentsMeta} from "@/constants/meta/components";
import {MAX_PRICE_PERCENTAGE} from "@/constants/common";

export function computeComponents(cargo: Record<ComponentType, number>, turrets: Record<string, Turret>) {
    let min = 0;
    let max = 0;
    let avg = 0;
    let volume = 0;

    for (const turretId of Object.keys(turrets)) {
        const turretQuantity = turrets[turretId].quantity;
        const components = turrets[turretId].components;

        for (const componentType of Object.keys(components)) {
            const componentQuantity = components[componentType as ComponentType];
            const cargoQuantity = cargo[componentType as ComponentType];
            let priceValue = 0;
            let volumeValue = 0;

            if (cargoQuantity) {
                const quantity = (componentQuantity * turretQuantity) - cargoQuantity;

                priceValue = ComponentsMeta[componentType as ComponentType].price * (quantity < 0 ? 0 : quantity);
                volumeValue = ComponentsMeta[componentType as ComponentType].volume * (quantity < 0 ? 0 : quantity);
            } else {
                priceValue = ComponentsMeta[componentType as ComponentType].price * componentQuantity * turretQuantity;
                volumeValue = ComponentsMeta[componentType as ComponentType].volume * componentQuantity * turretQuantity;
            }

            min += priceValue;
            max += priceValue + (priceValue * MAX_PRICE_PERCENTAGE);
            avg = (min + max) / 2;
            volume += volumeValue;
        }
    }

    for (const turretId of Object.keys(turrets)) {
        min += turrets[turretId].price * turrets[turretId].quantity;
        max += turrets[turretId].price * turrets[turretId].quantity;
        avg += turrets[turretId].price * turrets[turretId].quantity;
    }

    return {min, max, avg, volume};
}