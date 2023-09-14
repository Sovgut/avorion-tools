import {ComponentType} from "~constants/enums/components.ts";
import {TurretType} from "~constants/enums/turrets.ts";
import {SellerType} from "~constants/enums/sellers.ts";

export interface Component {
    key: ComponentType;
    quantity: number;
}

export interface Turret {
    key: TurretType;
    quantity: number;
    price: number;
    components: Record<ComponentType, number>;
}

export interface TurretPayload {
    id: string;
    data: Turret;
}

export interface ComponentPayload {
    turretId: string;
    type: ComponentType;
    data: number;
}

export type TurretMetaType = { icon: string, components: ComponentType[] };
export type ComponentMetaType = {
    price: number,
    volume: number,
    illegal: boolean,
    dangerous: boolean,
    icon: string,
    sellers: SellerType[]
};
export type SellerMetaType = { link: string };