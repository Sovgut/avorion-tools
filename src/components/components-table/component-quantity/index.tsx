import {Typography} from "@mui/joy";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {computeQuantity} from "@/common/utils/computations/quantity";
import {ComponentType} from "@/constants/enums/components";

type Props = {
    type: ComponentType;
    value: number;
}

export function ComponentItemQuantity(props: Props) {
    const cargo = useSelector((state: RootState) => state.cargo);
    const quantity = useMemo(() => computeQuantity(cargo[props.type], props.value), [cargo, props]);

    let color: "warning" | "primary" = "primary";
    if (quantity !== props.value) {
        color = "warning";
    }

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 0}}>
            <Typography color={color} fontFamily="monospace">
                {quantity.toLocaleString()}
            </Typography>
        </td>
    )
}