import { Station } from "~data/stations/enums";
import { IStationCommodity } from "~data/stations/types";

export interface IStationNode {
  station: Station;
  stationCommodity: IStationCommodity;
  nodeCommodities: IStationCommodity[];
  nodeVariationIndex: number;
}
