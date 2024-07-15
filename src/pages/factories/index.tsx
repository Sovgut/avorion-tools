import { Box, Container, Divider, Link, Stack, Typography } from "@mui/joy";
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
import { IStationCommodity, IStationVariation } from "~data/stations/types";
import { serializeStation, serializeStations } from "~utils/serialize-station";

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
    (commodity: Commodity, count: number, nodeCommodities: IStationCommodity[]) => {
      const nodeCommodity = nodeCommodities.find(([nodeCommodity]) => nodeCommodity === commodity);

      if (!nodeCommodity) return 1;

      return count < nodeCommodity[1] ? 1 : Math.ceil(count / nodeCommodity[1])
    },
    []
  );

  const calculateProcessIngredientLine = useCallback(
    (commodity: Commodity, count: number, nodeCommodities: IStationCommodity[]) => {
      const nodeCommodity = nodeCommodities.find(([nodeCommodity]) => nodeCommodity === commodity);

      if (!nodeCommodity) return 1;

      return count > nodeCommodity[1] ? Math.floor(count / nodeCommodity[1]) : Math.floor(nodeCommodity[1] / count)
    },
    []
  );

  if (station === null) return null;

  return (
    <Container maxWidth={false} sx={{ pb: 2 }}>
      {StationMetadata[station].variations.map((variation, variationIndex) => {
        return (
          <Box key={variationIndex}>
            <Stack>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Box />
                <Typography level="h4">
                  {intlContext.text("STATION", station)}
                </Typography>
                <Box />
              </Box>

              {variation.ingredients.length > 0 && (
                <Box
                  sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
                >
                  <Box />
                  <Typography sx={{ mt: 3 }}>Ingredients</Typography>
                  <Box />
                </Box>
              )}
              {variation.ingredients.map(
                ([ingredient, count, isOptional], ingredientIndex) => (
                  <Box key={ingredientIndex}>
                    <Divider />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        pb: 1,
                      }}
                    >
                      <Stack>
                        {getLeftNodes(ingredient).map(
                          ({ station, variations }) => (
                            <Fragment key={station}>
                              {variations.map(
                                (leftVariation, leftVariationIndex) => (
                                  <Link
                                    href={`/factories?station=${station}`}
                                    key={leftVariationIndex}
                                  >
                                    {intlContext.text("STATION", station)} -&gt;{" "}
                                    {intlContext.text("COMMODITY", ingredient)}{" "}
                                    (x{calculateProcessResultLine(ingredient, count, leftVariation.results)})
                                  </Link>
                                )
                              )}
                            </Fragment>
                          )
                        )}
                      </Stack>
                      <Typography
                        key={ingredientIndex}
                        color={isOptional ? "warning" : "neutral"}
                      >
                        {intlContext.text("COMMODITY", ingredient)}: {count}
                      </Typography>
                      <Box />
                    </Box>
                  </Box>
                )
              )}

              {variation.results.length > 0 && (
                <Box
                  sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
                >
                  <Box />
                  <Typography sx={{ mt: 3 }}>Results</Typography>
                  <Box />
                </Box>
              )}
              {variation.results.map(
                ([result, count, isOptional], resultIndex) => (
                  <Box key={resultIndex}>
                    <Divider />
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        pb: 1,
                      }}
                    >
                      <Box />
                      <Typography color={isOptional ? "warning" : "neutral"}>
                        {intlContext.text("COMMODITY", result)}: {count}
                      </Typography>
                      <Stack>
                        {getRightNodes(result).map(
                          ({ station, variations }) => (
                            <Fragment key={station}>
                              {variations.map(
                                (leftVariation, leftVariationIndex) => (
                                  <Link
                                    href={`/factories?station=${station}`}
                                    key={leftVariationIndex}
                                  >
                                    {intlContext.text("STATION", station)} -&gt;{" "}
                                    {intlContext.text("COMMODITY", result)} (x{calculateProcessIngredientLine(result, count, leftVariation.ingredients)})
                                  </Link>
                                )
                              )}
                            </Fragment>
                          )
                        )}
                      </Stack>
                    </Box>
                  </Box>
                )
              )}
            </Stack>
          </Box>
        );
      })}
    </Container>
  );
});
