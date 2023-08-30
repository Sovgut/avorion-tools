import React, {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Box, Container, Link, Sheet, Stack, Typography} from "@mui/joy";
import {Header} from "@/common/components/header";
import styles from './styles.module.css'
import {TurretPicker} from "@/features/turret-picker";

export function GettingStartedDesktop() {
    const intlContext = useContext(IntlContext);

    return (
        <Box sx={{display: "flex", position: "relative", width: "100%", height: "100vh", flexDirection: "column"}}>
            <Box sx={{position: "absolute", zIndex: 999, width: "100%"}}>
                <Header/>
            </Box>
            <Stack direction="row" sx={{height: "100%"}}>
                <Box sx={{display: "flex", position: "relative", height: "100%", width: "50vw"}}>
                    <Box sx={{
                        top: 0,
                        left: 0,
                        position: "absolute",
                        zIndex: "0",
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
                        zIndex: "1",
                        height: "100%",
                        width: "100%",
                        background: "linear-gradient(to bottom, transparent, var(--joy-palette-background-level1))",
                        opacity: ".75"
                    }}/>
                </Box>
                <Container maxWidth={false} disableGutters sx={{height: "100%", width: "50vw"}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        borderLeft: "2px solid var(--joy-palette-background-level2)"
                    }}>
                        <Sheet sx={{position: "relative", width: "100%", height: "100%", p: 4, pt: 16}}>
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
                            <Stack sx={{position: "relative", height: "calc(100% - 16rem)", zIndex: 3}}
                                   justifyContent="center" spacing={4}>
                                <Typography level="h2">{intlContext.text("UI", "getting-started-0")}</Typography>
                                <Stack spacing={2}>
                                    <Typography className={styles.text}
                                                level="title-lg">{intlContext.text("UI", "getting-started-1")}</Typography>
                                    <Typography
                                        className={styles.text}>{intlContext.text("UI", "getting-started-2")}</Typography>
                                    <Typography className={styles.text}
                                                level="title-lg">{intlContext.text("UI", "getting-started-3")}</Typography>
                                    <Typography
                                        className={styles.text}>{intlContext.text("UI", "getting-started-4")}</Typography>
                                </Stack>
                                <TurretPicker/>
                                <Stack>
                                    <Typography textAlign="center">Avorion Tools is a community work, and not officially created or maintained by <Link href="https://boxelware.de/" target="_blank">Boxelware</Link>.</Typography>
                                </Stack>
                            </Stack>
                        </Sheet>
                    </Box>
                </Container>
            </Stack>
        </Box>
    );
}