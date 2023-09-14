import {Close} from "@mui/icons-material";
import {IconButton} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {deleteCargoComponent} from "~reducers/cargo";
import {useDispatch} from "react-redux";

type Props = {
    type: ComponentType;
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