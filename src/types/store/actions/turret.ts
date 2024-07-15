import { PayloadAction } from "@reduxjs/toolkit";
import { TurretEntity } from "../entity.ts";
import { Identity } from "../common.ts";

export type TurretCreateAction = PayloadAction<{
  identity: Identity;
  entity: TurretEntity;
}>;
export type TurretUpdateAction = PayloadAction<{
  identity: Identity;
  entity: TurretEntity;
}>;
export type TurretDeleteAction = PayloadAction<{ identity: Identity }>;
