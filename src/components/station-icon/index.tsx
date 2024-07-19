import { useContext, useEffect, useState } from "react";
import { IntlContext } from "~contexts/intl";
import styles from "./styles.module.css";
import { replaceBlackToTransparent } from "~utils/transformations/replace-black-to-transparent.ts";
import { Station } from "~data/stations/enums";

type Props = {
  type: Station;
  onClick?: () => void;
  size?: `${number}px`;
};

export function StationIcon({ type, onClick, size }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    (async () => {
      const modifiedImageSrc = await replaceBlackToTransparent(
        "/img/icon/station.png",
      );
      setImageSrc(modifiedImageSrc);
    })();
  }, [type]);

  return imageSrc ? (
    <img
      onClick={onClick}
      className={styles.icon}
      style={size ? { height: size, width: size } : undefined}
      src={imageSrc}
      alt={intlContext.text("STATION", type)}
    />
  ) : null;
}
