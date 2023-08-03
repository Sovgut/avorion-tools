import {createContext, useEffect, useRef, useState} from "react";
import {Turret, TurretType} from "../../constants";
import {nanoid} from "nanoid";
import {InitialTurretContext, InitialTurretContextProps, TurretState} from "./types";
import {DEFAULT_TURRET_CONTEXT_STATE, DEFAULT_TURRET_PRICE, DEFAULT_TURRET_QUANTITY} from "./constants";

export const TurretContext = createContext<InitialTurretContext>(DEFAULT_TURRET_CONTEXT_STATE);

export function TurretContextProvider(props: InitialTurretContextProps) {
    const [records, setRecords] = useState<TurretState[]>([])

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        localStorage.setItem("cache:turrets", JSON.stringify(records));
    }, [records]);

    useEffect(() => {
        const cache = localStorage.getItem("cache:turrets");

        if (cache) {
            setRecords(JSON.parse(cache));
        }
    }, []);

    function add(turret: TurretType | null) {
        if (turret) {
            const newTurret = {
                id: nanoid(),
                type: turret,
                quantity: DEFAULT_TURRET_QUANTITY,
                price: DEFAULT_TURRET_PRICE,
                icon: Turret[turret].icon,
            }

            setRecords(prevState => ([...prevState, newTurret]))
        }
    }

    function remove(id: string) {
        setRecords(prevState => prevState.filter(t => t.id !== id));
    }

    function clear() {
        setRecords([]);
    }

    function update(id: string, attribute: "quantity" | "price", value: number) {
        setRecords(prevState => {
            return prevState.map(t => {
                if (t.id === id) {
                    const copy = {...t};

                    copy[attribute] = value;

                    return copy;
                }

                return t;
            })
        })
    }

    return (
        <TurretContext.Provider value={{records, add, remove, clear, update}}>{props.children}</TurretContext.Provider>
    )
}