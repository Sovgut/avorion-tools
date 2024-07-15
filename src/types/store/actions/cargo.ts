import { PayloadAction } from "@reduxjs/toolkit";
import { CommodityEntity } from "../entity";
import { Commodity } from "~data/commodities/enums";

export type CargoCreateAction = PayloadAction<CommodityEntity>;
export type CargoDeleteAction = PayloadAction<Commodity>;
