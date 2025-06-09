import {
  Box,
  Button,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { FormEvent, Fragment, useContext, useState } from "react";
import { useBreakpoint } from "~hooks/breakpoints";
import { IntlContext } from "~contexts/intl";
import { Add, LinkOutlined } from "@mui/icons-material";
import { Numeric } from "~components/numeric";
import { MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY } from "~constants/common.ts";
import { Commodity } from "~data/commodities/enums";
import { CommodityMetadata } from "~data/commodities/metadata";
import { Station } from "~data/stations/enums";
import { useNavigate } from "react-router";
import { ButtonebleGrouble } from "~components/UI/ButtonebleGrouble/ButtonebleGrouble";
import { Copiable } from "~components/UI/Copiable/Copiable";
import { Buttoneble } from "~components/UI/Buttoneble/Buttoneble";
import { StationMetadata } from "~data/stations/metadata";

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
  const navigate = useNavigate();

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
    if (value === '' || value === null || value === '-') {
      return;
    }

    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setCargoInput(numericValue);
    }
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
          <Stack spacing={1}>
            {[Station.TurretFactory, Station.TurretFactorySupplier].map(
              (station) => (
                <ButtonebleGrouble key={type + station}>
                  <Copiable value={intlContext.text("STATION", station)} />
                  <Buttoneble onClick={() => window.open(StationMetadata[station].link, "_blank")}>
                    <LinkOutlined />
                  </Buttoneble>
                  <Buttoneble onClick={() => {
                    if (station !== Station.TurretFactorySupplier) {
                      navigate(`/factories?station=${station}`)
                    }
                  }}>

                    {intlContext.text("STATION", station)}
                  </Buttoneble>
                </ButtonebleGrouble>
              )
            )}
          </Stack>
        </Box>

        <Box>
          <Typography level="title-md">
            {intlContext.text("UI", "guaranteed-in")}
          </Typography>
          <Stack spacing={1}>
            {CommodityMetadata[type].stations.map((station) => (
              <ButtonebleGrouble key={type + station}>
                <Copiable value={intlContext.text("STATION", station)} />
                <Buttoneble onClick={() => window.open(StationMetadata[station].link, "_blank")}>
                  <LinkOutlined />
                </Buttoneble>
                <Buttoneble onClick={() => {
                  if (station !== Station.TurretFactorySupplier) {
                    navigate(`/factories?station=${station}`)
                  }
                }}>

                  {intlContext.text("STATION", station)}
                </Buttoneble>
              </ButtonebleGrouble>
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
