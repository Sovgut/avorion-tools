import { FC, memo, useContext } from "react";
import { type ISearchStationsList } from "./types";
import { Box, Divider, IconButton, Link, Stack } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { StationMetadata } from "~data/stations/metadata";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";
import { AccountTree, CopyAll } from "@mui/icons-material";
import { useBreakpoint } from "~hooks/breakpoints";
import {Link as RouterLink} from "react-router-dom"
import { useGlobalSearch } from "~components/search/hook/use-global-search";

export const StationsList: FC<ISearchStationsList> = memo((props) => {
  const globalSearch = useGlobalSearch();
  const breakpoint = useBreakpoint();
  const intlContext = useContext(IntlContext);

  if (props.stations.length === 0) return null;

  return (
    <Stack direction="column">
      {props.stations.map((station) => (
        <Box key={station}>
          <Divider />
          <Stack direction="row" spacing={0.5} alignItems="center">
            {!breakpoint.sm && (
              <IconButton
                size="sm"
                title={intlContext.text("UI", "copy")}
                onClick={copyOnMouseEvent(intlContext.text("STATION", station))}
              >
                <CopyAll />
              </IconButton>
            )}
            {!breakpoint.sm && (
              <Link to={`/factories?station=${station}`} component={RouterLink} onClick={() => globalSearch.setOpen(false)}>
                <IconButton size="sm">
                  <AccountTree />
                </IconButton>
              </Link>
            )}
            <Link
              href={StationMetadata[station].link}
              color="primary"
              target="_blank"
              level="body-sm"
              sx={{ width: "max-content" }}
            >
              {intlContext.text("STATION", station)}
            </Link>
            
          </Stack>
        </Box>
      ))}
    </Stack>
  );
});
