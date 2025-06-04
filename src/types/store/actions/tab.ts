import { PayloadAction } from "@reduxjs/toolkit";
import { Identity } from "../common.ts";
import { TabEntity } from "../entity.ts";

export type TabCreateAction = PayloadAction<{
  identity: Identity;
  entity: TabEntity;
}>;
export type TabUpdateAction = PayloadAction<{
  identity: Identity;
  entity: TabEntity;
}>;
export type TabDeleteAction = PayloadAction<{ identity: Identity }>;
