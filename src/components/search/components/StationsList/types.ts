import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";

export interface ISearchStationsList {
    commodity: Commodity[];
    stations: Station[]
}