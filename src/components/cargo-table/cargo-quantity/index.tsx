import {Typography} from "@mui/joy";
import React from "react";

type Props = {
    value: number;
}

export function CargoItemQuantity(props: Props) {
    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 0}}>
            <Typography color="primary" fontFamily="monospace">
                {props.value.toLocaleString()}
            </Typography>
        </td>
    )
}