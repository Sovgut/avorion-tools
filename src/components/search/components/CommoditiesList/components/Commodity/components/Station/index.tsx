import { FC, memo, useContext } from "react";
import { ISearchCommodityStation } from "./types";
import { IconButton, Link, Stack } from "@mui/joy";
import { useBreakpoint } from "~hooks/breakpoints";
import { IntlContext } from "~contexts/intl";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";
import { StationMetadata } from "~data/stations/metadata";
import { AccountTree, CopyAll } from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom"
import { useGlobalSearch } from "~components/search/hook/use-global-search";

export const SearchCommodityStation: FC<ISearchCommodityStation> = memo(
  (props) => {
    const globalSearch = useGlobalSearch();
    const breakpoint = useBreakpoint();
    const intlContext = useContext(IntlContext);

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
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
        {!breakpoint.sm && (
          <Link to={`/factories?station=${props.station}`} component={RouterLink} onClick={() => globalSearch.setOpen(false)}>
            <IconButton size="sm">
              <AccountTree />
            </IconButton>
          </Link>
        )}
        <Link
          href={StationMetadata[props.station].link}
          color="primary"
          target="_blank"
          level="body-sm"
          sx={{ width: "max-content" }}
        >
          {intlContext.text("STATION", props.station)}
        </Link>
      </Stack>
    );
  }
);
