import { Stack, Typography } from "@mui/joy";
import { FC, memo } from "react";
import { IProductionMultiplier } from "./types";

export const ProductionMultiplier: FC<IProductionMultiplier> = memo((props) => {
  return <Typography color="danger">x{props.multiplier.toFixed(2)}</Typography>;
});
