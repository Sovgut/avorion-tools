import {Stack, Typography} from "@mui/joy";
import {CargoItemAction} from "~components/cargo-table/cargo-action";
import {ComponentType} from "~constants/enums/components.ts";

type Props = {
    value: number;
    type: ComponentType;
}

export function CargoItemQuantity(props: Props) {
    const value = props.value ?? 0;

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 8}}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography color="primary" fontFamily="monospace">
                    {value.toLocaleString()}
                </Typography>
                <CargoItemAction type={props.type}/>
            </Stack>
        </td>
    )
}