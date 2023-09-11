import React, {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Box, Link, Stack, Typography} from "@mui/joy";
import {Header} from "@/common/components/header";
import styles from './styles.module.css'
import {TurretPicker} from "@/features/turret-picker";
import {VideoBackground} from "@/common/components/video-background";
import {PipesBackground} from "@/common/components/pipes-background";

export function GettingStartedDesktop() {
    const intlContext = useContext(IntlContext);

    return (
        <Box sx={{display: "flex", position: "relative", width: "100%", height: "100vh", flexDirection: "column"}}>
            <Box sx={{position: "absolute", zIndex: 999, width: "100%"}}>
                <Header/>
            </Box>
            <Stack direction="row" sx={{height: "100%"}}>
                <VideoBackground/>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                    <Box sx={{
                        display: "flex",
                        height: "100%",
                        width: "50vw",
                        borderLeft: "2px solid var(--joy-palette-background-level2)"
                    }}>
                        <PipesBackground>
                            <Box sx={{height: "100vh", p: 4}}>
                                <Stack justifyContent="center" spacing={4} sx={{pt: "14rem"}}>
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
                                        <Typography textAlign="center">Avorion Tools is a community work, and not
                                            officially
                                            created or maintained by <Link href="https://boxelware.de/"
                                                                           target="_blank">Boxelware</Link>.</Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </PipesBackground>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}