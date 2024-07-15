import {Stack, Typography} from "@mui/joy";
import {CargoItemAction} from "~components/cargo-table/cargo-action";
import styles from "./styles.module.css";
import {useBreakpoint} from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";

type Props = {
    value: number;
    type: Commodity;
}

export function CargoItemQuantity({value, type}: Props) {
    const initialValue = value ?? 0;
    const breakpoint = useBreakpoint();

    let fontSize: "md" | number = "md";

    if (breakpoint.sm) {
        fontSize = 12;
    }

    return (
        <td className={styles.row} style={{paddingRight: 16}} align="right">
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Typography fontSize={fontSize} color="primary" fontFamily="monospace">
                    {initialValue.toLocaleString()}
                </Typography>
                <CargoItemAction type={type}/>
            </Stack>
        </td>
    );
}