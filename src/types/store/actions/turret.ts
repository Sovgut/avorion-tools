import { PayloadAction } from "@reduxjs/toolkit";
import { Turret } from "~models/turret";

export type TurretCreateAction = PayloadAction<Turret>;
export type TurretUpdateAction = PayloadAction<Turret>;
export type TurretDeleteAction = PayloadAction<string>;
