import { PayloadAction } from "@reduxjs/toolkit";
import { Component } from "~models/component.ts";

export type ComponentCreateAction = PayloadAction<Component>;
export type ComponentUpdateAction = PayloadAction<Component>;
export type ComponentDeleteAction = PayloadAction<string>;
