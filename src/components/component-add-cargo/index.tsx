import {Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";
import {Add, MoreVert as MoreIcon} from "@mui/icons-material";
import {Field} from "../field";
import {Component} from "../../constants";
import {FormEvent, useContext, useState} from "react";
import {CargoContext} from "../../contexts/cargo";
import {IntlContext} from "../../contexts/intl";

type ComponentAddCargoProps = {
    type: Component;
}

const MAX_CARGO_QUANTITY = 1_000_000;

export function ComponentAddCargo(props: ComponentAddCargoProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cargoInput, setCargoInput] = useState(0);

    const intlContext = useContext(IntlContext);
    const cargoContext = useContext(CargoContext);

    function onCargoChange(id: string, value: string | null) {
        if (value && Number(value) > 0 && Number(value) < MAX_CARGO_QUANTITY) {
            setCargoInput(Number(value));
        }
    }

    function onModalToggle() {
        setMenuOpen(prevState => !prevState);

        if (cargoInput > 0) {
            cargoContext.add(props.type, cargoInput);
            setCargoInput(0);
        }
    }

    function onModalClose() {
        setMenuOpen(false);
        setCargoInput(0);
    }

    function onModalSubmit() {
        setMenuOpen(false);

        if (cargoInput > 0) {
            cargoContext.add(props.type, cargoInput);
            setCargoInput(0);
        }
    }

    function onCargoSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onModalSubmit();
    }

    return (
        <Box sx={{display: "flex", justifyContent: "end"}}>
            <Button sx={{width: "44px", height: "40px"}} variant="outlined" color="neutral"
                    onClick={onModalToggle}><MoreIcon/></Button>
            <Modal open={menuOpen} onClose={onModalClose}>
                <ModalDialog
                    layout="center"
                    size="lg"
                    variant="plain"
                    sx={{pt: 0}}
                >
                    <Stack spacing={2}>
                        <ModalClose onClick={onModalClose}/>
                        <Typography level="h2">{intlContext.text("COMPONENT", props.type)}</Typography>

                        <form onSubmit={onCargoSubmit}>
                            <Stack spacing={2}>
                                <Field id={props.type}
                                       label={intlContext.text("UI", "cargo-field-label")}
                                       maxValue={MAX_CARGO_QUANTITY}
                                       value={cargoInput}
                                       type="number"
                                       focus
                                       onChange={onCargoChange}/>
                                <Button onClick={onModalSubmit}><Add/></Button>
                            </Stack>
                        </form>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Box>
    )
}