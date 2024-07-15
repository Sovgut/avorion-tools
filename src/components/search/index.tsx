import { Search } from "@mui/icons-material";
import {
  Box,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
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
import { useBreakpoint } from "~hooks/breakpoints";
import { serializeCommoditites } from "~utils/serialize-commodity";
import { serializeStations } from "~utils/serialize-station";
import { StationsList } from "./components/StationsList";
import { CommoditiesList } from "./components/CommoditiesList";

export const GlobalSearch: FC = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(String());
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const breakpoint = useBreakpoint();
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
      setStations([]);
      setCommodities([]);
      setOpen((pv) => !pv);
    }
  }, []);

  const onModalClose = useCallback(() => {
    setSearch(String());
    setStations([]);
    setCommodities([]);
    setOpen(false);
  }, []);

  const onModalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const processSearch = useCallback(
    (search: string) => {
      if (search.length === 0) {
        setStations([]);
        setCommodities([]);

        return;
      }

      {
        const array = serializeStations(
          Object.keys(INTL_STORAGE.STATION[intlContext.language])
        ).map((key) => ({
          key: INTL_STORAGE.STATION[intlContext.language][key],
          value: key,
        }));
        const found = array.filter((seller) =>
          seller.key.toLowerCase().includes(search.toLowerCase())
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
          commodity.key.toLowerCase().includes(search.toLowerCase())
        );

        setCommodities(found.map((commodity) => commodity.value));
      }
    },
    [intlContext.language, setStations, setCommodities]
  );

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearch(event.target.value);

      processSearch(event.target.value);
    },
    [processSearch]
  );

  const onFormSubmit: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      processSearch(search);
    },
    [search, processSearch]
  );

  return (
    <Fragment>
      <IconButton
        onClick={onModalOpen}
        variant="plain"
        color="neutral"
        sx={{ width: 32, height: 32 }}
      >
        <Search fontSize="small" />
      </IconButton>

      <Modal open={open} onClose={onModalClose}>
        <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
          <DialogTitle sx={{ pr: 2 }}>
            {intlContext.text("UI", "global-search")}
          </DialogTitle>
          <ModalClose onClick={onModalClose} />
          <Divider />

          <Stack direction="column">
            <Stack spacing={1}>
              <form onSubmit={onFormSubmit}>
                <Stack spacing={2}>
                  <Input
                    placeholder={`${intlContext.text(
                      "UI",
                      "stations"
                    )} & ${intlContext.text("UI", "commodities")}...`}
                    value={search}
                    onChange={onSearchChange}
                  />
                </Stack>
              </form>
            </Stack>

            <Box maxHeight={400} sx={{ overflowY: "auto" }}>
              <StationsList stations={stations} />
              <CommoditiesList commodities={commodities} />
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
});
