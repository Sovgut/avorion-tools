import {useContext, useEffect, useState} from "react";
import {IntlContext} from "~contexts/intl";
import styles from "./styles.module.css";
import {replaceBlackToTransparent} from "~utils/transformations/replace-black-to-transparent.ts";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";

type Props = {
    type: Commodity;
    onClick?: () => void;
}

export function ComponentIcon({type, onClick}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        (async () => {
            const modifiedImageSrc = await replaceBlackToTransparent(CommodityMetadata[type].icon);
            setImageSrc(modifiedImageSrc);
        })();
    }, [type]);

    return imageSrc ? (
        <img onClick={onClick} className={styles.icon} src={imageSrc} alt={intlContext.text("COMMODITY", type)}/>
    ) : null;
}