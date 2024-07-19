import { Station } from "~data/stations/enums";
import { IStationCommodity, IStationVariation } from "~data/stations/types";

export interface ICommodityGroup {
  stationCommodity: IStationCommodity;
  nodes: Array<{
    station: Station;
    variations: { metadata: IStationVariation; index: number }[];
  }>;
}
