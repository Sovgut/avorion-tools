import {createContext, useContext, useEffect, useRef, useState} from "react";
import {TurretContext} from "../turret";
import {Turret} from "../../constants";
import {nanoid} from "nanoid";
import {ComponentState, InitialComponentContext, InitialComponentContextProps} from "./types";
import {DEFAULT_COMPONENT_CONTEXT_STATE, DEFAULT_COMPONENT_QUANTITY} from "./constants";

export const ComponentContext = createContext<InitialComponentContext>(DEFAULT_COMPONENT_CONTEXT_STATE);

export function ComponentContextProvider(props: InitialComponentContextProps) {
    const [records, setRecords] = useState<ComponentState[]>([]);

    const turretContext = useContext(TurretContext);
    const skipLoadCache = useRef(true);
    const skipLoadTurretComponents = useRef(true);

    useEffect(() => {
        if (skipLoadCache.current) {
            skipLoadCache.current = false;
            return;
        }

        if (records) {
            localStorage.setItem("cache:components", JSON.stringify(records));
        }
    }, [records]);

    useEffect(() => {
        const cache = localStorage.getItem("cache:components");

        if (cache) {
            setRecords(JSON.parse(cache));
        }
    }, []);

    useEffect(() => {
        if (skipLoadTurretComponents.current) {
            skipLoadTurretComponents.current = false;
            return;
        }

        setRecords(prevState => {
            const newState = [];

            for (const turret of turretContext.records) {
                const existComponents = prevState.filter(record => record.turretId === turret.id);

                if (existComponents.length === 0) {
                    const newComponents = Turret[turret.type].components.map(component => ({
                        id: nanoid(),
                        turretId: turret.id,
                        type: component,
                        quantity: DEFAULT_COMPONENT_QUANTITY
                    }))

                    newState.push(...newComponents);
                } else {
                    newState.push(...existComponents);
                }
            }

            return newState;
        })
    }, [turretContext.records]);

    function update(id: string, value: number) {
        setRecords(prevState => {
            return prevState.map(c => {
                if (c.id === id) {
                    const copy = {...c};

                    copy.quantity = value;

                    return copy;
                }

                return c;
            })
        })
    }

    function turretComponents(turretId: string) {
        return records.filter(record => record.turretId === turretId);
    }

    return (
        <ComponentContext.Provider
            value={{records, update, turretComponents}}>{props.children}</ComponentContext.Provider>
    )
}