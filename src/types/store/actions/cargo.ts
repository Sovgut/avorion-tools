import { PayloadAction } from "@reduxjs/toolkit";
import { Commodity } from "~data/commodities/enums";

export type CargoCreateAction = PayloadAction<{ type: Commodity; quantity: number }>;
export type CargoDeleteAction = PayloadAction<Commodity>;
