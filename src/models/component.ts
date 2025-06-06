import { Commodity } from "~data/commodities/enums";

export interface Component {
    id: string;
    turret_id: string;
    type: Commodity;
    quantity: number;
}