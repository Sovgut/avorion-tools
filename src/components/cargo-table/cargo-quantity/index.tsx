import {Typography} from "@mui/joy";

type Props = {
    value: number;
}

export function CargoItemQuantity(props: Props) {
    const value = props.value ?? 0;

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 0}}>
            <Typography color="primary" fontFamily="monospace">
                {value.toLocaleString()}
            </Typography>
        </td>
    )
}