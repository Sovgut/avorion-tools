import { PayloadAction } from "@reduxjs/toolkit";
import { CommodityEntity } from "../entity";
import { Commodity } from "src/data/commodities/enums";

export type CargoCreateAction = PayloadAction<CommodityEntity>;
export type CargoDeleteAction = PayloadAction<Commodity>;
