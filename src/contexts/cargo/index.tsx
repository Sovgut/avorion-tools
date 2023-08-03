import {createContext, useEffect, useRef, useState} from "react";
import {Component, ComponentInfo} from "../../constants";
import {CargoState, InitialCargoContext, InitialCargoContextProps} from "./types";
import {INITIAL_CARGO_CONTEXT_STATE} from "./constants";

export const CargoContext = createContext<InitialCargoContext>(INITIAL_CARGO_CONTEXT_STATE)

export function CargoContextProvider(props: InitialCargoContextProps) {
    const [records, setRecords] = useState<CargoState[]>([]);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        localStorage.setItem("cache:cargo", JSON.stringify(records));
    }, [records]);

    useEffect(() => {
        const cache = localStorage.getItem("cache:cargo");

        if (cache) {
            setRecords(JSON.parse(cache));
        }
    }, [])

    function add(type: Component, quantity: number) {
        setRecords(prevState => ([...prevState, {type, quantity}]));
    }

    function remove(type: Component) {
        setRecords(prevState => prevState.filter(c => c.type !== type));
    }

    function byType(type: Component) {
        return records.filter(c => c.type === type);
    }

    function unite(list: CargoState[]) {
        const cargo: CargoState[] = [];

        for (const item of list) {
            const index = cargo.findIndex(i => i.type === item.type);

            if (index >= 0) {
                cargo[index].quantity += item.quantity;
            } else {
                cargo.push({...item});
            }
        }

        return cargo;
    }

    function estimation(attr: "price" | "volume") {
        const list = unite(records);
        let output = 0;

        for (const item of list) {
            output += ComponentInfo[item.type][attr];
        }

        return output;
    }

    return (
        <CargoContext.Provider
            value={{records, add, remove, byType, unite, estimation}}>{props.children}</CargoContext.Provider>
    )
}