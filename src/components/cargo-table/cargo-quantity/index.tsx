import {Stack, Typography} from "@mui/joy";
import {CargoItemAction} from "~components/cargo-table/cargo-action";
import {ComponentType} from "~constants/enums/components.ts";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";

type Props = {
    value: number;
    type: ComponentType;
}

export function CargoItemQuantity({value, type}: Props) {
    const theme = useTheme();
    const initialValue = value ?? 0;
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

    let fontSize: 'md' | number = 'md';

    if (isSmallScreen) {
        fontSize = 12;
    }

    return (
        <td align="right" style={{paddingLeft: 0, paddingRight: 8}}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography fontSize={fontSize} color="primary" fontFamily="monospace">
                    {initialValue.toLocaleString()}
                </Typography>
                <CargoItemAction type={type}/>
            </Stack>
        </td>
    )
}