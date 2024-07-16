import { useContext } from "react";
import { IGlobalSearchContext } from "../context/types";
import { GlobalSearchContext } from "../context";

export function useGlobalSearch(): IGlobalSearchContext {
    const context = useContext(GlobalSearchContext);

    if (!context) {
        throw new ReferenceError("useGlobalSearch should be used only within GlobalSearchContext");
    }

    return context;
}