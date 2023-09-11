import {Box} from "@mui/joy";
import React from "react";

export function VideoBackground() {
    return (
        <Box sx={{display: "flex", position: "fixed", height: "100%", width: "100%", zIndex: "-1"}}>
            <Box sx={{
                top: 0,
                left: 0,
                position: "absolute",
                zIndex: "-3",
                height: "100%",
                width: "100%",
                overflow: "hidden"
            }}>
                <video
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    src={`/assets/video/dark-background.mp4`}
                    autoPlay
                    loop
                    muted
                    controls={false}/>
            </Box>
            <Box sx={{
                top: 0,
                left: 0,
                position: "absolute",
                zIndex: "-2",
                height: "100%",
                width: "100%",
                background: "linear-gradient(to bottom, transparent, var(--joy-palette-background-level1))",
                opacity: ".75"
            }}/>
        </Box>
    )
}