import {Box, IconButton} from "@mui/joy";
import {MoreVert as MoreIcon} from "@mui/icons-material";
import {useContext, useState} from "react";
import {MIN_CARGO_QUANTITY} from "~constants/common";
import {IntlContext} from "~contexts/intl";
import {useDispatch} from "react-redux";
import {createCargoComponent} from "~reducers/cargo";
import {ComponentType} from "~constants/enums/components";
import {ComponentItemModal} from "~components/components-table/component-modal";

type Props = {
    type: ComponentType;
}

export function ComponentItemAction({type}: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onModalToggle() {
        setMenuOpen(prevState => !prevState);
    }

    function onModalClose() {
        setMenuOpen(false);
    }

    function onModalSubmit(value: number) {
        setMenuOpen(false);

        if (value >= MIN_CARGO_QUANTITY) {
            dispatch(createCargoComponent({type: type, quantity: value}));
        }
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <IconButton size="sm" variant="plain" color="neutral" onClick={onModalToggle}>
                <MoreIcon fontSize="small"/>
            </IconButton>

            <ComponentItemModal open={menuOpen}
                                title={intlContext.text("COMPONENT", type)}
                                type={type}
                                onClose={onModalClose}
                                onSubmit={onModalSubmit}/>
        </Box>
    );
}