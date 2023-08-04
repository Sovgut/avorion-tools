import {Box, Container, Stack, useColorScheme} from "@mui/joy";
import {isDarkTheme} from "../../utils/is-dark-theme";
import {ReactNode} from "react";
import {Header} from "../header";

type LayoutProps = {
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    const {mode, systemMode} = useColorScheme();
    const isDark = isDarkTheme(mode, systemMode);

    return (
        <Box sx={{position: "relative", minHeight: "100vh"}}>
            <Box sx={{
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: "-2",
                height: "100%",
                width: "100%",
                overflow: "hidden"
            }}>
                {isDark
                    ? <video style={{width: "100%", height: "100%", objectFit: "cover"}}
                             src="/assets/video/background.mp4"
                             autoPlay loop muted
                             controls={false}/>
                    : null}
            </Box>
            <Box sx={{
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: "-1",
                height: "100%",
                width: "100%",
                background: "linear-gradient(to bottom, transparent, var(--joy-palette-background-level1))",
                opacity: ".75"
            }}/>
            <Container maxWidth={false}>
                <Stack spacing={2}>
                    <Header/>
                    {props.children}
                </Stack>
            </Container>
        </Box>
    );
}