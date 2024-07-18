import {
  Box,
  Card,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import {
  FC,
  Fragment,
  memo,
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
import { IStationCommodity } from "~data/stations/types";
import { serializeStation, serializeStations } from "~utils/serialize-station";
import { Link as RouterLink } from "react-router-dom";

export const FactoriesPage: FC = memo(() => {
  const [searchParams] = useSearchParams();
  const [station, setStation] = useState<Station | null>(null);
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    const stationKey = searchParams.get("station");

    if (stationKey) {
      const station = serializeStation(stationKey);

      setStation(station);
    }
  }, [searchParams]);

  const getLeftNodes = useCallback(
    (commodity: Commodity) => {
      return serializeStations(Object.keys(StationMetadata))
        .filter(
          (station) =>
            !!StationMetadata[station].variations.find(
              (variation) =>
                !!variation.results.find(([result]) => result === commodity)
            )
        )
        .map((station) => ({
          station,
          variations: StationMetadata[station].variations.filter(
            (variation) =>
              !!variation.results.find(([result]) => result === commodity)
          ),
        }));
    },
    [station]
  );

  const getRightNodes = useCallback(
    (commodity: Commodity) => {
      return serializeStations(Object.keys(StationMetadata))
        .filter(
          (station) =>
            !!StationMetadata[station].variations.find(
              (variation) =>
                !!variation.ingredients.find(
                  ([ingredient]) => ingredient === commodity
                )
            )
        )
        .map((station) => ({
          station,
          variations: StationMetadata[station].variations.filter(
            (variation) =>
              !!variation.ingredients.find(
                ([ingredient]) => ingredient === commodity
              )
          ),
        }));
    },
    [station]
  );

  const calculateProcessResultLine = useCallback(
    (
      commodity: Commodity,
      count: number,
      nodeCommodities: IStationCommodity[]
    ) => {
      const nodeCommodity = nodeCommodities.find(
        ([nodeCommodity]) => nodeCommodity === commodity
      );

      if (!nodeCommodity) return 1;

      return count / nodeCommodity[1];
    },
    []
  );

  const calculateProcessIngredientLine = useCallback(
    (
      commodity: Commodity,
      count: number,
      nodeCommodities: IStationCommodity[]
    ) => {
      const nodeCommodity = nodeCommodities.find(
        ([nodeCommodity]) => nodeCommodity === commodity
      );

      if (!nodeCommodity) return 1;

      return count / nodeCommodity[1];
    },
    []
  );

  if (station === null) return null;

  return (
    <Container maxWidth={false} sx={{ pb: 2 }}>
      {StationMetadata[station].variations.map((variation, variationIndex) => {
        return (
          <Box key={variationIndex}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "128px",
                pt: 2,
                pb: 2,
              }}
            >
              <Stack
                direction="column"
                sx={{ height: "100%" }}
              >
                {variation.ingredients.map(
                  ([ingredient, count], ingredientIndex) => (
                    <Stack key={ingredientIndex}>
                      {getLeftNodes(ingredient).map(
                        ({ station, variations }) => (
                          <Fragment key={station}>
                            {variations.map(
                              (leftVariation, leftVariationIndex) => (
                                <Card
                                  key={leftVariationIndex}
                                  data-node={`result-${ingredient}`}
                                >
                                  <Link
                                    to={`/factories?station=${station}`}
                                    component={RouterLink}
                                  >
                                    {intlContext.text("STATION", station)} -&gt;{" "}
                                    {intlContext.text("COMMODITY", ingredient)}{" "}
                                    (x
                                    {calculateProcessResultLine(
                                      ingredient,
                                      count,
                                      leftVariation.results
                                    ).toFixed(2)}
                                    )
                                  </Link>
                                </Card>
                              )
                            )}
                          </Fragment>
                        )
                      )}
                    </Stack>
                  )
                )}
              </Stack>
              <Card
                sx={{ height: "max-content", wight: "max-content" }}
                data-node={`${station}-${variationIndex}`}
              >
                <Typography level="h4">
                  {intlContext.text("STATION", station)}
                </Typography>
                <Typography>
                  Cost: {variation.cost}
                </Typography>
                <Typography>
                  Profit: {variation.profitPerCycle} / cycle
                </Typography>
                <Typography>
                  Payback Cycles: {variation.ROICycles}
                </Typography>
                <Typography level="h4">
                  {intlContext.text("STATION", station)}
                </Typography>

                {variation.ingredients.length > 0 && <Divider>Ingredients</Divider>}
                {variation.ingredients.map(
                  ([ingredient, count, isOptional], ingredientIndex, array) => (
                    <Fragment key={ingredientIndex}>
                      <Typography
                        color={isOptional ? "warning" : "neutral"}
                        data-node={`commodity-${ingredient}`}
                      >
                        {intlContext.text("COMMODITY", ingredient)}: {count}
                      </Typography>
                      {ingredientIndex !== array.length - 1 && <Divider />}
                    </Fragment>
                  )
                )}

                {variation.results.length > 0 && <Divider>Results</Divider>}
                {variation.results.map(
                  ([result, count, isOptional], resultIndex, array) => (
                    <Fragment key={resultIndex}>
                      <Typography
                        color={isOptional ? "warning" : "neutral"}
                        data-node={`commodity-${result}`}
                      >
                        {intlContext.text("COMMODITY", result)}: {count}
                      </Typography>
                      {resultIndex !== array.length - 1 && <Divider />}
                    </Fragment>
                  )
                )}
              </Card>
              <Stack
                direction="column"
                sx={{ height: "100%" }}
              >
                {variation.results.map(([result, count], resultIndex) => (
                  <Stack
                    key={resultIndex}
                    direction="column"
                    justifyContent="center"
                    sx={{
                      "&:empty": {
                        display: "none",
                      },
                    }}
                  >
                    {getRightNodes(result).map(({ station, variations }) => (
                      <Fragment key={station}>
                        {variations.map(
                          (rightVariation, rightVariationIndex) => (
                            <Card
                              key={rightVariationIndex}
                              data-node={`ingredient-${result}`}
                            >
                              <Link
                                to={`/factories?station=${station}`}
                                component={RouterLink}
                              >
                                {intlContext.text("COMMODITY", result)} (x
                                {calculateProcessIngredientLine(
                                  result,
                                  count,
                                  rightVariation.ingredients
                                ).toFixed(2)}
                                ) -&gt; {intlContext.text("STATION", station)}
                              </Link>
                            </Card>
                          )
                        )}
                      </Fragment>
                    ))}
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Container>
  );
});
