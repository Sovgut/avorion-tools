import { Container, Stack } from "@mui/joy";
import { FC, memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { serializeStation } from "~utils/serialize-station";
import { FactoryProvider } from "./provider";
import { FactoryReferences } from "./componets/FactoryReferences";
import { CurrentStation } from "./componets/CurrentStation";

export const FactoriesPage: FC = memo(() => {
  const [searchParams] = useSearchParams();
  const [station, setStation] = useState<Station>(Station.Sector);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);

  useEffect(() => {
    const stationKey = searchParams.get("station");
    const variationKey = searchParams.get("variation");

    if (stationKey) {
      const station = serializeStation(stationKey);

      setStation(station);

      if (
        variationKey &&
        Number(variationKey) < StationMetadata[station].variations.length
      ) {
        setSelectedVariation(Number(variationKey));
      } else {
        setSelectedVariation(0);
      }
    }
  }, [searchParams]);

  if (station === null) return null;
  if (station === Station.Sector) return null;

  return (
    <FactoryProvider
      station={station}
      stationVariationIndex={selectedVariation}
      setStation={setStation}
      setStationVariation={setSelectedVariation}
    >
      <Container maxWidth="xl" sx={{ pb: 2, pt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <FactoryReferences direction="results" />
          <CurrentStation />
          <FactoryReferences direction="ingredients" />
        </Stack>
      </Container>
    </FactoryProvider>
  );
});
