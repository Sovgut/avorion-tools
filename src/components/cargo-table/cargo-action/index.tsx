import {Close} from "@mui/icons-material";
import {Button} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {deleteCargoComponent} from "~reducers/cargo";
import {useDispatch} from "react-redux";

type Props = {
    type: ComponentType;
}

export function CargoItemAction(props: Props) {
    const dispatch = useDispatch();

    function handleRemove() {
        dispatch(deleteCargoComponent(props.type))
    }

    return (
        <td>
            <Button size='sm' sx={{width: 24}} variant="plain" color="neutral" onClick={handleRemove}>
                <Close fontSize="small"/>
            </Button>
        </td>
    )
}