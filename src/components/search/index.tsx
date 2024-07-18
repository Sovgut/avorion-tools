import { Search } from "@mui/icons-material";
import { Box, Input, Stack } from "@mui/joy";
import {
  ChangeEventHandler,
  FC,
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";
import { IntlContext } from "~contexts/intl";
import { INTL_STORAGE } from "~contexts/intl/storage";
import { serializeCommoditites } from "~utils/serialize-commodity";
import { serializeStations } from "~utils/serialize-station";
import { StationsList } from "./components/StationsList";
import { CommoditiesList } from "./components/CommoditiesList";
import { useGlobalSearch } from "./hook/use-global-search";

export const GlobalSearch: FC = memo(() => {
  const [search, setSearch] = useState<string>(String());
  const [commodities, setCommodities] = useState<Commodity[]>(serializeCommoditites(Object.keys(Commodity)));
  const [stations, setStations] = useState<Station[]>(serializeStations(Object.keys(Station)));
  const globalSearch = useGlobalSearch();
  const intlContext = useContext(IntlContext);

  useEffect(() => {
    window.addEventListener("keydown", onShortcut);

    return function cleanup() {
      window.removeEventListener("keydown", onShortcut);
    };
  }, []);

  const onShortcut: EventListener = useCallback((event: any) => {
    if (event.key === "F2") {
      setSearch(String());
      globalSearch.setOpen((pv) => !pv);
      toggleLayoutScroll(true);
    }

    if (event.key === "Escape") {
      setSearch(String());
      globalSearch.setOpen(false);
      toggleLayoutScroll(true);
    }
  }, []);

  const onModalClose = useCallback(() => {
    setSearch(String());
    globalSearch.setOpen(false);
    toggleLayoutScroll(true);
  }, []);

  const onModalOpen = useCallback(() => {
    globalSearch.setOpen(true);
    toggleLayoutScroll(false);
  }, []);

  const toggleLayoutScroll = useCallback((state: boolean) => {
    const layout = document.getElementById("layout");

    if (layout) {
      if (state) {
        layout.style.maxHeight = "auto";
        layout.style.overflowY = "auto";
      } else {
        layout.style.maxHeight = "100vh";
        layout.style.overflowY = "hidden";
      }
    }
  }, []);

  const processSearch = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setStations(serializeStations(Object.keys(Station)));
        setCommodities(serializeCommoditites(Object.keys(Commodity)));

        if (value !== search) {
          globalSearch.setOpen(false);
        }

        return;
      } else {
        if (value.length > 0) {
          globalSearch.setOpen(true);
        }
      }

      {
        const array = serializeStations(
          Object.keys(INTL_STORAGE.STATION[intlContext.language])
        ).map((key) => ({
          key: INTL_STORAGE.STATION[intlContext.language][key],
          value: key,
        }));
        const found = array.filter((station) =>
          station.key.toLowerCase().includes(value.toLowerCase())
        );

        setStations(found.map((seller) => seller.value));
      }

      {
        const array = serializeCommoditites(
          Object.keys(INTL_STORAGE.COMMODITY[intlContext.language])
        ).map((key) => ({
          key: INTL_STORAGE.COMMODITY[intlContext.language][key],
          value: key,
        }));
        const found = array.filter((commodity) =>
          commodity.key.toLowerCase().includes(value.toLowerCase())
        );

        setCommodities(found.map((commodity) => commodity.value));
      }
    },
    [intlContext.language, setStations, setCommodities, search]
  );

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearch(event.target.value);

      processSearch(event.target.value);
    },
    [processSearch]
  );

  return (
    <Fragment>
      <Input
        onClick={onModalOpen}
        color="neutral"
        variant="soft"
        placeholder={`${intlContext.text(
          "UI",
          "stations"
        )} & ${intlContext.text("UI", "commodities")}...`}
        endDecorator={<Search fontSize="small" />}
        value={search}
        onChange={onSearchChange}
      />

      {globalSearch.open && (
        <Box
          component="div"
          sx={{
            height: "calc(100% - 68px)",
            width: "100%",
            background: "rgb(16 17 20)",
            position: "fixed",
            left: -16,
            top: "68px",
            zIndex: 9999,
          }}
          onClick={() =>
            commodities.length === 0 && stations.length === 0 && onModalClose()
          }
        >
          <Stack direction="row" sx={{ height: "100%" }}>
            <Box
              sx={{ height: "100%", width: "100%", p: 1, overflowY: "auto" }}
            >
              <CommoditiesList commodities={commodities} />
            </Box>
            <Box
              sx={{ height: "100%", width: "100%", p: 1, overflowY: "auto" }}
            >
              <StationsList stations={stations} />
            </Box>
          </Stack>
        </Box>
      )}
    </Fragment>
  );
});
