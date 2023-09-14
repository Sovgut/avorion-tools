import {PayloadAction} from "@reduxjs/toolkit";
import {Identity} from "../common.ts";
import {ComponentEntity} from "../entity.ts";

export type ComponentCreateAction = PayloadAction<{ identity: Identity; entity: ComponentEntity }>;
export type ComponentUpdateAction = PayloadAction<{ identity: Identity, entity: ComponentEntity }>;
export type ComponentDeleteAction = PayloadAction<{ identity: Identity }>;