import { Commodity } from "../commodities/enums";
import { STATION_OPTIONAL_COMMODITY } from "./constants";

export interface IStationVariation {
    cost?: number;
    results: [Commodity, number, typeof STATION_OPTIONAL_COMMODITY?][];
    ingredients: [Commodity, number, typeof STATION_OPTIONAL_COMMODITY?][];
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
