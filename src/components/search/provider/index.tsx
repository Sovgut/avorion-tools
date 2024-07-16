import { FC, memo, PropsWithChildren, useState } from "react";
import { GlobalSearchContext } from "../context";

export const GlobalSearchProvider: FC<PropsWithChildren> = memo((props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <GlobalSearchContext.Provider value={{open, setOpen}}>
            {props.children}
        </GlobalSearchContext.Provider>
    )
})