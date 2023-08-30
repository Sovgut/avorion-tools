import {TurretType} from "@/constants/enums/turrets";
import {ComponentType} from "@/constants/enums/components";

export interface Component {
    key: ComponentType;
    quantity: number;
}

export interface Turret {
    key: TurretType;
    quantity: number;
    price: number;
    components: Record<string, Component>;
}

export interface TurretPayload {
    id: string;
    data: Turret;
}

export interface ComponentPayload {
    turretId: string;
    id: string;
    data: Component;
}

export type TurretMetaType = { icon: string, components: ComponentType[] };

/**
 * @deprecated
 */
export type TODOANY = any;