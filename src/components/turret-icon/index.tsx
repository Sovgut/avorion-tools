import {useContext, useEffect, useState} from "react";
import {TurretsMeta} from "~constants/meta/turrets";
import {TurretType} from "~constants/enums/turrets";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";
import {replaceBlackToTransparent} from "~utils/transformations/replace-black-to-transparent.ts";

type Props = {
    type: TurretType;
}

export function TurretIcon({type}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        (async () => {
            const modifiedImageSrc = await replaceBlackToTransparent(TurretsMeta[type].icon);
            setImageSrc(modifiedImageSrc);
        })();
    }, [type]);

    return imageSrc ? (
        <img className={styles.icon} src={imageSrc} alt={intlContext.text("TURRET", type)}/>
    ) : null;
}