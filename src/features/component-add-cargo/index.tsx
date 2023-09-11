import {Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography} from "@mui/joy";
import {Add, MoreVert as MoreIcon} from "@mui/icons-material";
import {Numeric} from "common/components/numeric";
import {FormEvent, useContext, useState} from "react";
import {IntlContext} from "@/contexts/intl";
import {ComponentType} from "@/constants/enums/components";
import {useDispatch} from "react-redux";
import {cargoComponentAdd} from "@/reducers/cargo";
import {MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY} from "@/constants/common";

type ComponentAddCargoProps = {
    type: ComponentType;
}

export function ComponentAddCargo(props: ComponentAddCargoProps) {
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
                                <Numeric id={props.type}
                                         label={intlContext.text("UI", "cargo-field-label")}
                                         max={MAX_CARGO_QUANTITY}
                                         min={MIN_CARGO_QUANTITY}
                                         value={cargoInput}
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