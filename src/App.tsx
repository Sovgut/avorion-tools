import {Box, Container, useColorScheme} from "@mui/joy";
import {TurretList} from "./components/turret/list";

function App() {
    const {mode} = useColorScheme();

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
                {mode === "dark" || mode === "system"
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
                <TurretList/>
            </Container>
        </Box>
    );
}

export default App;
