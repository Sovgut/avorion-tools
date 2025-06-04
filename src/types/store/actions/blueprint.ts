import { PayloadAction } from "@reduxjs/toolkit";
import { BlueprintEntity } from "../entity.ts";
import { Identity } from "../common.ts";

export type BlueprintCreateAction = PayloadAction<{
  identity: Identity;
  entity: BlueprintEntity;
}>;
export type BlueprintUpdateAction = PayloadAction<{
  identity: Identity;
  entity: BlueprintEntity;
}>;
export type BlueprintDeleteAction = PayloadAction<{ identity: Identity }>;
