import {createContext, ReactNode, useState} from "react";
import {GOODS} from "../constants";

interface TurretContextProviderProps {
    children: ReactNode;
}

interface TurretContextProps {
    turrets: { [id: string]: Partial<typeof GOODS> }

    set(turret: string, components: Partial<typeof GOODS>): void;

    remove(turret: string): void;
}

export const TurretContext = createContext<TurretContextProps>({
    turrets: {},
    set(turret: string, components: Partial<typeof GOODS>) {
    },
    remove(turret: string) {
    }
});

export function TurretContextProvider(props: TurretContextProviderProps) {
    const [turrets, setTurrets] = useState<{ [id: string]: Partial<typeof GOODS> }>({});

    function set(turret: string, components: Partial<typeof GOODS>) {
        setTurrets(prevTurrets => ({...prevTurrets, [turret]: components}))
    }

    function remove(turret: string) {
        const copy = {...turrets};
        delete copy[turret];

        setTurrets(copy);
    }

    return <TurretContext.Provider value={{turrets, set, remove}}>{props.children}</TurretContext.Provider>
}
