import { HTMLAttributes } from "react";
import styles from "./Buttoneble.module.scss";

export function Buttoneble(props: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={styles.component} data-scope="button" data-part="root" role="button">
            {props.children}
        </button>
    )
}