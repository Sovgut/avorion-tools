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
import { IntlContext } from "~contexts/intl";
import { INTL_STORAGE } from "~contexts/intl/storage";
import { serializeCommoditites } from "~utils/serialize-commodity";
import { CommoditiesList } from "./components/CommoditiesList";
import { useGlobalSearch } from "./hook/use-global-search";
import { CommodityMetadata } from "~data/commodities/metadata";

export const GlobalSearch: FC = memo(() => {
  const [search, setSearch] = useState<string>(String());
  const [commodities, setCommodities] = useState<Commodity[]>(
    serializeCommoditites(Object.keys(Commodity)),
  );
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
    }

    if (event.key === "Escape") {
      setSearch(String());
      globalSearch.setOpen(false);
    }
  }, []);

  const onModalClose = useCallback(() => {
    setSearch(String());
    globalSearch.setOpen(false);
  }, []);

  const onModalOpen = useCallback(() => {
    globalSearch.setOpen(true);
  }, []);

  const processSearch = useCallback(
    (value: string) => {
      if (value.length === 0) {
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
        const commodities = Object.keys(CommodityMetadata).map(Number) as Commodity[];
        const foundCommodity = commodities.filter((commodity) =>
          INTL_STORAGE.COMMODITY[intlContext.language][commodity]
            .toLowerCase()
            .includes(value.toLowerCase())
        );

        const foundCommodityStations = commodities.filter((commodity) => {
          const result = CommodityMetadata[commodity].stations.some((station) => {
            const result = INTL_STORAGE.STATION[intlContext.language][station]
              .toLowerCase()
              .includes(value.toLowerCase())

            if (result) {
              console.log(
              `Searching for commodity ${INTL_STORAGE.COMMODITY[intlContext.language][commodity]} in station ${INTL_STORAGE.STATION[intlContext.language][station]} with ${value}: ${result}`,)
            }

            return result;
          });

          return result;
        });

        const uniqueValue = new Set([
          ...foundCommodity,
          ...foundCommodityStations,
        ])

        setCommodities(Array.from(uniqueValue));
      }
    },
    [intlContext.language, setCommodities, search],
  );

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearch(event.target.value);

      processSearch(event.target.value);
    },
    [processSearch],
  );

  return (
    <Fragment>
      <Input
        onClick={onModalOpen}
        color="neutral"
        variant="soft"
        placeholder={`${intlContext.text(
          "UI",
          "stations",
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
            commodities.length === 0 && onModalClose()
          }
        >
          <Stack direction="row" sx={{ height: "100%" }}>
            <Box
              sx={{ height: "100%", width: "100%", p: 1, overflowY: "auto" }}
            >
              <CommoditiesList commodities={commodities} />
            </Box>
          </Stack>
        </Box>
      )}
    </Fragment>
  );
});
