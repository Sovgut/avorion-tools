import { FC, memo, useContext } from "react";
import { ISearchCommodityStation } from "./types";
import { Stack, Typography } from "@mui/joy";
import { IntlContext } from "~contexts/intl";
import { LinkOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"
import { ButtonebleGrouble } from "~components/UI/ButtonebleGrouble/ButtonebleGrouble";
import { Copiable } from "~components/UI/Copiable/Copiable";
import { Buttoneble } from "~components/UI/Buttoneble/Buttoneble";
import { StationMetadata } from "~data/stations/metadata";
import { Station } from "~data/stations/enums";
import { useGlobalSearch } from "~components/search/hook/use-global-search";

export const SearchCommodityStation: FC<ISearchCommodityStation> = memo(
  (props) => {
    const intlContext = useContext(IntlContext);
    const globalSearch = useGlobalSearch();
    const navigate = useNavigate();

    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <ButtonebleGrouble>
          <Copiable value={intlContext.text("STATION", props.station)} />
          <Buttoneble onClick={() => window.open(StationMetadata[props.station].link, "_blank")}>
            <LinkOutlined />
          </Buttoneble>
          <Buttoneble onClick={() => {
            if (props.station !== Station.TurretFactorySupplier) {
              navigate(`/factories?station=${props.station}`)
              globalSearch.setOpen(false);
            }
          }}>
            <Typography level="title-md">
              {intlContext.text("STATION", props.station)}
            </Typography>
          </Buttoneble>
        </ButtonebleGrouble>
      </Stack>
    );
  }
);
