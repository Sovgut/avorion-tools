import {TurretType} from "../../constants";
import {ReactNode} from "react";

export type TurretState = {
    id: string;
    type: TurretType;
    quantity: number;
    price: number;
    icon: string;
}

export type InitialTurretContext = {
    records: TurretState[];

    add(turret: TurretType | null): void;
    remove(id: string): void;
    clear(): void;
    update(id: string, attribute: "quantity" | "price", value: number): void;
};
export type InitialTurretContextProps = {
    children: ReactNode;
}