import { Commodity } from "../commodities/enums";

export interface ITurretMetadata { 
    icon: string;
    commodities: Commodity[];
}