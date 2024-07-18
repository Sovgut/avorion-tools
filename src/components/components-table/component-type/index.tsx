import { MouseEvent, useContext, useMemo } from "react";
import { Box, IconButton, Link, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~store";
import { SxProps } from "@mui/joy/styles/types";
import {
  createComponentCheckbox,
  deleteComponentCheckbox,
} from "~reducers/checkbox.ts";
import { AccountTree, CopyAll } from "@mui/icons-material";
import { ComponentIcon } from "~components/component-icon";
import styles from "./styles.module.css";
import { useBreakpoint } from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { StationMetadata } from "~data/stations/metadata";
import { serializeStations } from "~utils/serialize-station";
import { IStationCommodity } from "~data/stations/types";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  type: Commodity;
};

export function ComponentItemType({ type }: Props) {
  const intlContext = useContext(IntlContext);
  const checkbox = useSelector((state: RootState) => state.checkbox);
  const dispatch = useDispatch();
  const breakpoint = useBreakpoint();

  function handleCheckbox() {
    if (checkbox.entities[type]) {
      dispatch(deleteComponentCheckbox({ type: type }));
    } else {
      dispatch(createComponentCheckbox({ type: type }));
    }
  }

  const sx: SxProps = { textDecoration: "none", opacity: 1 };
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

  if (checkbox.entities[type]) {
    sx.textDecoration = "line-through";
    sx.opacity = 0.5;
  }

  function handleCopyText(component: string) {
    return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();

      window.navigator.clipboard.writeText(component).then();
    };
  }

  function searchStation(commodity: Commodity) {
    const stations = serializeStations(Object.keys(StationMetadata)).filter(
      (station) =>
        !!StationMetadata[station].variations.filter((variation) =>
          variation.results.filter(
            ([result]: IStationCommodity) => result === commodity
          )
        )
    );

    if (stations.length == 0) return undefined;

    return stations[0];
  }

  const station = useMemo(() => searchStation(type), [type]);

  return (
    <td
      
      style={{
        paddingLeft: 16,
        paddingRight: 0,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Box className={styles.component} sx={sx}>
        <ComponentIcon type={type} onClick={handleCheckbox}/>

        {!breakpoint.sm && (
          <IconButton
            disabled={!!checkbox.entities[type]}
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
        <Typography fontSize={fontSize} color={color} sx={sx} onClick={handleCheckbox}>
          {intlContext.text("COMMODITY", type)}
        </Typography>
      </Box>
    </td>
  );
}
