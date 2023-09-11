import {Box, Container, Grid, Stack} from "@mui/joy";
import React, {Fragment, useLayoutEffect} from "react";
import {TurretItem} from "@/features/turret-item";
import {Header} from "@/common/components/header";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {TurretPicker} from "@/features/turret-picker";
import {ComponentsTable} from "components/components-table";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
import {CargoTable} from "@/components/cargo-table";
import {VideoBackground} from "@/common/components/video-background";

export function TurretPlannerPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const turrets = useSelector((state: RootState) => state.turret);
    const isSmallScreen = useMediaQuery({query: `(max-width: ${theme.breakpoints.values.md}px)`});

    useLayoutEffect(() => {
        if (!turrets || Object.keys(turrets).length === 0) {
            navigate("/turret-planner/getting-started", {replace: true});
        }
    }, [navigate, turrets]);

    if (isSmallScreen) {
        return (
            <Fragment>
                <VideoBackground/>
                <Container maxWidth={false}>
                    <Header disableGutters/>
                    <Grid container xs={12} spacing={1}>
                        <Grid container xl={7} xs={12}>
                            <Grid container xs={12} spacing={1} alignContent="flex-start">
                                <Grid xs={12}>
                                    <TurretPicker clearable/>
                                </Grid>
                                <Grid container xs={12}>
                                    {Object.keys(turrets).map(id => (
                                        <Grid key={id} md={6} xs={12}>
                                            <TurretItem id={id} turret={turrets[id]}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box sx={{pt: 1, pb: 1}}>
                        <ComponentsTable/>
                        <CargoTable/>
                    </Box>
                </Container>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <VideoBackground/>
            <Container maxWidth={false}>
                <Header disableGutters/>
                <Grid container xs={12} spacing={1}>
                    <Grid container xl={7} xs={12}>
                        <Grid container xs={12} spacing={1} alignContent="flex-start">
                            <Grid xs={12}>
                                <TurretPicker clearable/>
                            </Grid>
                            <Grid container xs={12}>
                                {Object.keys(turrets).map(id => (
                                    <Grid key={id} md={6} xs={12}>
                                        <TurretItem id={id} turret={turrets[id]}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid xl={5} xs={12}>
                        <Container disableGutters maxWidth={false}>
                            <Stack spacing={1}>
                                <ComponentsTable/>
                                <CargoTable/>
                            </Stack>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}