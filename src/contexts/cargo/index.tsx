import {createContext, useEffect, useState} from "react";
import {Component} from "../../constants";
import {ICargoContext, ICargoContextProvider, ICargoState} from "./types";
import {INITIAL_CONTEXT_STATE} from "./constants";

export const CargoContext = createContext<ICargoContext>(INITIAL_CONTEXT_STATE);

export function CargoContextProvider(props: ICargoContextProvider) {
    const [container, setContainer] = useState<Partial<ICargoState>>({});

    useEffect(() => {
        const cache = localStorage.getItem("cache:cargo");
        let parsed: Partial<Record<Component, number>> = {};

        if (cache) {
            parsed = JSON.parse(cache);
        }

        setContainer(() => {
            for (const component of Object.keys(Component)) {
                if (!parsed[component as Component]) {
                    parsed[component as Component] = 0;
                }
            }

            return parsed;
        });
    }, []);

    function update(type: Component, quantity: number) {
        setContainer(prevState => {
            const state = {...prevState, [type]: quantity};

            localStorage.setItem("cache:cargo", JSON.stringify(state));

            return state;
        });
    }

    function clear() {
        setContainer({});
    }

    return <CargoContext.Provider value={{container, update, clear}}>{props.children}</CargoContext.Provider>
}