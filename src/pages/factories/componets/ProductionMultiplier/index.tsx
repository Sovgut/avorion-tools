import { Stack, Typography } from "@mui/joy";
import { FC, memo } from "react";
import { IProductionMultiplier } from "./types";

export const ProductionMultiplier: FC<IProductionMultiplier> = memo((props) => {
  return (
    <Stack direction="row">
      <Typography>(x</Typography>
      <Typography color="danger">{props.multiplier.toFixed(2)}</Typography>
      <Typography>)</Typography>
    </Stack>
  );
});
