import {Box, Button, Container, Stack} from "@mui/joy";
import React, {useContext, useEffect, useState} from "react";
import {Header} from "components/header";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {TurretItem} from "@/components/turret-item";
import {ComponentsTable} from "@/components/components-table";
import {CargoTable} from "@/components/cargo-table";
import {clsx} from "clsx";
import styles from './styles.module.css';
import {TurretPicker} from "@/components/turret-picker";
import {ClearAll} from "@mui/icons-material";
import {resetTurrets} from "@/reducers/turret";
import {IntlContext} from "@/contexts/intl";

export function TurretPlannerPage() {
    const [isClosePage, setClose] = useState(false);

    const intlContext = useContext(IntlContext);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const turrets = useSelector((state: RootState) => state.turret);

    useEffect(() => {
        if (!turrets || Object.keys(turrets).length === 0) {
            setClose(true);

            const timeoutId = setTimeout(() => {
                window.scrollTo(0, 0);
                navigate("/turret-planner/getting-started", {replace: true});
            }, 150);

            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [navigate, turrets]);

    const animationClasses = clsx({
        [styles.animation]: true,
        [styles.close]: isClosePage,
    });

    function handleClearTurrets() {
        dispatcher(resetTurrets());
    }

    return (
        <Container maxWidth={false} sx={{pb: 2}} className={styles.desktop}>
            <Header disableGutters/>

            <Box className={animationClasses}>
                <Stack direction="row" spacing={1}>
                    <Box sx={{width: "100%"}}>
                        <TurretPicker/>
                    </Box>
                    <Button color="danger"
                            variant="soft"
                            title={intlContext.text("UI", "clear-turrets")}
                            onClick={handleClearTurrets}>
                        <ClearAll/>
                    </Button>
                </Stack>

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
            </Box>
        </Container>
    )
}