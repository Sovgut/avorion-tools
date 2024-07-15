import { CopyAll, Search } from "@mui/icons-material";
import {
  Alert,
  Badge,
  Box,
  Chip,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
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
import { CommodityMetadata } from "~data/commodities/metadata";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { IntlContext } from "~contexts/intl";
import { INTL_STORAGE } from "~contexts/intl/storage";
import { useBreakpoint } from "~hooks/breakpoints";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event";
import { serializeCommoditites } from "~utils/serialize-commodity";
import { serializeStations } from "~utils/serialize-station";

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

  const renderCommoditiesMetadata = useCallback(
    (type: Commodity) => {
      let dangerous = null;
      let illegal = null;

      if (CommodityMetadata[type].illegal) {
        illegal = (
          <Chip color="warning">
            {intlContext.text("UI", "illegal-cargo")}
          </Chip>
        );
      }

      if (CommodityMetadata[type].dangerous) {
        dangerous = (
          <Chip color="danger">
            {intlContext.text("UI", "dangerous-cargo")}
          </Chip>
        );
      }

      return (
        <Stack direction="column" spacing={2} sx={{marginTop: 1}}>
          {dangerous}
          {illegal}
        </Stack>
      );
    },
    [intlContext.language]
  );

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
        const found = array.filter((component) =>
          component.key.toLowerCase().includes(search.toLowerCase())
        );

        setCommodities(found.map((component) => component.value));
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

          <Stack direction="column" spacing={2}>
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
              {stations.length > 0 && (
                <Stack direction="column">
                  {stations.map((station) => (
                    <Box key={station}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography level="body-sm">
                          {intlContext.text("UI", "station")} /{" "}
                        </Typography>
                        <Link
                          href={StationMetadata[station].link}
                          color="primary"
                          target="_blank"
                          level="body-sm"
                          sx={{ width: "max-content" }}
                        >
                          {intlContext.text("STATION", station)}
                        </Link>
                        {!breakpoint.sm && (
                          <IconButton
                            size="sm"
                            title={intlContext.text("UI", "copy")}
                            onClick={copyOnMouseEvent(
                              intlContext.text("STATION", station)
                            )}
                          >
                            <CopyAll />
                          </IconButton>
                        )}
                      </Stack>
                      <Divider />
                    </Box>
                  ))}
                </Stack>
              )}

              {commodities.map((commodity) => (
                <Box key={commodity}>
                  <Stack>
                    {renderCommoditiesMetadata(commodity)}

                    <Stack
                      direction="column"
                      alignItems="left"
                      justifyContent="center"
                    >
                      {CommodityMetadata[commodity].stations.map((station) => (
                        <Stack
                          key={commodity + station}
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Stack direction="row" alignItems="center">
                            <Typography
                              level="body-sm"
                              sx={{ width: "max-content" }}
                            >
                              {intlContext.text("COMMODITY", commodity)}
                            </Typography>
                            {!breakpoint.sm && (
                              <IconButton
                                size="sm"
                                title={intlContext.text("UI", "copy")}
                                onClick={copyOnMouseEvent(
                                  intlContext.text("COMMODITY", commodity)
                                )}
                              >
                                <CopyAll />
                              </IconButton>
                            )}
                          </Stack>
                          <Typography level="body-sm">
                            {" "}
                            &gt; {intlContext.text("UI", "station")} /{" "}
                          </Typography>
                          <Link
                            href={StationMetadata[station].link}
                            color="primary"
                            target="_blank"
                            level="body-sm"
                            sx={{ width: "max-content" }}
                          >
                            {intlContext.text("STATION", station)}
                          </Link>
                          {!breakpoint.sm && (
                            <IconButton
                              size="sm"
                              title={intlContext.text("UI", "copy")}
                              onClick={copyOnMouseEvent(
                                intlContext.text("STATION", station)
                              )}
                            >
                              <CopyAll />
                            </IconButton>
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ))}
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
});
