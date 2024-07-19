import { Box } from "@mui/joy";
import { FC, memo, useCallback } from "react";
import { StationMetadata } from "~data/stations/metadata";
import { useFactory } from "~pages/factories/hook/use-factory";
import { CommodityGroup } from "../CommodityGroup";
import { Commodity } from "~data/commodities/enums";
import { serializeStations } from "~utils/serialize-station";
import { IFactoryReferences } from "./types";

export const FactoryReferences: FC<IFactoryReferences> = memo((props) => {
  const factory = useFactory();

  const getNodes = useCallback(
    (commodity: Commodity) => {
      return serializeStations(Object.keys(StationMetadata))
        .filter(
          (station) =>
            !!StationMetadata[station].variations.find(
              (variation) =>
                !!variation[props.direction].find(
                  ([ingredient]) => ingredient === commodity,
                ),
            ),
        )
        .map((station) => ({
          station,
          variations: StationMetadata[station].variations
            .map((variation, index) => ({ metadata: variation, index }))
            .filter(
              (variation) =>
                !!variation.metadata[props.direction].find(
                  ([ingredient]) => ingredient === commodity,
                ),
            ),
        }));
    },
    [props.direction],
  );

  const variation =
    StationMetadata[factory.station].variations[factory.stationVariationIndex];
  const rootDirection =
    props.direction === "results" ? "ingredients" : "results";

  return (
    <Box
      sx={{
        "&:empty": {
          display: "none",
        },
      }}
    >
      {variation[rootDirection].map((commodity, index) => (
        <CommodityGroup
          key={index}
          nodes={getNodes(commodity[0])}
          direction={props.direction}
          stationCommodity={commodity}
        />
      ))}
    </Box>
  );
});
