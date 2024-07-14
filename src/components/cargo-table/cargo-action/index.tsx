import {Close} from "@mui/icons-material";
import {IconButton} from "@mui/joy";
import {deleteCargoComponent} from "~reducers/cargo";
import {useDispatch} from "react-redux";
import { Commodity } from "src/data/commodities/enums";

type Props = {
    type: Commodity;
}

export function CargoItemAction({type}: Props) {
    const dispatch = useDispatch();

    function handleRemove() {
        dispatch(deleteCargoComponent(type))
    }

    return (
        <IconButton size='sm' variant="plain" color="neutral" onClick={handleRemove}>
            <Close fontSize="small"/>
        </IconButton>
    )
}