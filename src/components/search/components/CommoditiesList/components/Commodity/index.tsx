import { FC, memo, useContext } from "react";
import { ISearchCommodity } from "./types";
import {
  Box,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
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
    <Card variant="soft">
      <Box>
        <Stack direction="row" spacing={1}>
          <Typography level="title-lg">
            {intlContext.text("COMMODITY", props.commodity)}
          </Typography>
          <SearchCommodityMetadata commodity={props.commodity} />
        </Stack>
        <IconButton
          variant="plain"
          color="neutral"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
          size="sm"
          title={intlContext.text("UI", "copy")}
          onClick={copyOnMouseEvent(
            intlContext.text("COMMODITY", props.commodity)
          )}
        >
          <CopyAll />
        </IconButton>
      </Box>

      <CardContent>
        {CommodityMetadata[props.commodity].stations.map((station) => (
          <SearchCommodityStation
            key={`${props.commodity}-${station}`}
            commodity={props.commodity}
            station={station}
          />
        ))}
      </CardContent>
    </Card>
  );
});
