import {createContext, ReactNode, useContext} from "react";
import {ComponentContext} from "../component";
import {TurretContext} from "../turret";
import {CargoContext} from "../cargo";
import {ComponentInfo} from "../../constants";

type EstimationOutput = {
    min: number;
    max: number;
    avg: number;
    volume: number;
}

type InitialCalculatorContext = {
    estimation(attribute: "price" | "volume"): EstimationOutput;
    quantity(): number;
};
type InitialCalculatorContextProps = {
    children: ReactNode;
}

const MAX_PRICE_PERCENTAGE = 3.00;
const INITIAL_CALCULATOR_CONTEXT_STATE: InitialCalculatorContext = {
    estimation: () => ({min: 0, max: 0, avg: 0, volume: 0}),
    quantity: () => 0,
}

export const CalculatorContext = createContext<InitialCalculatorContext>(INITIAL_CALCULATOR_CONTEXT_STATE)

export function CalculatorContextProvider(props: InitialCalculatorContextProps) {
    const turretContext = useContext(TurretContext);
    const componentContext = useContext(ComponentContext);
    const cargoContext = useContext(CargoContext);

    function estimation(attribute: "price" | "volume") {
        const unitedCargo = cargoContext.unite(cargoContext.records);

        let min = 0;
        let max = 0;
        let avg = 0;
        let volume = 0;

        for (const turret of turretContext.records) {
            const components = componentContext.turretComponents(turret.id);

            for (const component of components) {
                const cargoQuantity = unitedCargo.find(cargo => cargo.type === component.type);
                let value = 0;

                if (cargoQuantity) {
                    const quantity = (component.quantity * turret.quantity) - cargoQuantity.quantity;

                    value = ComponentInfo[component.type][attribute] * (quantity < 0 ? 0 : quantity);
                } else {
                    value = ComponentInfo[component.type][attribute] * component.quantity * turret.quantity;
                }

                if (attribute === 'price') {
                    min += value;
                    max += value + (value * MAX_PRICE_PERCENTAGE);
                    avg = (min + max) / 2;
                } else {
                    volume += value;
                }
            }
        }

        for (const turret of turretContext.records) {
            min += turret.price * turret.quantity;
            max += turret.price * turret.quantity;
            avg += turret.price * turret.quantity;
        }

        return {min, max, avg, volume};
    }

    function quantity() {
        const unitedCargo = cargoContext.unite(cargoContext.records);
        let output = 0;

        for (const turret of turretContext.records) {
            const components = componentContext.turretComponents(turret.id);

            for (const component of components) {
                const cargoQuantity = unitedCargo.find(cargo => cargo.type === component.type);

                if (cargoQuantity) {
                    const quantity = (component.quantity * turret.quantity) - cargoQuantity.quantity;

                    if (quantity > 0) {
                        output += quantity;
                    }
                } else {
                    output += component.quantity * turret.quantity;
                }
            }
        }

        return output;
    }

    return <CalculatorContext.Provider value={{estimation, quantity}}>{props.children}</CalculatorContext.Provider>
}