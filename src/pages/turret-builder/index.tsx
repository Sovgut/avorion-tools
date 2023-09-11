import {Container, Grid, Stack} from "@mui/joy";
import React, {useLayoutEffect} from "react";
import {TurretItem} from "@/features/turret-item";
import {ComponentTable} from "@/features/component-table";
import {CargoTable} from "@/features/cargo-table";
import {Header} from "@/common/components/header";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {TurretPicker} from "@/features/turret-picker";

export function TurretBuilder() {
    const navigate = useNavigate();
    const turrets = useSelector((state: RootState) => state.turret);

    useLayoutEffect(() => {
        if (!turrets || Object.keys(turrets).length === 0) {
            navigate("/turret-planner/getting-started", { replace: true });
        }
    }, [navigate, turrets]);

    return (
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
                                <Grid key={id} xs={6}>
                                    <TurretItem id={id} turret={turrets[id]}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid xl={5} xs={12}>
                    <Container disableGutters maxWidth={false}>
                        <Stack spacing={1}>
                            <CargoTable/>
                            <ComponentTable/>
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}