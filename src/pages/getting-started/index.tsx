import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Box, Card, Container, Link, Stack, Typography} from "@mui/joy";
import {GettingStartedLayout} from "@/layouts/getting-started";
import styles from './styles.module.css'
import {clsx} from "clsx";
import {IntlContext} from "@/contexts/intl";
import {TurretPicker} from "@/components/turret-picker";
import {Header} from "components/header";
import {Center} from "@/components/center";

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
        [styles.animation]: true,
        [styles.close]: isClosePage,
    });

    return (
        <Box>
            <Box sx={{position: "fixed", width: "100%", zIndex: 2}}>
                <Header/>
            </Box>

            <Box className={componentClasses}>
                <GettingStartedLayout>
                    <Center vertical horizontal>
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
                    </Center>
                </GettingStartedLayout>
            </Box>
        </Box>
    )
}