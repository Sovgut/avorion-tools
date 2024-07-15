import { Container } from "@mui/joy";
import { FC, memo, useContext, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IntlContext } from "~contexts/intl";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { serializeStation } from "~utils/serialize-station";

export const FactoriesPage: FC = memo(() => {
    const [searchParams] = useSearchParams();
    const [station, setStation] = useState<Station | null>(null);
    const intlContext = useContext(IntlContext);

    useLayoutEffect(() => {
        const stationKey = searchParams.get("station")

        if (stationKey) {
            const station = serializeStation(stationKey);

            setStation(station);
        }
    }, []);

    if (station === null) return null;
    
    const metadata = StationMetadata[station];

    return (
        <Container maxWidth={false} sx={{pb: 2}}>
            {intlContext.text("STATION", station)}
            {metadata.variations[0].cost}
        </Container>
    )
})