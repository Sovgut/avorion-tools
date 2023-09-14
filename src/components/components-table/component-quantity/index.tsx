import {Stack, Typography} from "@mui/joy";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "~store";
import {computeQuantity} from "~utils/computations/quantity";
import {ComponentType} from "~constants/enums/components";
import {ComponentItemAction} from "~components/components-table/component-action";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";

type Props = {
    type: ComponentType;
    value: number;
}

export function ComponentItemQuantity({type, value}: Props) {
    const theme = useTheme();
    const cargo = useSelector((state: RootState) => state.cargo);
    const quantity = useMemo(() => computeQuantity(cargo.entities[type], value), [cargo, type, value]);
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

    let fontSize: 'md' | number = 'md';
    let color: "warning" | "primary" = "primary";

    if (isSmallScreen) {
        fontSize = 12;
    }

    if (quantity !== value) {
        color = "warning";
    }

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 16}}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography fontSize={fontSize} color={color} fontFamily="monospace">
                    {quantity.toLocaleString()}
                </Typography>
                <ComponentItemAction type={type}/>
            </Stack>
        </td>
    )
}