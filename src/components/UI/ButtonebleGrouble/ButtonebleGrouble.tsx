import { CSSProperties, ReactNode } from "react";
import styles from "./ButtonebleGrouble.module.scss";

interface Props {
    children: ReactNode;
    groupColor?: string;
}

export function ButtonebleGrouble({ children, groupColor }: Props) {
    return (
        <div className={styles.component} style={{ '--group-color': groupColor } as CSSProperties} data-scope="button-group" data-part="root">
            {children}
        </div>
    )
}