import { PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "~models/tab";

export type TabCreateAction = PayloadAction<Tab>;
export type TabUpdateAction = PayloadAction<Tab>;
export type TabDeleteAction = PayloadAction<string>;
