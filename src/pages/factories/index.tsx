import { Container, Stack } from "@mui/joy";
import { FC, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { serializeStation } from "~utils/serialize-station";
import { FactoryProvider } from "./provider";
import { FactoryReferences } from "./componets/FactoryReferences";
import { CurrentStation } from "./componets/CurrentStation";

export const FactoriesPage: FC = memo(() => {
  const [station, setStation] = useState<Station>(Station.Sector);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stationKey = searchParams.get("station");
    const variationKey = searchParams.get("variation");

    if (stationKey) {
      const station = serializeStation(stationKey);

      if ([Station.Sector, Station.Hideout, Station.Rift].includes(station)) {
        navigate("/factories?station=0");
      } else {
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
          <Stack sx={{ "&:empty": { display: "none" } }}>
            <FactoryReferences root="ingredients" reference="results" />
            <FactoryReferences root="consumables" reference="results" />
          </Stack>
          <CurrentStation />
          <Stack sx={{ "&:empty": { display: "none" } }}>
            <FactoryReferences root="results" reference="ingredients" />
            <FactoryReferences root="results" reference="consumables" />
          </Stack>
        </Stack>
      </Container>
    </FactoryProvider>
  );
});
