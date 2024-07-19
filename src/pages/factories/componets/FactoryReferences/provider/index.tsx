import { FC, memo, PropsWithChildren } from "react";
import { IFactoryReferenceContext } from "../context/types";
import { FactoryReferenceContext } from "../context";

export const FactoryReferenceProvider: FC<PropsWithChildren<IFactoryReferenceContext>> = memo((props) => {
    return (
        <FactoryReferenceContext.Provider value={props}>
            {props.children}
        </FactoryReferenceContext.Provider>
    )
})