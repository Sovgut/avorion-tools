import {Box, Button, IconButton, Link, Stack, Typography} from "@mui/joy";
import {Add, CopyAll, MoreVert as MoreIcon} from "@mui/icons-material";
import {FormEvent, Fragment, MouseEvent, useContext, useState} from "react";
import {MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY} from "~constants/common";
import {IntlContext} from "~contexts/intl";
import {useDispatch} from "react-redux";
import {createCargoComponent} from "~reducers/cargo";
import {Numeric} from "~components/numeric";
import {ComponentType} from "~constants/enums/components";
import {SellerType} from "~constants/enums/sellers";
import {ComponentsMeta} from "~constants/meta/components";
import {SellersMeta} from "~constants/meta/sellers";
import {ComponentItemModal} from "~components/components-table/component-modal";
import {useBreakpoint} from "~hooks/breakpoints";

type Props = {
    type: ComponentType;
}

export function ComponentItemAction({type}: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cargoInput, setCargoInput] = useState(MIN_CARGO_QUANTITY);

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();

    function onCargoChange(_id: string, value: string | null) {
        setCargoInput(Number(value));
    }

    function onModalToggle() {
        setMenuOpen(prevState => !prevState);
    }

    function onModalClose() {
        setMenuOpen(false);
        setCargoInput(MIN_CARGO_QUANTITY);
    }

    function onModalSubmit() {
        setMenuOpen(false);

        if (cargoInput >= MIN_CARGO_QUANTITY) {
            dispatch(createCargoComponent({type: type, quantity: cargoInput}));
            setCargoInput(MIN_CARGO_QUANTITY);
        }
    }

    function onCargoSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onModalSubmit();
    }

    let dangerous = null;
    let illegal = null;

    if (ComponentsMeta[type].illegal) {
        illegal = <Typography color="warning">{intlContext.text("UI", "illegal-cargo")}</Typography>;
    }

    if (ComponentsMeta[type].dangerous) {
        dangerous = <Typography color="danger">{intlContext.text("UI", "dangerous-cargo")}</Typography>;
    }

    function handleCopyText(seller: string) {
        return function $handleSellerCopyText(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation();

            window.navigator.clipboard.writeText(seller).then();
        };
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <IconButton size="sm" variant="plain" color="neutral" onClick={onModalToggle}>
                <MoreIcon fontSize="small"/>
            </IconButton>

            <ComponentItemModal open={menuOpen} onClose={onModalClose} title={intlContext.text("COMPONENT", type)}>
                <Stack spacing={2}>
                    <Box>
                        <Typography level="title-md">{intlContext.text("UI", "threats")}</Typography>
                        <Stack>
                            <Fragment>{illegal}</Fragment>
                            <Fragment>{dangerous}</Fragment>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography level="title-md">{intlContext.text("UI", "can-be-found-in")}</Typography>
                        <Stack>
                            {[SellerType.TurretFactory, SellerType.TurretFactorySupplier].map(seller => (
                                <Stack key={type + seller} direction="row" spacing={.5} alignItems="center">
                                    <Link href={SellersMeta[seller].link}
                                          color="primary"
                                          target="_blank"
                                          sx={{width: "max-content"}}>
                                        {intlContext.text("SELLER", seller)}
                                    </Link>
                                    {!breakpoint.sm && (
                                        <IconButton size="sm"
                                                    title={intlContext.text("UI", "copy")}
                                                    onClick={handleCopyText(intlContext.text("SELLER", seller))}>
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
                                          sx={{width: "max-content"}}>
                                        {intlContext.text("SELLER", seller)}
                                    </Link>
                                    {!breakpoint.sm && (
                                        <IconButton size="sm"
                                                    title={intlContext.text("UI", "copy")}
                                                    onClick={handleCopyText(intlContext.text("SELLER", seller))}>
                                            <CopyAll/>
                                        </IconButton>
                                    )}
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    <Stack spacing={1}>
                        <Typography level="title-md">{intlContext.text("UI", "cargo-offset")}</Typography>
                        <form onSubmit={onCargoSubmit}>
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
                </Stack>
            </ComponentItemModal>
        </Box>
    );
}