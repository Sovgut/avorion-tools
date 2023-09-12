import {Box, Container} from "@mui/joy";
import React, {Fragment, useLayoutEffect} from "react";
import {Header} from "@/common/components/header";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {TurretPicker} from "@/features/turret-picker";
import {VideoBackground} from "@/common/components/video-background";
import styles from './styles.module.css';
import {TurretItem} from "@/features/turret-item";
import {ComponentsTable} from "@/components/components-table";
import {CargoTable} from "@/components/cargo-table";

export function TurretPlannerPage() {
    const navigate = useNavigate();
    const turrets = useSelector((state: RootState) => state.turret);

    useLayoutEffect(() => {
        if (!turrets || Object.keys(turrets).length === 0) {
            navigate("/turret-planner/getting-started", {replace: true});
        }
    }, [navigate, turrets]);

    return (
        <Fragment>
            <VideoBackground/>
            <Container maxWidth={false} sx={{pb: 2}} className={styles.desktop}>
                <Header disableGutters/>
                <TurretPicker clearable/>

                <Box className={styles.layout}>
                    <Box className={styles.itemsList}>
                        {Object.keys(turrets).map(id => (
                            <Box key={id} className={styles.item}>
                                <TurretItem id={id} turret={turrets[id]}/>
                            </Box>
                        ))}
                    </Box>
                    <Box className={styles.tableList}>
                        <Box className={styles.table}><ComponentsTable/></Box>
                        <Box className={styles.table}><CargoTable/></Box>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}