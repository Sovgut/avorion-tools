import { FC, memo } from "react";
import { type ISearchCommoditiesList } from "./types";
import { Stack } from "@mui/joy";
import { SearchCommodity } from "./components/Commodity";

export const CommoditiesList: FC<ISearchCommoditiesList> = memo((props) => {
  if (props.commodities.length === 0) return null;

  return (
    <Stack direction="column">
      {props.commodities.map((commodity) => <SearchCommodity commodity={commodity}/>)}
    </Stack>
  );
});
