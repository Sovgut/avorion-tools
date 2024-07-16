import { createContext } from "react";
import { IGlobalSearchContext } from "./types";

export const GlobalSearchContext = createContext<IGlobalSearchContext | null>(null);