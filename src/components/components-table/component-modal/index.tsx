import {
  Box,
  Button,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { FormEvent, Fragment, useContext, useState } from "react";
import { useBreakpoint } from "~hooks/breakpoints";
import { IntlContext } from "~contexts/intl";
import { AccountTree, Add, CopyAll } from "@mui/icons-material";
import { copyOnMouseEvent } from "~utils/copy-on-mouse-event.ts";
import { Numeric } from "~components/numeric";
import { MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY } from "~constants/common.ts";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { Station } from "~data/stations/enums";
import { StationMetadata } from "~data/stations/metadata";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  open: boolean;
  title: string;
  type: Commodity;

  onClose?: () => void;
  onSubmit?: (value: number) => void;
};

export function ComponentItemModal({
  open,
  title,
  type,
  onClose,
  onSubmit,
}: Props) {
  const breakpoint = useBreakpoint();
  const intlContext = useContext(IntlContext);
  const [cargoInput, setCargoInput] = useState(MIN_CARGO_QUANTITY);

  let dangerous = null;
  let illegal = null;

  if (CommodityMetadata[type].illegal) {
    illegal = (
      <Typography color="warning" level="body-sm">
        {intlContext.text("UI", "illegal-cargo")}
      </Typography>
    );
  }

  if (CommodityMetadata[type].dangerous) {
    dangerous = (
      <Typography color="danger" level="body-sm">
        {intlContext.text("UI", "dangerous-cargo")}
      </Typography>
    );
  }

  function onCargoChange(_id: string, value: string | null) {
    setCargoInput(Number(value));
  }

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit?.(cargoInput);
    setCargoInput(MIN_CARGO_QUANTITY);
  }

  function onModalSubmit() {
    onSubmit?.(cargoInput);
    setCargoInput(MIN_CARGO_QUANTITY);
  }

  function onModalClose() {
    onClose?.();
    setCargoInput(MIN_CARGO_QUANTITY);
  }

  return (
    <Modal open={open} onClose={onModalClose}>
      <ModalDialog
        variant="soft"
        sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}
      >
        <DialogTitle sx={{ pr: 2 }}>{title}</DialogTitle>
        <ModalClose onClick={onClose} />
        <Divider />
        {(CommodityMetadata[type].illegal ||
          CommodityMetadata[type].dangerous) && (
          <Box>
            <Typography level="title-md">
              {intlContext.text("UI", "threats")}
            </Typography>
            <Stack>
              <Fragment>{illegal}</Fragment>
              <Fragment>{dangerous}</Fragment>
            </Stack>
          </Box>
        )}

        <Box>
          <Typography level="title-md">
            {intlContext.text("UI", "can-be-found-in")}
          </Typography>
          <Stack>
            {[Station.TurretFactory, Station.TurretFactorySupplier].map(
              (station) => (
                <Stack
                  key={type + station}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
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
                  <Link
                    href={StationMetadata[station].link}
                    color="primary"
                    target="_blank"
                    level="body-sm"
                    sx={{ width: "max-content" }}
                  >
                    {intlContext.text("STATION", station)}
                  </Link>
                </Stack>
              )
            )}
          </Stack>
        </Box>

        <Box>
          <Typography level="title-md">
            {intlContext.text("UI", "guaranteed-in")}
          </Typography>
          <Stack>
            {CommodityMetadata[type].stations.map((station) => (
              <Stack
                key={type + station}
                direction="row"
                spacing={0.5}
                alignItems="center"
              >
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
                {!breakpoint.sm && (
                  <Link
                    to={`/factories?station=${station}`}
                    component={RouterLink}
                  >
                    <IconButton size="sm">
                      <AccountTree />
                    </IconButton>
                  </Link>
                )}
                <Link
                  href={StationMetadata[station].link}
                  color="primary"
                  target="_blank"
                  level="body-sm"
                  sx={{ width: "max-content" }}
                >
                  {intlContext.text("STATION", station)}
                </Link>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Stack spacing={1}>
          <Typography level="title-md">
            {intlContext.text("UI", "cargo-offset")}
          </Typography>
          <form onSubmit={onFormSubmit}>
            <Stack spacing={2}>
              <Numeric
                id={String(type)}
                label={intlContext.text("UI", "cargo-field-label")}
                max={MAX_CARGO_QUANTITY}
                min={MIN_CARGO_QUANTITY}
                value={cargoInput}
                onChange={onCargoChange}
              />
              <Button onClick={onModalSubmit}>
                <Add />
              </Button>
            </Stack>
          </form>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
