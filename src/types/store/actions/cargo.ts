import {PayloadAction} from "@reduxjs/toolkit";
import {ComponentEntity} from "../entity.ts";
import {ComponentType} from "~constants/enums/components.ts";

export type CargoCreateAction = PayloadAction<ComponentEntity>;
export type CargoDeleteAction = PayloadAction<ComponentType>;