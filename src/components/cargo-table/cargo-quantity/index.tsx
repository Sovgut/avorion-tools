import {Stack, Typography} from "@mui/joy";
import {CargoItemAction} from "~components/cargo-table/cargo-action";
import {ComponentType} from "~constants/enums/components.ts";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
import styles from './styles.module.css';

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
        <td className={styles.row} align="right">
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography fontSize={fontSize} color="primary" fontFamily="monospace">
                    {initialValue.toLocaleString()}
                </Typography>
                <CargoItemAction type={type}/>
            </Stack>
        </td>
    )
}