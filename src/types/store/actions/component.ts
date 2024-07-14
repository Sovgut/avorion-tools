import { PayloadAction } from "@reduxjs/toolkit";
import { Identity } from "../common.ts";
import { CommodityEntity } from "../entity.ts";

export type ComponentCreateAction = PayloadAction<{
  identity: Identity;
  entity: CommodityEntity;
}>;
export type ComponentUpdateAction = PayloadAction<{
  identity: Identity;
  entity: CommodityEntity;
}>;
export type ComponentDeleteAction = PayloadAction<{ identity: Identity }>;
