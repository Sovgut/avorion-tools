import { PayloadAction } from "@reduxjs/toolkit";
import { Blueprint } from "~models/blueprint.ts";

export type BlueprintCreateAction = PayloadAction<Blueprint>;
export type BlueprintUpdateAction = PayloadAction<Blueprint>;
export type BlueprintDeleteAction = PayloadAction<string>;
