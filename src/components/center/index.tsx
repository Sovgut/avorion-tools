import {SxProps} from "@mui/joy/styles/types";
import {ReactNode} from "react";
import {Box} from "@mui/joy";

type Props = {
    horizontal?: boolean;
    vertical?: boolean;
    sx?: SxProps;
    children: ReactNode;
}

export function Center({horizontal, vertical, sx, children}: Props) {
    const sxProps: SxProps = {
        display: "flex",
        height: "100%",
        width: "100%",
    }

    const alignment: SxProps = {
        justifyContent: "unset",
        alignItems: "unset",
    }

    if (horizontal) {
        alignment.justifyContent = "center";
    }

    if (vertical) {
        alignment.alignItems = "center";
    }

    return (
        <Box sx={{...sxProps, ...(sx ?? {}) as any, ...alignment}}>
            {children}
        </Box>
    )
}