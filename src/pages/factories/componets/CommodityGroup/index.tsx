import { Stack, Typography } from "@mui/joy";
import { FC, Fragment, memo, useContext } from "react";
import { StationNode } from "../StationNode";
import { ICommodityGroup } from "./types";
import { IntlContext } from "~contexts/intl";

export const CommodityGroup: FC<ICommodityGroup> = memo((props) => {
  const intlContext = useContext(IntlContext);

  if (props.nodes.length === 0) return null;

  return (
    <fieldset>
      <legend>
        <Typography color="neutral">
          {intlContext.text("COMMODITY", props.stationCommodity[0])}
        </Typography>
      </legend>
      <table>
        <tbody>
          {props.nodes.map(({ station, variations }) =>
            variations.map((variation, index) => (
              <tr key={`${station}-${index}`}>
                <StationNode
                  key={index}
                  direction={props.direction}
                  nodeCommodities={variation.metadata[props.direction]}
                  nodeVariationIndex={variation.index}
                  stationCommodity={props.stationCommodity}
                  station={station}
                />
              </tr>
            )),
          )}
        </tbody>
      </table>
    </fieldset>
  );
});
