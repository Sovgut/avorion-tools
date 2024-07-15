import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";

export interface ISearchCommodityStation {
    commodity: Commodity;
    station: Station;
}