import React, {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Box, Link, Stack, Typography} from "@mui/joy";
import {VideoBackground} from "@/common/components/video-background";
import {Header} from "@/common/components/header";
import {PipesBackground} from "@/common/components/pipes-background";
import {TurretPicker} from "@/features/turret-picker";
import styles from './styles.module.css';
import {ArrowDownward} from "@mui/icons-material";

export function GettingStartedMobile() {
    const intlContext = useContext(IntlContext);

    return (
        <Box>
            <VideoBackground/>
            <Header/>

            <Stack sx={{position: "absolute", top: 0, zIndex: "-1"}}>
                <Box sx={{height: "100dvh"}}>
                    <Stack alignItems="center" justifyContent="center" height="95%">
                        <Typography level="h2">{intlContext.text("UI", "getting-started-0")}</Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <ArrowDownward className={styles.arrow}/>
                    </Stack>
                </Box>
                <Box sx={{minHeight: "40dvh", height: "max-content"}}>
                    <PipesBackground>
                        <Box sx={{p: 2, pt: 4, pb: 4}}>
                            <Stack justifyContent="center" spacing={4}>
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
            </Stack>
        </Box>
    );
}
