import {Box} from "@mui/joy";
import React from "react";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
//import useVH from 'react-viewport-height';
import styles from './styles.module.css';

export function VideoBackground() {
    //const vh = useVH();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery({query: `(max-width: ${theme.breakpoints.values.md}px)`});

    return (
        <Box className={styles.container}>
            {!isSmallScreen && <video
                style={{
                    position: "absolute",
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
                controls={false}/>}
        </Box>
    )
}