import { PayloadAction } from "@reduxjs/toolkit";
import { CommodityEntity } from "../entity";

export type CheckboxCreateAction = PayloadAction<
  CommodityEntity | Omit<CommodityEntity, "quantity">
>;
export type CheckboxDeleteAction = PayloadAction<
  CommodityEntity | Omit<CommodityEntity, "quantity">
>;
