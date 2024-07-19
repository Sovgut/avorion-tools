import { createContext } from "react";
import { IFactoryContext } from "./types";

export const FactoryContext = createContext<IFactoryContext | null>(null);
