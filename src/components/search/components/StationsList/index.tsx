import { FC, memo, useCallback, useContext } from "react";
import { type ISearchStationsList } from "./types";
import { Stack, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { LinkOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { useGlobalSearch } from "~components/search/hook/use-global-search";
import { ButtonebleGrouble } from "~components/UI/ButtonebleGrouble/ButtonebleGrouble";
import { Copiable } from "~components/UI/Copiable/Copiable";
import { Buttoneble } from "~components/UI/Buttoneble/Buttoneble";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";

export const StationsList: FC<ISearchStationsList> = memo((props) => {
  const globalSearch = useGlobalSearch();
  const intlContext = useContext(IntlContext);
  const navigate = useNavigate();

  const onNavigate = useCallback((station: Station) => {
    navigate(`/factories?station=${station}`)
    globalSearch.setOpen(false);
  }, [globalSearch.setOpen, navigate]);

  if (props.stations.length === 0) return null;

  return (
    <Stack spacing={2}>
      {props.stations.map((station) => (
        <ButtonebleGrouble  key={station}>
          <Copiable value={intlContext.text("STATION", station)} />
          <Buttoneble onClick={() => window.open(StationMetadata[station].link, "_blank")}>
            <LinkOutlined />
          </Buttoneble>
          <Buttoneble onClick={() => onNavigate(station)}>
            <Typography level="title-md">
              {intlContext.text("STATION", station)}
            </Typography>
          </Buttoneble>
        </ButtonebleGrouble>
      ))}
    </Stack>
  );
});
