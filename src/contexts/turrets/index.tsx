import {createContext, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {INITIAL_CONTEXT_STATE, INITIAL_PRICE, INITIAL_QUANTITY, INITIAL_SELECTED, TurretMetadata} from "./constants";
import {ITurretContext, ITurretContextProvider, ITurretState} from "./types";
import {TTurret} from "../../types";

export const TurretContext = createContext<ITurretContext>(INITIAL_CONTEXT_STATE);

export function TurretContextProvider(props: ITurretContextProvider) {
    const [container, setContainer] = useState<ITurretState[]>([]);
    const [selected, setSelected] = useState<TTurret>(Object.keys(TurretMetadata)[INITIAL_SELECTED] as TTurret);

    useEffect(() => {
        const cache = localStorage.getItem("cache:turrets");

        if (cache) {
            const parsed = JSON.parse(cache);

            setContainer(parsed);
        }
    }, []);

    function remove(key: string) {
        setContainer(prevState => {
            const state = prevState.filter(turret => turret.key !== key);

            localStorage.setItem("cache:turrets", JSON.stringify(state));

            return state;
        })
    }

    function add() {
        const newTurret: ITurretState = {
            type: selected,
            key: nanoid(),
            quantity: INITIAL_QUANTITY,
            price: INITIAL_PRICE,
            icon: TurretMetadata[selected].icon,
            version: TurretMetadata[selected].version
        }

        setContainer(prevState => {
            const state = [...prevState, newTurret];

            localStorage.setItem("cache:turrets", JSON.stringify(state));

            return state;
        });
    }

    function update(key: string, attribute: "quantity" | "price", value: number) {
        setContainer(prevState => {
            const copy = [...prevState];
            const index = copy.findIndex(turret => turret.key === key);

            copy[index][attribute] = value;
            localStorage.setItem("cache:turrets", JSON.stringify(copy));

            return copy;
        })
    }

    function select(type: TTurret) {
        setSelected(type);
    }

    return <TurretContext.Provider value={{container, selected, remove, add, update, select}}>
        {props.children}
    </TurretContext.Provider>
}