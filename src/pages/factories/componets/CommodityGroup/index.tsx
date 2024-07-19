import { Stack, Typography } from "@mui/joy";
import { FC, memo, useContext } from "react";
import { StationNode } from "../StationNode";
import { ICommodityGroup } from "./types";
import { IntlContext } from "~contexts/intl";
import { useFactoryReference } from "../FactoryReferences/hook/use-factory-reference";

export const CommodityGroup: FC<ICommodityGroup> = memo((props) => {
  const intlContext = useContext(IntlContext);
  const factoryReference = useFactoryReference();

  if (props.nodes.length === 0) return null;

  const isConsumables =
    factoryReference.root === "consumables" ||
    factoryReference.reference === "consumables";

  return (
    <fieldset style={{ borderColor: isConsumables ? "#9d6363" : undefined }}>
      <legend>
        <Typography color="neutral">
          {intlContext.text("COMMODITY", props.stationCommodity.type)}
        </Typography>
      </legend>
      <table>
        <tbody>
          {props.nodes.map(({ station, variations }) =>
            variations.map((variation, index) => (
              <tr key={`${station}-${index}`}>
                <StationNode
                  key={index}
                  nodeCommodities={
                    variation.metadata[factoryReference.reference]
                  }
                  nodeVariationIndex={variation.index}
                  stationCommodity={props.stationCommodity}
                  station={station}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </fieldset>
  );
});
