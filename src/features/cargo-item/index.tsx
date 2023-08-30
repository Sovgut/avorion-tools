import {Box, Button, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {Remove,} from "@mui/icons-material";
import {ComponentItemType} from "@/features/component-item-type";
import {ComponentType} from "@/constants/enums/components";
import {useDispatch} from "react-redux";
import {cargoComponentRemove} from "@/reducers/cargo";
import {ComponentsMeta} from "@/constants/meta/components";
import {ComponentSellers} from "@/features/component-sellers";

type CargoItemProps = {
    type: ComponentType;
    value: number;
}

export function CargoItem(props: CargoItemProps) {
    const dispatch = useDispatch();

    function onClear() {
        dispatch(cargoComponentRemove(props.type))
    }

    return (
        <tr key={props.type}>
            <td>
                <Stack direction="row" spacing={1}>
                    <img className={styles.icon} src={ComponentsMeta[props.type].icon} alt={props.type}/>
                    <ComponentItemType type={props.type}/>
                </Stack>
                <ComponentSellers type={props.type}/>
            </td>
            <td style={{textAlign: "right"}}>
                <Typography
                    color="warning"
                    fontFamily="monospace"
                >
                    {props.value.toLocaleString()}
                </Typography>
            </td>
            <td>
                <Box sx={{display: "flex", justifyContent: "end"}}>
                    <Button sx={{width: "44px", height: "40px"}} variant="outlined" color="neutral"
                            onClick={onClear}><Remove/></Button>
                </Box>
            </td>
        </tr>
    )
}