import {
  Box,
  Card,
  Container,
  Divider,
  Link,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import {
  FC,
  Fragment,
  memo,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { IntlContext } from "~contexts/intl";
import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { IStationVariation } from "~data/stations/types";
import { serializeStation, serializeStations } from "~utils/serialize-station";
import { Link as RouterLink } from "react-router-dom";
import { CommodityMetadata } from "~data/commodities/metadata";

export const FactoriesPage: FC = memo(() => {
  const [searchParams] = useSearchParams();
  const [station, setStation] = useState<Station | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    const stationKey = searchParams.get("station");

    if (stationKey) {
      const station = serializeStation(stationKey);

      setStation(station);
      setSelectedVariation(0);
    }
  }, [searchParams]);

  const getLeftNodes = useCallback(
    (commodity: Commodity) => {
      return serializeStations(Object.keys(StationMetadata))
        .filter(
          (station) =>
            !!StationMetadata[station].variations.find(
              (variation) =>
                !!variation.results.find(([result]) => result === commodity),
            ),
        )
        .map((station) => ({
          station,
          variations: StationMetadata[station].variations.filter(
            (variation) =>
              !!variation.results.find(([result]) => result === commodity),
          ),
        }));
    },
    [station],
  );

  const getRightNodes = useCallback((commodity: Commodity) => {
    return serializeStations(Object.keys(StationMetadata))
      .filter(
        (station) =>
          !!StationMetadata[station].variations.find(
            (variation) =>
              !!variation.ingredients.find(
                ([ingredient]) => ingredient === commodity,
              ),
          ),
      )
      .map((station) => ({
        station,
        variations: StationMetadata[station].variations.filter(
          (variation) =>
            !!variation.ingredients.find(
              ([ingredient]) => ingredient === commodity,
            ),
        ),
      }));
  }, []);

  const calculatePaybackCycles = useCallback((variation: IStationVariation) => {
    if (!variation.cost || !variation.profitPerCycle) return 0;

    return variation.cost / variation.profitPerCycle;
  }, []);

  const onVariationChange = useCallback(
    (_: SyntheticEvent | null, value: number | null) => {
      if (value === null) return;

      setSelectedVariation(value);
    },
    [],
  );

  if (station === null) return null;

  const variation = StationMetadata[station].variations[selectedVariation];

  return (
    <Container maxWidth="xl" sx={{ pb: 2 }}>
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "max-content auto max-content",
            columnGap: "2rem",
            pt: 2,
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "max-content auto",
              minHeight: "500px",
              height: "max-content",
              rowGap: "2rem",
            }}
          >
            {variation.ingredients.map(
              ([ingredient, count], ingredientIndex) => (
                <Fragment key={ingredientIndex}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    sx={{
                      width: "100%",
                    }}
                  >
                    {getLeftNodes(ingredient).map(({ station, variations }) => (
                      <Fragment key={station}>
                        {variations.map((leftVariation, leftVariationIndex) => (
                          <Card
                            key={leftVariationIndex}
                            data-node={`ingredient-${ingredient}`}
                          >
                            <Stack>
                              <Link
                                to={`/factories?station=${station}`}
                                component={RouterLink}
                              >
                                <Typography>
                                  {intlContext.text("STATION", station)}
                                </Typography>
                              </Link>
                              <Stack direction="column" spacing={1}>
                                <Stack direction="row" spacing={1}>
                                  <Typography color="neutral">
                                    {intlContext.text("UI", "produced")}:
                                  </Typography>
                                  <Typography>
                                    {
                                      leftVariation.results.find(
                                        ([commodity]) =>
                                          commodity === ingredient,
                                      )?.[1]
                                    }
                                  </Typography>
                                  <Typography>
                                    / {intlContext.text("UI", "cycle")}
                                  </Typography>
                                </Stack>
                                <Stack spacing={1} direction="row">
                                  <Typography>
                                    {intlContext.text("UI", "required")}:
                                  </Typography>
                                  <Typography
                                    color={
                                      count >=
                                      (leftVariation.results.find(
                                        ([commodity]) =>
                                          commodity === ingredient,
                                      )?.[1] ?? 0)
                                        ? "danger"
                                        : "success"
                                    }
                                  >
                                    {count}
                                  </Typography>
                                  <Typography>
                                    / {intlContext.text("UI", "cycle")}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Card>
                        ))}
                      </Fragment>
                    ))}
                  </Stack>
                  <Divider orientation="vertical">
                    <Typography
                      color="warning"
                      sx={{
                        p: 2,
                        transform: "rotate(-90deg)",
                        transition: "all 100ms ease-in-out",
                        "&:hover": { transform: "rotate(0deg)" },
                      }}
                    >
                      {intlContext.text("COMMODITY", ingredient)}
                    </Typography>
                  </Divider>
                </Fragment>
              ),
            )}
          </Box>
          <Card
            sx={{
              height: "max-content",
              wight: "max-content",
              display: "sticky",
            }}
            data-node={`${station}-${selectedVariation}`}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography level="h4">
                {intlContext.text("STATION", station)}
              </Typography>
              <Select
                placeholder="Variation..."
                value={selectedVariation}
                onChange={onVariationChange}
              >
                {StationMetadata[station].variations.map((_, index) => (
                  <Option key={index} value={index}>
                    {intlContext.text("STATION", station)} #{index}
                  </Option>
                ))}
              </Select>
            </Stack>

            <Divider>{intlContext.text("UI", "info")}</Divider>

            {variation.cost && (
              <Stack direction="row" spacing={1}>
                <Typography>{intlContext.text("UI", "cost")}:</Typography>
                <Typography color="success">
                  {variation.cost?.toLocaleString()}
                </Typography>
              </Stack>
            )}

            {variation.profitPerCycle && (
              <Stack>
                <Stack direction="row" spacing={1}>
                  <Typography>{intlContext.text("UI", "profit")}:</Typography>
                  <Stack direction="row">
                    <Typography color="success">
                      {variation.profitPerCycle?.toLocaleString()}
                    </Typography>
                    <Typography>/{intlContext.text("UI", "cycle")}</Typography>
                  </Stack>
                </Stack>
                <Typography level="body-xs">
                  {intlContext.text("UI", "profit-hint")}
                </Typography>
              </Stack>
            )}

            {variation.cost && (
              <Stack>
                <Stack direction="row" spacing={1}>
                  <Typography>
                    {intlContext.text("UI", "required-cargo")}:
                  </Typography>
                  <Typography color="success">
                    {variation.requiredPC?.toLocaleString()}
                  </Typography>
                </Stack>
                <Typography level="body-xs">
                  {intlContext.text("UI", "required-cargo-hint")}
                </Typography>
              </Stack>
            )}

            {variation.ROICycles && (
              <Stack>
                <Stack direction="row" spacing={1}>
                  <Typography>
                    {intlContext.text("UI", "roi-cycles")}:
                  </Typography>
                  <Typography color="success">
                    {parseInt(
                      calculatePaybackCycles(variation).toString(),
                      10,
                    ).toLocaleString()}
                  </Typography>
                </Stack>
                <Typography level="body-xs">
                  {intlContext.text("UI", "roi-cycles-hint")}
                </Typography>
              </Stack>
            )}

            {variation.ingredients.length > 0 && (
              <Divider>{intlContext.text("UI", "ingredients")}</Divider>
            )}
            {variation.ingredients.map(
              ([ingredient, count, isOptional], ingredientIndex) => (
                <Fragment key={ingredientIndex}>
                  <Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Typography
                        color="neutral"
                        data-node={`commodity-${ingredient}`}
                      >
                        {intlContext.text("COMMODITY", ingredient)}:
                      </Typography>
                      <Typography>{count}</Typography>
                      <Typography color="success">
                        (¢{CommodityMetadata[ingredient].price})
                      </Typography>
                    </Stack>
                    {isOptional && (
                      <Typography level="body-xs" color="warning">
                        {intlContext.text("UI", "ingredient-optional-hint")}
                      </Typography>
                    )}
                  </Stack>
                </Fragment>
              ),
            )}

            {variation.results.length > 0 && (
              <Divider>{intlContext.text("UI", "results")}</Divider>
            )}
            {variation.results.map(
              ([result, count, isOptional], resultIndex) => (
                <Fragment key={resultIndex}>
                  <Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Typography
                        color="neutral"
                        data-node={`commodity-${result}`}
                      >
                        {intlContext.text("COMMODITY", result)}:
                      </Typography>
                      <Typography>{count}</Typography>
                      <Typography color="success">
                        (¢{CommodityMetadata[result].price})
                      </Typography>
                    </Stack>
                    {isOptional && (
                      <Typography level="body-xs" color="warning">
                        {intlContext.text("UI", "result-optional-hint")}
                      </Typography>
                    )}
                  </Stack>
                </Fragment>
              ),
            )}
          </Card>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "max-content auto",
              minHeight: "500px",
              height: "max-content",
              rowGap: "2rem",
            }}
          >
            {variation.results.map(([result, count], resultIndex) => (
              <Fragment key={resultIndex}>
                <Divider orientation="vertical">
                  <Typography
                    color="warning"
                    sx={{
                      p: 2,
                      transform: "rotate(90deg)",
                      transition: "all 100ms ease-in-out",
                      "&:hover": { transform: "rotate(0deg)" },
                    }}
                  >
                    {intlContext.text("COMMODITY", result)}
                  </Typography>
                </Divider>
                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{
                    width: "100%",
                  }}
                >
                  {getRightNodes(result).map(({ station, variations }) => (
                    <Fragment key={station}>
                      {variations.map((rightVariation, rightVariationIndex) => (
                        <Card
                          key={rightVariationIndex}
                          data-node={`ingredient-${result}`}
                        >
                          <Stack>
                            <Link
                              to={`/factories?station=${station}`}
                              component={RouterLink}
                            >
                              <Typography>
                                {intlContext.text("STATION", station)}
                              </Typography>
                            </Link>
                            <Stack direction="column" spacing={1}>
                              <Stack direction="row" spacing={1}>
                                <Typography color="neutral">
                                  {intlContext.text("UI", "required")}:
                                </Typography>
                                <Typography>
                                  {
                                    rightVariation.ingredients.find(
                                      ([commodity]) => commodity === result,
                                    )?.[1]
                                  }
                                </Typography>
                                <Typography>
                                  / {intlContext.text("UI", "cycle")}
                                </Typography>
                              </Stack>
                              <Stack spacing={1} direction="row">
                                <Typography>
                                  {intlContext.text("UI", "produced")}:
                                </Typography>
                                <Typography
                                  color={
                                    count >=
                                    (rightVariation.ingredients.find(
                                      ([commodity]) => commodity === result,
                                    )?.[1] ?? 0)
                                      ? "success"
                                      : "danger"
                                  }
                                >
                                  {count}
                                </Typography>
                                <Typography>
                                  / {intlContext.text("UI", "cycle")}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Card>
                      ))}
                    </Fragment>
                  ))}
                </Stack>
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
});
