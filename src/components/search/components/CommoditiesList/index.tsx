import { FC, memo } from "react";
import { type ISearchCommoditiesList } from "./types";
import { Stack } from "@mui/joy";
import { SearchCommodity } from "./components/Commodity";

export const CommoditiesList: FC<ISearchCommoditiesList> = memo((props) => {
  if (props.commodities.length === 0) return null;

  return (
    <Stack direction="column" spacing={1}>
      {props.commodities.map((commodity) => <SearchCommodity key={commodity} commodity={commodity}/>)}
    </Stack>
  );
});
