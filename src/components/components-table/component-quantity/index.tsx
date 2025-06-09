import {Stack, Typography} from "@mui/joy";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "~store";
import {computeQuantity} from "~utils/computations/quantity";
import {ComponentItemAction} from "~components/components-table/component-action";
import {useBreakpoint} from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";

type Props = {
    type: Commodity;
    value: number;
}

export function ComponentItemQuantity({type, value}: Props) {
    const cargo = useSelector((state: RootState) => state.cargo);
    const quantity = useMemo(() => computeQuantity(cargo.entities[type], value), [cargo, type, value]);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const breakpoint = useBreakpoint();

    let fontSize: "md" | number = "md";
    let color: "warning" | "primary" = "primary";

    if (breakpoint.sm) {
        fontSize = 12;
    }

    if (quantity !== value) {
        color = "warning";
    }

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 16}}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography fontSize={fontSize} color={color} fontFamily="monospace" sx={{ textDecoration: !!checkbox.entities[type] ? "line-through" : "none", opacity: !!checkbox.entities[type] ? 0.5 : 1 }}>
                    {quantity.toLocaleString()}
                </Typography>
                <ComponentItemAction type={type}/>
            </Stack>
        </td>
    );
}