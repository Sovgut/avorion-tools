import {createContext, useContext, useEffect, useState} from "react";
import {Component} from "../../constants";
import {TurretContext} from "../turrets";
import {TurretMetadata} from "../turrets/constants";
import {nanoid} from "nanoid";
import {IComponentContext, IComponentContextProvider, IComponentState} from "./types";
import {INITIAL_CONTEXT_STATE, INITIAL_QUANTITY} from "./constants";

export const ComponentContext = createContext<IComponentContext>(INITIAL_CONTEXT_STATE);

export function ComponentContextProvider(props: IComponentContextProvider) {
    const [container, setContainer] = useState<IComponentState>({});

    const turretContext = useContext(TurretContext);

    useEffect(() => {
        const cache = localStorage.getItem("cache:components");

        if (cache) {
            const parsed = JSON.parse(cache);

            setContainer(parsed)
        }
    }, []);

    useEffect(() => {
        const cache = localStorage.getItem("cache:components");
        let parsed: IComponentState = {}

        if (cache) {
            parsed = JSON.parse(cache);
        }

        setContainer(() => {
            const components: IComponentState = {}

            for (const turret of turretContext.container) {
                if (parsed[turret.key]) {
                    components[turret.key] = parsed[turret.key];
                } else {
                    for (const component of TurretMetadata[turret.type].components) {
                        components[turret.key] = {
                            [component]: {
                                key: nanoid(),
                                quantity: INITIAL_QUANTITY
                            }
                        }
                    }
                }
            }

            localStorage.setItem("cache:components", JSON.stringify(components));

            return components;
        })
    }, [turretContext.container]);

    function update(tKey: string, cType: Component, quantity: number) {
        setContainer(prevState => {
            const copy = {...prevState}

            if (!copy[tKey]) {
                copy[tKey] = {
                    [cType]: {
                        key: nanoid(),
                        quantity: quantity
                    }
                }
            }

            if (!copy[tKey][cType]) {
                copy[tKey][cType] = {
                    key: nanoid(),
                    quantity: quantity
                }
            } else {
                copy[tKey][cType]!.quantity = quantity;
            }

            localStorage.setItem("cache:components", JSON.stringify(copy));

            return copy;
        })
    }

    function flat() {
        const components = new Set<Component>();

        for (const turret of turretContext.container) {
            for (const component of TurretMetadata[turret.type].components) {
                components.add(component);
            }
        }

        return Array.from(components.values());
    }

    return <ComponentContext.Provider value={{container, update, flat}}>
        {props.children}
    </ComponentContext.Provider>
}