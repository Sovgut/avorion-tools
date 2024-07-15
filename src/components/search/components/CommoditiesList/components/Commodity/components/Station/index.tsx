import { FC, memo, useContext } from "react";
import { ISearchCommodityStation } from "./types";
import { IconButton, Link, Stack, Typography } from "@mui/joy";
import { useBreakpoint } from "~hooks/breakpoints";
import { IntlContext } from "~contexts/intl";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";
import { StationMetadata } from "~data/stations/metadata";
import { CopyAll } from "@mui/icons-material";

export const SearchCommodityStation: FC<ISearchCommodityStation> = memo(
  (props) => {
    const breakpoint = useBreakpoint();
    const intlContext = useContext(IntlContext);

    return (
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
      >
        <Stack direction="row" alignItems="center">
          <Typography level="body-sm" sx={{ width: "max-content" }}>
            {intlContext.text("COMMODITY", props.commodity)}
          </Typography>
          {!breakpoint.sm && (
            <IconButton
              size="sm"
              title={intlContext.text("UI", "copy")}
              onClick={copyOnMouseEvent(
                intlContext.text("COMMODITY", props.commodity)
              )}
            >
              <CopyAll />
            </IconButton>
          )}
        </Stack>
        <Typography level="body-sm">
          {" "}
          &gt; {intlContext.text("UI", "station")} /{" "}
        </Typography>
        <Link
          href={StationMetadata[props.station].link}
          color="primary"
          target="_blank"
          level="body-sm"
          sx={{ width: "max-content" }}
        >
          {intlContext.text("STATION", props.station)}
        </Link>
        {!breakpoint.sm && (
          <IconButton
            size="sm"
            title={intlContext.text("UI", "copy")}
            onClick={copyOnMouseEvent(
              intlContext.text("STATION", props.station)
            )}
          >
            <CopyAll />
          </IconButton>
        )}
      </Stack>
    );
  }
);
