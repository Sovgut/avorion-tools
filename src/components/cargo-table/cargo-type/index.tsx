import { useContext } from "react";
import { Stack, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { ComponentIcon } from "~components/component-icon";
import { useBreakpoint } from "~hooks/breakpoints";
import { Commodity } from "src/data/commodities/enums";
import { CommodityMetadata } from "src/data/commodities/metadata";

type Props = {
  type: Commodity;
};

export function CargoItemType({ type }: Props) {
  const intlContext = useContext(IntlContext);
  const breakpoint = useBreakpoint();

  let fontSize: "md" | number = "md";
  let color: "danger" | "warning" | undefined;

  if (breakpoint.sm) {
    fontSize = 12;
  }

  if (CommodityMetadata[type].dangerous) {
    color = "danger";
  }

  if (CommodityMetadata[type].illegal) {
    color = "warning";
  }

  return (
    <td style={{ paddingLeft: 16, paddingRight: 0, userSelect: "none" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ComponentIcon type={type} />
        <Typography fontSize={fontSize} color={color}>
          {intlContext.text("COMMODITY", type)}
        </Typography>
      </Stack>
    </td>
  );
}
