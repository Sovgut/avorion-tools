import { useContext } from "react";
import { IFactoryReferenceContext } from "../context/types";
import { FactoryReferenceContext } from "../context";

export function useFactoryReference(): IFactoryReferenceContext {
    const context = useContext(FactoryReferenceContext);

    if (!context) {
        throw new ReferenceError("useFactoryReference should be used only within FactoryReferenceContext");
    }

    return context;
}