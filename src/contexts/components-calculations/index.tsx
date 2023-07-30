import {createContext, useContext} from "react";
import {ComponentContext} from "../components";
import {CargoContext} from "../cargo";
import {Component, ComponentInfo} from "../../constants";
import {TurretContext} from "../turrets";
import {IComponentsCalculationsContext, IComponentsCalculationsContextProvider} from "./types";
import {
    INITIAL_CONTEXT_STATE,
    MAX_PRICE_MULTIPLICATION,
    MIN_PRICE,
    MIN_PRICE_MULTIPLICATION,
    MIN_QUANTITY,
    MIN_VOLUME
} from "./constants";

export const ComponentsCalculationsContext = createContext<IComponentsCalculationsContext>(INITIAL_CONTEXT_STATE);

export function ComponentsCalculationsContextProvider(props: IComponentsCalculationsContextProvider) {
    const turretContext = useContext(TurretContext);
    const componentContext = useContext(ComponentContext);
    const cargoContext = useContext(CargoContext);

    function calculateComponentQuantity(type: Component) {
        let quantity = 0;

        for (const turret of Object.keys(componentContext.container)) {
            const component = componentContext.container[turret][type];

            if (component) {
                quantity += component.quantity;
            }
        }

        const cargoComponent = cargoContext.container[type];

        if (typeof cargoComponent === 'number') {
            const result = quantity - cargoComponent;

            return result >= MIN_QUANTITY ? result : MIN_QUANTITY;
        }

        return quantity;
    }

    function isComponentQuantityModified(type: Component) {
        const cargoComponent = cargoContext.container[type];

        if (typeof cargoComponent === 'number') {
            return cargoComponent > 0;
        }

        return false;
    }

    function calculatePrice(baseMultiplication: number) {
        let price = 0;

        for (const turret of Object.keys(componentContext.container)) {
            const turretData = turretContext.container.find(t => t.key === turret);

            if (!turretData) continue;

            for (const component of Object.keys(componentContext.container[turret])) {
                const componentPrice = ComponentInfo[component as Component].price;
                const basePrice = ((componentContext.container[turret]?.[component as Component]?.quantity || 0) * componentPrice) * turretData.quantity;

                price += basePrice + basePrice * baseMultiplication;
            }

            price += turretData.price * turretData.quantity;
        }

        for (const component of Object.keys(cargoContext.container)) {
            const quantity = cargoContext.container[component as Component];

            if (typeof quantity === 'number') {
                const componentPrice = ComponentInfo[component as Component].price;
                const basePrice = quantity * componentPrice;

                price -= basePrice + basePrice * baseMultiplication;
            }
        }

        return price >= MIN_PRICE ? price : MIN_PRICE;
    }

    function calculateMinPrice() {
        return calculatePrice(MIN_PRICE_MULTIPLICATION)
    }

    function calculateMaxPrice() {
        return calculatePrice(MAX_PRICE_MULTIPLICATION);
    }

    function calculateAvgPrice() {
        const min = calculatePrice(MIN_PRICE_MULTIPLICATION)
        const max = calculatePrice(MAX_PRICE_MULTIPLICATION);

        return (min + (max - min));
    }

    function calculateVolume() {
        let volume = 0;

        for (const turret of Object.keys(componentContext.container)) {
            const turretData = turretContext.container.find(t => t.key === turret);

            if (!turretData) continue;

            for (const component of Object.keys(componentContext.container[turret])) {
                const componentVolume = ComponentInfo[component as Component].volume;

                volume += ((componentContext.container[turret]?.[component as Component]?.quantity || 0) * componentVolume) * turretData.quantity;
            }
        }

        for (const component of Object.keys(cargoContext.container)) {
            const quantity = cargoContext.container[component as Component];

            if (typeof quantity === 'number') {
                const componentVolume = ComponentInfo[component as Component].volume;

                volume -= quantity * componentVolume;
            }
        }

        return volume >= MIN_VOLUME ? volume : MIN_VOLUME;
    }

    return <ComponentsCalculationsContext.Provider value={{
        calculateComponentQuantity,
        isComponentQuantityModified,
        calculateMinPrice,
        calculateMaxPrice,
        calculateAvgPrice,
        calculateVolume
    }}>
        {props.children}
    </ComponentsCalculationsContext.Provider>
}