import {Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";
import {Add, MoreVert as MoreIcon} from "@mui/icons-material";
import {Field} from "../../common/components/field";
import {FormEvent, useContext, useState} from "react";
import {IntlContext} from "@/contexts/intl";
import {ComponentType} from "@/constants/enums/components";
import {useDispatch} from "react-redux";
import {cargoComponentAdd} from "@/reducers/cargo";

type ComponentAddCargoProps = {
    type: ComponentType;
}

const MAX_CARGO_QUANTITY = 1_000_000;

export function ComponentAddCargo(props: ComponentAddCargoProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cargoInput, setCargoInput] = useState(0);

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onCargoChange(id: string, value: string | null) {
        if (value && Number(value) > 0 && Number(value) < MAX_CARGO_QUANTITY) {
            setCargoInput(Number(value));
        }
    }

    function onModalToggle() {
        setMenuOpen(prevState => !prevState);

        if (cargoInput > 0) {
            dispatch(cargoComponentAdd({key: props.type, quantity: cargoInput}));
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
            dispatch(cargoComponentAdd({key: props.type, quantity: cargoInput}));
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