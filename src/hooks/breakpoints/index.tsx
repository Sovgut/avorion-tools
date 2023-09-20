import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";

export function useBreakpoint() {
    const theme = useTheme();

    const xs = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.xs}px)`,
    });

    const sm = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`,
    });

    const md = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.md}px)`,
    });

    const xl = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.xl}px)`,
    });

    const lg = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.lg}px)`,
    });

    return {xs, sm, md, xl, lg};
}