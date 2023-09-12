import {Box} from "@mui/joy";
import React, {Fragment} from "react";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";

export function VideoBackground() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery({query: `(max-width: ${theme.breakpoints.values.md}px)`});
    let element = (
        <Fragment>
            <img style={{
                position: "absolute",
                zIndex: "1",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                objectFit: "cover",
            }}
                 src={`/assets/img/dark-background.png`}
                 alt="avorion dark background"/>
        </Fragment>
    )

    if (!isSmallScreen) {
        element = (
            <Fragment>
                <img style={{
                    position: "absolute",
                    zIndex: "1",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                    objectFit: "cover",
                }}
                     src={`/assets/img/dark-background.png`}
                     alt="avorion dark background"/>
                <video
                    style={{
                        position: "absolute",
                        zIndex: "2",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                    }}
                    src={`/assets/video/dark-background.mp4`}
                    autoPlay
                    loop
                    muted
                    controls={false}/>
            </Fragment>
        )
    }

    return (
        <Box sx={{display: "flex", position: "fixed", height: "100vh", width: "100vw", zIndex: "-1"}}>
            <Box sx={{
                top: 0,
                left: 0,
                position: "absolute",
                zIndex: "-3",
                height: "100%",
                width: "100%",
                overflow: "hidden"
            }}>
                {element}
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