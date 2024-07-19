import { Dispatch, SetStateAction } from "react";
import { Station } from "~data/stations/enums";

export interface IFactoryContext {
  station: Station;
  stationVariationIndex: number;

  setStation: Dispatch<SetStateAction<Station>>;
  setStationVariation: Dispatch<SetStateAction<number>>;
}
