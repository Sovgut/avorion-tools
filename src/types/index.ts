import {ComponentType} from "~constants/enums/components.ts";
import {SellerType} from "~constants/enums/sellers.ts";

export type TurretMetaType = { icon: string, components: ComponentType[] };
export type ComponentMetaType = {
    price: number,
    volume: number,
    illegal: boolean,
    dangerous: boolean,
    icon: string,
    source: SellerType[]
    optionalSource: SellerType[]
};
export type SellerMetaType = { link: string };