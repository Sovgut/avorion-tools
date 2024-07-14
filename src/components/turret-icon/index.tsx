import {useContext, useEffect, useState} from "react";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";
import {replaceBlackToTransparent} from "~utils/transformations/replace-black-to-transparent.ts";
import { Turret } from "src/data/turrets/enums";
import { TurretMetadata } from "src/data/turrets/metadata";

type Props = {
    type: Turret;
}

export function TurretIcon({type}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        (async () => {
            const modifiedImageSrc = await replaceBlackToTransparent(TurretMetadata[type].icon);
            setImageSrc(modifiedImageSrc);
        })();
    }, [type]);

    return imageSrc ? (
        <img className={styles.icon} src={imageSrc} alt={intlContext.text("TURRET", type)}/>
    ) : null;
}