import {Box, Container, Stack,} from "@mui/joy";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
}

export function Layout(props: LayoutProps) {
    return (
        <Box sx={{display: "flex", position: "relative", minHeight: "100vh", height: 0}}>
            <Box sx={{
                top: 0,
                left: 0,
                position: "fixed",
                zIndex: "-2",
                height: "100%",
                width: "100%",
                overflow: "hidden"
            }}>
                <video style={{width: "100%", height: "100%", objectFit: "cover"}}
                       src="/assets/video/dark-background.mp4"
                       autoPlay
                       loop
                       muted
                       controls={false}/>
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
            <Container maxWidth={false} disableGutters sx={{height: "100%"}}>
                <Stack spacing={2} sx={{height: "100%"}}>
                    {props.children}
                </Stack>
            </Container>
        </Box>
    );
}