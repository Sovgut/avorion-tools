import {useContext} from "react";
import {TurretsMeta} from "~constants/meta/turrets";
import {TurretType} from "~constants/enums/turrets";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";

type Props = {
    type: TurretType;
}

export function TurretIcon({type}: Props) {
    const intlContext = useContext(IntlContext);

    return (
        <img className={styles.icon} src={TurretsMeta[type].icon} alt={intlContext.text("TURRET", type)}/>
    )
}