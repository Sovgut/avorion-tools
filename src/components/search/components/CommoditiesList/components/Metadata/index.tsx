import { FC, memo, useContext } from "react";
import { ISearchCommodityMetadata } from "./types";
import { Chip, Stack } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { CommodityMetadata } from "~data/commodities/metadata";

export const SearchCommodityMetadata: FC<ISearchCommodityMetadata> = memo((props) => {
  const intlContext = useContext(IntlContext);

  let dangerous = null;
  let illegal = null;

  if (CommodityMetadata[props.commodity].illegal) {
    illegal = (
      <Chip color="warning">{intlContext.text("UI", "illegal-cargo")}</Chip>
    );
  }

  if (CommodityMetadata[props.commodity].dangerous) {
    dangerous = (
      <Chip color="danger">{intlContext.text("UI", "dangerous-cargo")}</Chip>
    );
  }

  return (
    <Stack direction="column" spacing={2} sx={{ marginTop: 1 }}>
      {dangerous}
      {illegal}
    </Stack>
  );
});
