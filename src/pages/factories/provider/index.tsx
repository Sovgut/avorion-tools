import { FC, memo, PropsWithChildren } from "react";
import { FactoryContext } from "../context";
import { IFactoryProvider } from "./types";

export const FactoryProvider: FC<PropsWithChildren<IFactoryProvider>> = memo(
  (props) => {
    if (props.station === null) return null;

    return (
      <FactoryContext.Provider
        value={{
          station: props.station,
          stationVariationIndex: props.stationVariationIndex,
          setStation: props.setStation,
          setStationVariation: props.setStationVariation,
        }}
      >
        {props.children}
      </FactoryContext.Provider>
    );
  },
);
