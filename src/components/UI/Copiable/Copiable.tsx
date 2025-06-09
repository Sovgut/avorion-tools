import { CopyAll } from "@mui/icons-material";
import { ReactNode, useCallback } from "react";
import styles from "./Copiable.module.scss";

interface Props {
    value: string;
    children?: ReactNode;
}

export function Copiable({ value, children }: Props) {
    const onCopy = useCallback(() => {
        window.navigator.clipboard.writeText(value).then();
    }, [value])

    return (
        <div className={styles.component} data-scope="copiable" data-part="root" role="button" onClick={onCopy}>
            {children ? children : <CopyAll />}
        </div>
    )
}