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
import {FormEvent, Fragment, useContext, useState} from "react";
import {useBreakpoint} from "~hooks/breakpoints";
import {ComponentType} from "~constants/enums/components.ts";
import {ComponentsMeta} from "~constants/meta/components.ts";
import {IntlContext} from "~contexts/intl";
import {SellerType} from "~constants/enums/sellers.ts";
import {SellersMeta} from "~constants/meta/sellers.ts";
import {Add, CopyAll} from "@mui/icons-material";
import {copyOnMouseEvent} from "~utils/copy-on-mouse-event.ts";
import {Numeric} from "~components/numeric";
import {MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY} from "~constants/common.ts";

type Props = {
    open: boolean;
    title: string;
    type: ComponentType;

    onClose?: () => void;
    onSubmit?: (value: number) => void;
}

export function ComponentItemModal({open, title, type, onClose, onSubmit}: Props) {
    const breakpoint = useBreakpoint();
    const intlContext = useContext(IntlContext);
    const [cargoInput, setCargoInput] = useState(MIN_CARGO_QUANTITY);

    let dangerous = null;
    let illegal = null;

    if (ComponentsMeta[type].illegal) {
        illegal =
            <Typography color="warning" level="body-sm">{intlContext.text("UI", "illegal-cargo")}</Typography>;
    }

    if (ComponentsMeta[type].dangerous) {
        dangerous =
            <Typography color="danger" level="body-sm">{intlContext.text("UI", "dangerous-cargo")}</Typography>;
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
            <ModalDialog sx={{minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5}}>
                <DialogTitle sx={{pr: 2}}>{title}</DialogTitle>
                <ModalClose onClick={onClose}/>
                <Divider/>
                {
                    (ComponentsMeta[type].illegal || ComponentsMeta[type].dangerous) && (
                        <Box>
                            <Typography level="title-md">{intlContext.text("UI", "threats")}</Typography>
                            <Stack>
                                <Fragment>{illegal}</Fragment>
                                <Fragment>{dangerous}</Fragment>
                            </Stack>
                        </Box>
                    )
                }

                <Box>
                    <Typography level="title-md">{intlContext.text("UI", "can-be-found-in")}</Typography>
                    <Stack>
                        {[SellerType.TurretFactory, SellerType.TurretFactorySupplier].map(seller => (
                            <Stack key={type + seller} direction="row" spacing={.5} alignItems="center">
                                <Link href={SellersMeta[seller].link}
                                      color="primary"
                                      target="_blank"
                                      level="body-sm"
                                      sx={{width: "max-content"}}>
                                    {intlContext.text("SELLER", seller)}
                                </Link>
                                {!breakpoint.sm && (
                                    <IconButton size="sm"
                                                title={intlContext.text("UI", "copy")}
                                                onClick={copyOnMouseEvent(intlContext.text("SELLER", seller))}>
                                        <CopyAll/>
                                    </IconButton>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                <Box>
                    <Typography level="title-md">{intlContext.text("UI", "guaranteed-in")}</Typography>
                    <Stack>
                        {ComponentsMeta[type].sellers.map((seller: SellerType) => (
                            <Stack key={type + seller} direction="row" spacing={.5} alignItems="center">
                                <Link href={SellersMeta[seller].link}
                                      color="primary"
                                      target="_blank"
                                      level="body-sm"
                                      sx={{width: "max-content"}}>
                                    {intlContext.text("SELLER", seller)}
                                </Link>
                                {!breakpoint.sm && (
                                    <IconButton size="sm"
                                                title={intlContext.text("UI", "copy")}
                                                onClick={copyOnMouseEvent(intlContext.text("SELLER", seller))}>
                                        <CopyAll/>
                                    </IconButton>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                <Divider/>

                <Stack spacing={1}>
                    <Typography level="title-md">{intlContext.text("UI", "cargo-offset")}</Typography>
                    <form onSubmit={onFormSubmit}>
                        <Stack spacing={2}>
                            <Numeric id={type}
                                     label={intlContext.text("UI", "cargo-field-label")}
                                     max={MAX_CARGO_QUANTITY}
                                     min={MIN_CARGO_QUANTITY}
                                     value={cargoInput}
                                     onChange={onCargoChange}/>
                            <Button onClick={onModalSubmit}><Add/></Button>
                        </Stack>
                    </form>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}