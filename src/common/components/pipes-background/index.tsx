import {Box, Sheet} from "@mui/joy";
import styles from "@/pages/getting-started/desktop/styles.module.css";
import React, {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

export function PipesBackground(props: Props) {
    return (
        <Sheet sx={{position: "relative", width: "100%", minHeight: "100%", height: "max-content"}}>
            <Box className={styles.pipes} sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
                mixBlendMode: "difference",
                filter: "invert(1)",
            }}/>
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, var(--joy-palette-background-level1) 50%, transparent)"
            }}/>
            <Box sx={{position: "relative", zIndex: 3}}>
                {props.children}
            </Box>
        </Sheet>
    )
}