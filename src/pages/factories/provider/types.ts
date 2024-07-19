import { Station } from "~data/stations/enums";
import { IFactoryContext } from "../context/types";

export interface IFactoryProvider extends Omit<IFactoryContext, "station"> {
  station: Station | null;
}
