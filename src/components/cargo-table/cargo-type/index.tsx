import { MouseEvent, useCallback, useContext, useMemo } from "react";
import { IconButton, Link, Stack, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { ComponentIcon } from "~components/component-icon";
import { useBreakpoint } from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { serializeStations } from "~utils/serialize-station";
import { StationMetadata } from "~data/stations/metadata";
import { IStationCommodity } from "~data/stations/types";
import { AccountTree, CopyAll } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

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

  function handleCopyText(component: string) {
    return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();

      window.navigator.clipboard.writeText(component).then();
    };
  }

  const searchStation = useCallback((commodity: Commodity) => {
    const station = serializeStations(Object.keys(StationMetadata)).find(
      (station) =>
        StationMetadata[station].variations.find((variation) =>
          variation.results.find(
            ([result]: IStationCommodity) => result === commodity
          )
        )
      );

    return station;
  }, [type]);

  const station = useMemo(() => searchStation(type), [type, searchStation]);

  return (
    <td style={{ paddingLeft: 16, paddingRight: 0, userSelect: "none" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <ComponentIcon type={type} />

        {!breakpoint.sm && (
          <IconButton
            size="sm"
            title={intlContext.text("UI", "copy")}
            onClick={handleCopyText(intlContext.text("COMMODITY", type))}
          >
            <CopyAll />
          </IconButton>
        )}
        {!breakpoint.sm && typeof station === "number" && (
          <Link to={`/factories?station=${station}`} component={RouterLink}>
            <IconButton size="sm">
              <AccountTree />
            </IconButton>
          </Link>
        )}
        <Typography fontSize={fontSize} color={color}>
          {intlContext.text("COMMODITY", type)}
        </Typography>
      </Stack>
    </td>
  );
}
