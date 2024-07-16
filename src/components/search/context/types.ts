import { Dispatch, SetStateAction } from "react";

export interface IGlobalSearchContext {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}