import {useContext, useEffect, useState} from "react";
import {ComponentsMeta} from "~constants/meta/components.ts";
import {ComponentType} from "~constants/enums/components.ts";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";
import {replaceBlackToTransparent} from "~utils/transformations/replace-black-to-transparent.ts";

type Props = {
    type: ComponentType;
}

export function ComponentIcon({type}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        (async () => {
            const modifiedImageSrc = await replaceBlackToTransparent(ComponentsMeta[type].icon);
            setImageSrc(modifiedImageSrc);
        })();
    }, [type]);

    return imageSrc ? (
        <img className={styles.icon} src={imageSrc} alt={intlContext.text("COMPONENT", type)}/>
    ) : null;
}