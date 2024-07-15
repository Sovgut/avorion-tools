import { Commodity } from "../commodities/enums";
import { STATION_OPTIONAL_COMMODITY } from "./constants";

export type IStationCommodity = [Commodity, number, typeof STATION_OPTIONAL_COMMODITY?]

export interface IStationVariation {
    cost?: number;
    results: IStationCommodity[];
    ingredients: IStationCommodity[];
    profitPerCycle?: number;

    /**
     * Optimal factory production capacity
     */
    requiredPC?: number;

    /**
     * Cycles until the base founding cost is repaid.
     */
    ROICycles?: number;
}

export interface IStationMetadata { 
    link: string;
    variations: IStationVariation[]
}
