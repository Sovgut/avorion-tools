import { HTMLAttributes, ReactNode } from "react"
import styles from "./Toggleble.module.scss"

interface Props {
    children: ReactNode;
    onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
    value?: boolean;
}

export function Toggleble({ children, value = true, onClick }: Props) {
    return (
        <div className={styles.component} data-state={value} data-scope="toggleble" data-part="root" role="button" onClick={onClick}>
            {children}
        </div>
    )
}