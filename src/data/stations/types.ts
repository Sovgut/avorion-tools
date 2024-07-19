import { Commodity } from "../commodities/enums";

export type IStationCommodity = {
  type: Commodity;
  amount: number;
  isOptional?: boolean;

  /**
   * Mark this commodity as consumer only, some calculations are skipped.
   */
  isConsumer?: boolean;
};

export interface IStationVariation {
  cost?: number;
  results: IStationCommodity[];
  ingredients: IStationCommodity[];
  profitPerCycle?: number;
  isConsumer?: boolean;

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
  variations: IStationVariation[];
}
