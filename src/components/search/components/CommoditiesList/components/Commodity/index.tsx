import { FC, memo, useContext } from "react";
import { ISearchCommodity } from "./types";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/joy";
import { SearchCommodityMetadata } from "../Metadata";
import { CommodityMetadata } from "~data/commodities/metadata";
import { SearchCommodityStation } from "./components/Station";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";
import { useBreakpoint } from "~hooks/breakpoints";
import { IntlContext } from "~contexts/intl";
import { CopyAll } from "@mui/icons-material";

export const SearchCommodity: FC<ISearchCommodity> = memo((props) => {
  const breakpoint = useBreakpoint();
  const intlContext = useContext(IntlContext);

  return (
    <Box>
      <Stack>
        <Divider />
        <SearchCommodityMetadata commodity={props.commodity} />

        <Stack direction="column" alignItems="left" justifyContent="center">
          {CommodityMetadata[props.commodity].stations.length > 0 ? (
            CommodityMetadata[props.commodity].stations.map((station) => (
              <SearchCommodityStation
                key={`${props.commodity}-${station}`}
                commodity={props.commodity}
                station={station}
              />
            ))
          ) : (
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
          )}
        </Stack>
      </Stack>
    </Box>
  );
});
