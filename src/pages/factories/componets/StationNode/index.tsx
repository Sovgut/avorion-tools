import { Box, Link, Stack, Tooltip, Typography } from "@mui/joy";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Link as RouterLink } from "react-router-dom";
import { IntlContext } from "~contexts/intl";
import { IStationNode } from "./types";
import { useFactory } from "~pages/factories/hook/use-factory";

export const StationNode: FC<IStationNode> = memo((props) => {
  const [showIndex, setShowIndex] = useState(false);

  const intlContext = useContext(IntlContext);
  const factory = useFactory();
  const { type: commodity, amount } = props.stationCommodity;

  const nodeCommodity = useMemo(() => {
    return props.nodeCommodities.find(
      ({ type: nodeCommodity }) => nodeCommodity === commodity,
    );
  }, [commodity, props.nodeCommodities]);

  const onShowIndex = useCallback(() => {
    setShowIndex(true);
  }, []);

  const onHideIndex = useCallback(() => {
    setShowIndex(false);
  }, []);

  if (!nodeCommodity) return null;

  const ingredientsColor = !Number.isFinite(nodeCommodity.amount)
    ? "success"
    : nodeCommodity.amount === amount
      ? "warning"
      : nodeCommodity.amount < amount
        ? "success"
        : "danger";

  const resultsColor = !Number.isFinite(amount)
    ? "success"
    : nodeCommodity.amount === amount
      ? "warning"
      : nodeCommodity.amount > amount
        ? "success"
        : "danger";

  if (props.direction === "ingredients") {
    return (
      <Fragment>
        <td>
          <Stack direction="row">
            <Typography color={ingredientsColor}>{amount}</Typography>
            <Typography>
              /
              {Number.isFinite(nodeCommodity.amount)
                ? nodeCommodity.amount
                : "?"}
            </Typography>
          </Stack>
        </td>
        <td>
          <Tooltip
            variant="outlined"
            title={
              <Stack spacing={1}>
                <Box>
                  <Typography color="neutral">
                    {intlContext.text("STATION", factory.station)}
                  </Typography>
                  <Stack>
                    <Typography>
                      └ {intlContext.text("UI", "results")}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ paddingLeft: "1rem" }}
                    >
                      <Typography>
                        └ {intlContext.text("COMMODITY", commodity)}:
                      </Typography>
                      <Stack direction="row" spacing={0.25}>
                        <Typography color={ingredientsColor}>
                          {amount}
                        </Typography>
                        <Typography color="neutral">/</Typography>
                        <Typography>
                          {intlContext.text("UI", "cycle").toLowerCase()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
                <Box>
                  <Typography color="neutral">
                    {intlContext.text("STATION", props.station)}
                  </Typography>
                  <Stack>
                    <Typography>
                      └ {intlContext.text("UI", "ingredients")}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ paddingLeft: "1rem" }}
                    >
                      <Typography>
                        └ {intlContext.text("COMMODITY", commodity)}:
                      </Typography>
                      <Stack direction="row" spacing={0.25}>
                        <Typography color="primary">
                          {Number.isFinite(nodeCommodity.amount)
                            ? nodeCommodity.amount
                            : "?"}
                        </Typography>
                        <Typography color="neutral">/</Typography>
                        <Typography>
                          {intlContext.text("UI", "cycle").toLowerCase()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            }
            placement="left"
          >
            <Link
              to={`/factories?station=${props.station}&variation=${props.nodeVariationIndex}`}
              component={RouterLink}
            >
              <Typography onMouseEnter={onShowIndex} onMouseLeave={onHideIndex}>
                {intlContext.text("STATION", props.station)}
                <Typography
                  color="neutral"
                  sx={{
                    textDecoration: "none",
                    pl: 1,
                    opacity: showIndex ? 1 : 0,
                    transition: "opacity 200ms ease",
                  }}
                >
                  #{props.nodeVariationIndex + 1}
                </Typography>
              </Typography>
            </Link>
          </Tooltip>
        </td>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <td>
        <Stack direction="row">
          <Typography color={resultsColor}>{nodeCommodity.amount}</Typography>
          <Typography>/{Number.isFinite(amount) ? amount : "?"}</Typography>
        </Stack>
      </td>
      <td>
        <Tooltip
          variant="outlined"
          title={
            <Stack spacing={1}>
              <Box>
                <Typography color="neutral">
                  {intlContext.text("STATION", factory.station)}
                </Typography>
                <Stack>
                  <Typography>
                    └ {intlContext.text("UI", "ingredients")}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ paddingLeft: "1rem" }}
                  >
                    <Typography>
                      └ {intlContext.text("COMMODITY", commodity)}:
                    </Typography>
                    <Stack direction="row" spacing={0.25}>
                      <Typography color="primary">
                        {Number.isFinite(amount) ? amount : "?"}
                      </Typography>
                      <Typography color="neutral">/</Typography>
                      <Typography>
                        {intlContext.text("UI", "cycle").toLowerCase()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box>
                <Typography color="neutral">
                  {intlContext.text("STATION", props.station)}
                </Typography>
                <Stack>
                  <Typography>└ {intlContext.text("UI", "results")}</Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ paddingLeft: "1rem" }}
                  >
                    <Typography>
                      └ {intlContext.text("COMMODITY", commodity)}:
                    </Typography>
                    <Stack direction="row" spacing={0.25}>
                      <Typography color={resultsColor}>
                        {nodeCommodity.amount}
                      </Typography>
                      <Typography color="neutral">/</Typography>
                      <Typography>
                        {intlContext.text("UI", "cycle").toLowerCase()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          }
          placement="right"
        >
          <Link
            to={`/factories?station=${props.station}&variation=${props.nodeVariationIndex}`}
            component={RouterLink}
          >
            <Typography onMouseEnter={onShowIndex} onMouseLeave={onHideIndex}>
              {intlContext.text("STATION", props.station)}
              <Typography
                color="neutral"
                sx={{
                  textDecoration: "none",
                  pl: 1,
                  opacity: showIndex ? 1 : 0,
                  transition: "opacity 200ms ease",
                }}
              >
                #{props.nodeVariationIndex + 1}
              </Typography>
            </Typography>
          </Link>
        </Tooltip>
      </td>
    </Fragment>
  );
});
