export function computeQuantity(cargoQuantity: number, componentQuantity: number): number {
    if (!cargoQuantity) return componentQuantity;

    const value = componentQuantity - cargoQuantity;
    return value > 0 ? value : 0;
}