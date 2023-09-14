import {useContext} from "react";
import {ComponentsMeta} from "~constants/meta/components.ts";
import {ComponentType} from "~constants/enums/components.ts";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";

type Props = {
    type: ComponentType;
}

export function ComponentIcon({type}: Props) {
    const intlContext = useContext(IntlContext);

    return (
        <img className={styles.icon} src={ComponentsMeta[type].icon} alt={intlContext.text("COMPONENT", type)}/>
    );
}