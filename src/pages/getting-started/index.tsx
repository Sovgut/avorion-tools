import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Box, Card, Container, Link, Stack, Typography} from "@mui/joy";
import {Header} from "@/common/components/header";
import {VideoBackground} from "@/common/components/video-background";
import {GettingStartedLayout} from "@/layouts/getting-started";
import {TurretPicker} from "@/features/turret-picker";
import styles from './styles.module.css'
import {clsx} from "clsx";
import {IntlContext} from "@/contexts/intl";

export function GettingStartedPage() {
    const [isClosePage, setClose] = useState(false);

    const intlContext = useContext(IntlContext);
    const navigate = useNavigate();
    const turrets = useSelector((state: RootState) => state.turret);

    useEffect(() => {
        if (turrets && Object.keys(turrets).length > 0) {
            setClose(true);

            const timeoutId = setTimeout(() => {
                window.scrollTo(0, 0);
                navigate("/turret-planner", {replace: true});
            }, 150);

            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [navigate, turrets]);

    const componentClasses = clsx({
        [styles.component]: true,
        [styles.close]: isClosePage,
    });

    return (
        <Box className={componentClasses} sx={{minHeight: "100vh"}}>
            <Box sx={{position: "relative", zIndex: 2}}>
                <Header/>
            </Box>

            <GettingStartedLayout>
                <VideoBackground/>

                <Box sx={{
                    minHeight: "100vh",
                    minWidth: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Container>
                        <Stack spacing={4}>
                            <Typography level="h1"
                                        textAlign="center">{intlContext.text("UI", "lets-add-turret")}</Typography>
                            <Card sx={{boxShadow: "sm"}}>
                                <TurretPicker/>
                                <Typography level="body-sm">
                                    <b>Avorion Tools</b> is a community work, and not officially created or
                                    maintained
                                    by <Link
                                    href="https://boxelware.de/" target="_blank">Boxelware</Link>.
                                </Typography>
                            </Card>
                        </Stack>
                    </Container>
                </Box>

            </GettingStartedLayout>
        </Box>
    )
}