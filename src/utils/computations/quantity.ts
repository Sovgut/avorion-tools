export function computeQuantity(cargoQuantity: number | undefined, componentQuantity: number): number {
    if (typeof cargoQuantity !== 'number') {
        return componentQuantity;
    }

    if (cargoQuantity === 0) {
        return componentQuantity;
    }

    if (componentQuantity - cargoQuantity < 0) {
        return 0;
    }

    return componentQuantity - cargoQuantity;
}