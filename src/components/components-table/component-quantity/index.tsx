import {Stack, Typography} from "@mui/joy";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "~store";
import {computeQuantity} from "~utils/computations/quantity";
import {ComponentType} from "~constants/enums/components";
import {ComponentItemAction} from "~components/components-table/component-action";

type Props = {
    type: ComponentType;
    value: number;
}

export function ComponentItemQuantity(props: Props) {
    const cargo = useSelector((state: RootState) => state.cargo);
    const quantity = useMemo(() => computeQuantity(cargo.entities[props.type], props.value), [cargo, props]);

    let color: "warning" | "primary" = "primary";
    if (quantity !== props.value) {
        color = "warning";
    }

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 8}}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography color={color} fontFamily="monospace">
                    {quantity.toLocaleString()}
                </Typography>
                <ComponentItemAction type={props.type}/>
            </Stack>
        </td>
    )
}