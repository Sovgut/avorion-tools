import { IStationCommodity, IStationVariation } from "./types";

export class StationVariation {
    public readonly consumables: IStationCommodity[] = [];
    public readonly ingredients: IStationCommodity[] = [];
    public readonly results: IStationCommodity[] = [];
    public readonly cost: number = 0;
    public readonly profitPerCycle: number = 0;
    public readonly isConsumer: boolean = false;

    /**
     * Optimal factory production capacity
     */
    public readonly requiredPC: number = 0;

    /**
     * Cycles until the base founding cost is repaid.
     */
    public readonly ROICycles: number = 0;

    constructor(options?: Partial<IStationVariation>) {
        if (typeof options?.consumables !== "undefined") {
            this.consumables = options?.consumables;
        }

        if (typeof options?.ingredients !== "undefined") {
            this.ingredients = options?.ingredients;
        }

        if (typeof options?.results !== "undefined") {
            this.results = options?.results;
        }
        
        if (typeof options?.cost !== "undefined") {
            this.cost = options?.cost;
        }

        if (typeof options?.profitPerCycle !== "undefined") {
            this.profitPerCycle = options?.profitPerCycle;
        }

        if (typeof options?.isConsumer !== "undefined") {
            this.isConsumer = options?.isConsumer;
        }

        if (typeof options?.isConsumer !== "undefined") {
            this.isConsumer = options?.isConsumer;
        }

        if (typeof options?.ROICycles !== "undefined") {
            this.ROICycles = options?.ROICycles;
        }
    }
}