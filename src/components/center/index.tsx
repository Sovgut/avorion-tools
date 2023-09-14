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
    const initial: SxProps = {
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

    let sxProps: SxProps = {
        ...initial,
        ...alignment,
    }

    if (sx) {
        sxProps = {...sxProps, ...sx};
    }

    return (
        <Box sx={sxProps}>
            {children}
        </Box>
    )
}