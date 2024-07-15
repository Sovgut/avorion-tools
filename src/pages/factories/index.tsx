import { Box, Container, Link, Stack, Typography } from "@mui/joy";
import {
  FC,
  memo,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { IntlContext } from "~contexts/intl";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { IStationVariation } from "~data/stations/types";
import { serializeStation, serializeStations } from "~utils/serialize-station";

export const FactoriesPage: FC = memo(() => {
  const [searchParams] = useSearchParams();
  const [station, setStation] = useState<Station | null>(null);
  const intlContext = useContext(IntlContext);

  useLayoutEffect(() => {
    const stationKey = searchParams.get("station");

    if (stationKey) {
      const station = serializeStation(stationKey);

      setStation(station);
    }
  }, []);

  const getLeftNodes = useCallback(
    (variation: IStationVariation) => {
      return variation.ingredients.map(([ingredient]) => ({
        commodity: ingredient,
        stations: serializeStations(Object.keys(StationMetadata)).filter(
          (station) =>
            !!StationMetadata[station].variations.find((variation) =>
              !!variation.results.find(
                ([result]) => result === ingredient
              )
            )
        ),
      }));
    },
    [station]
  );

  const getRightNodes = useCallback(
    (variation: IStationVariation) => {
      return variation.results.map(([result]) => ({
        commodity: result,
        stations: serializeStations(Object.keys(StationMetadata)).filter(
          (station) =>
            !!StationMetadata[station].variations.find((variation) =>
              !!variation.ingredients.find(
                ([ingredient]) => ingredient === result
              )
            )
        ),
      }));
    },
    [station]
  );

  if (station === null) return null;

  return (
    <Container maxWidth={false} sx={{ pb: 2 }}>
      {StationMetadata[station].variations.map((variation, variationIndex) => {
        const leftNodes = getLeftNodes(variation);
        const rightNodes = getRightNodes(variation);

        return (
            <Box key={variationIndex} sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", pb: 3}}>
                <Stack>
                    {leftNodes.map((node) => node.stations.map((station, stationIndex) => (
                        <Link href={`/factories?station=${station}`} key={stationIndex}>{intlContext.text("STATION", station)} -&gt; {intlContext.text("COMMODITY", node.commodity)}</Link>
                    )))}
                </Stack>
                
                <Stack>
                    <Typography>{intlContext.text("STATION", station)}</Typography>
                    {variation.ingredients.map(([ingredient, count, isOptional], ingredientIndex) => (
                        <Typography key={ingredientIndex}>{intlContext.text("COMMODITY", ingredient)}: {count}{isOptional ? "*" : null}</Typography>
                    ))}

                    {variation.results.map(([result, count, isOptional], resultIndex) => (
                        <Typography key={resultIndex}>{intlContext.text("COMMODITY", result)}: {count}{isOptional ? "*" : null}</Typography>
                    ))}
                </Stack>

                <Stack>
                    {rightNodes.map((node) => node.stations.map((station, stationIndex) => (
                        <Link href={`/factories?station=${station}`} key={stationIndex}>{intlContext.text("COMMODITY", node.commodity)} -&gt; {intlContext.text("STATION", station)}</Link>
                    )))}
                </Stack>
            </Box>
        )
      })}
    </Container>
  );
});
