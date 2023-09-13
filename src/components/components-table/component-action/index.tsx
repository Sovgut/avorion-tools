import {Box, Button, Link, ModalClose, Stack, Typography} from "@mui/joy";
import {Add, MoreVert as MoreIcon} from "@mui/icons-material";
import React, {FormEvent, Fragment, useContext, useState} from "react";
import {MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY} from "@/constants/common";
import {IntlContext} from "@/contexts/intl";
import {useDispatch} from "react-redux";
import {cargoComponentAdd} from "@/reducers/cargo";
import {Numeric} from "components/numeric";
import {ComponentType} from "@/constants/enums/components";
import {SellerType} from "@/constants/enums/sellers";
import {ComponentsMeta} from "@/constants/meta/components";
import {SellersMeta} from "@/constants/meta/sellers";
import {ComponentItemModal} from "@/components/components-table/component-modal";

type Props = {
    type: ComponentType;
}

export function ComponentItemAction(props: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cargoInput, setCargoInput] = useState(MIN_CARGO_QUANTITY);

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onCargoChange(id: string, value: string | null) {
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
            dispatch(cargoComponentAdd({key: props.type, quantity: cargoInput}));
            setCargoInput(MIN_CARGO_QUANTITY);
        }
    }

    function onCargoSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onModalSubmit();
    }

    let dangerous = null;
    let illegal = null;

    if (ComponentsMeta[props.type].illegal) {
        illegal = <Typography color="warning">{intlContext.text("UI", 'illegal-cargo')}</Typography>;
    }

    if (ComponentsMeta[props.type].dangerous) {
        dangerous = <Typography color="danger">{intlContext.text("UI", 'dangerous-cargo')}</Typography>;
    }

    return (
        <td>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button size='sm' sx={{width: 24}} variant="plain" color="neutral" onClick={onModalToggle}>
                    <MoreIcon fontSize="small"/>
                </Button>

                <ComponentItemModal open={menuOpen} onClose={onModalClose}>
                    <Stack spacing={2}>
                        <ModalClose onClick={onModalClose}/>
                        <Stack>
                            <Typography level="h4">{intlContext.text("COMPONENT", props.type)}</Typography>
                            <Fragment>{illegal}</Fragment>
                            <Fragment>{dangerous}</Fragment>
                        </Stack>

                        <Box>
                            <Typography level="body-lg">{intlContext.text("UI", 'can-be-found-in')}</Typography>
                            <Stack>
                                {[SellerType.TurretFactory, SellerType.TurretFactorySupplier].map(seller => (
                                    <Link key={props.type + seller}
                                          href={SellersMeta[seller].link}
                                          color="primary"
                                          target="_blank"
                                          sx={{width: "max-content"}}>
                                        {intlContext.text("SELLER", seller)}
                                    </Link>
                                ))}
                            </Stack>
                        </Box>

                        <Box>
                            <Typography level="body-lg">{intlContext.text("UI", 'guaranteed-in')}</Typography>
                            <Stack>
                                {ComponentsMeta[props.type].sellers.map(seller => (
                                    <Link key={props.type + seller}
                                          href={SellersMeta[seller].link}
                                          color="primary"
                                          target="_blank"
                                          sx={{width: "max-content"}}>
                                        {intlContext.text("SELLER", seller)}
                                    </Link>
                                ))}
                            </Stack>
                        </Box>

                        <Stack spacing={1}>
                            <Typography level="body-lg"
                                        fontWeight="bold">{intlContext.text("UI", 'cargo-offset')}</Typography>
                            <form onSubmit={onCargoSubmit}>
                                <Stack spacing={2}>
                                    <Numeric id={props.type}
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
        </td>
    )
}