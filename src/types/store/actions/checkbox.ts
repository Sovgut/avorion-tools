import { PayloadAction } from "@reduxjs/toolkit";
import { Commodity } from "~data/commodities/enums";

export type CheckboxCreateAction = PayloadAction<{ type: Commodity; value: boolean }>;
export type CheckboxDeleteAction = PayloadAction<Commodity>;
