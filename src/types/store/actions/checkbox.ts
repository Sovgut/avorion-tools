import {PayloadAction} from "@reduxjs/toolkit";
import {ComponentEntity} from "../entity.ts";

export type CheckboxCreateAction = PayloadAction<ComponentEntity | Omit<ComponentEntity, 'quantity'>>;
export type CheckboxDeleteAction = PayloadAction<ComponentEntity | Omit<ComponentEntity, 'quantity'>>;