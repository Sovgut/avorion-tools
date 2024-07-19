import { createContext } from "react";
import { IFactoryReferenceContext } from "./types";

export const FactoryReferenceContext = createContext<IFactoryReferenceContext | null>(null);