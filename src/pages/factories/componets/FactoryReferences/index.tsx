import { Box } from "@mui/joy";
import { FC, memo, useCallback } from "react";
import { StationMetadata } from "~data/stations/metadata";
import { useFactory } from "~pages/factories/hook/use-factory";
import { CommodityGroup } from "../CommodityGroup";
import { Commodity } from "~data/commodities/enums";
import { serializeStations } from "~utils/serialize-station";
import { IFactoryReferences } from "./types";
import { FactoryReferenceProvider } from "./provider";

export const FactoryReferences: FC<IFactoryReferences> = memo((props) => {
  const factory = useFactory();

  const variation =
    StationMetadata[factory.station].variations[factory.stationVariationIndex];

  const getNodes = useCallback(
    (commodity: Commodity) => {
      return serializeStations(Object.keys(StationMetadata))
        .filter(
          (station) =>
            !!StationMetadata[station].variations.find(
              (variation) =>
                !!variation[props.reference].find(
                  (ingredient) => ingredient.type === commodity
                )
            )
        )
        .map((station) => ({
          station,
          variations: StationMetadata[station].variations
            .map((variation, index) => ({ metadata: variation, index }))
            .filter(
              (variation) =>
                !!variation.metadata[props.reference].find(
                  (ingredient) => ingredient.type === commodity
                )
            ),
        }));
    },
    [props.reference]
  );

  const groups = variation[props.root].map((commodity, index) => {
    const nodes = getNodes(commodity.type);

    if (!nodes) return null;

    return (
      <CommodityGroup key={index} nodes={nodes} stationCommodity={commodity} />
    );
  });

  if (groups.filter(Boolean).length === 0) return null;

  return (
    <FactoryReferenceProvider root={props.root} reference={props.reference}>
      <Box>{groups}</Box>
    </FactoryReferenceProvider>
  );
});
