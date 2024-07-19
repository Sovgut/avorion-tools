import { useContext } from "react";
import { IFactoryContext } from "../context/types";
import { FactoryContext } from "../context";

export function useFactory(): IFactoryContext {
  const context = useContext(FactoryContext);

  if (!context) {
    throw new ReferenceError(
      "useFactory should be used only within FactoryContext.",
    );
  }

  return context;
}
