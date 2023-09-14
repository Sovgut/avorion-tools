import {Box, Container, IconButton, Stack} from "@mui/joy";
import {useContext, useEffect, useState} from "react";
import {Header} from "~components/header";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {Turret} from "~components/turret-item";
import {clsx} from "clsx";
import styles from './styles.module.css';
import {TurretPicker} from "~components/turret-picker";
import {ClearAll} from "@mui/icons-material";
import {clearTurrets} from "~reducers/turret";
import {IntlContext} from "~contexts/intl";
import {ComponentsTable} from "~components/components-table";
import {CargoTable} from "~components/cargo-table";
import {clearComponents} from "~reducers/component.ts";
import {clearComponentsCheckbox} from "~reducers/checkbox.ts";

export function TurretPlannerPage() {
    const [isClosePage, setClose] = useState(false);

    const intlContext = useContext(IntlContext);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const turretStore = useSelector((state: RootState) => state.turret);

    useEffect(() => {
        if (Object.keys(turretStore.entities).length === 0) {
            setClose(true);

            const timeoutId = setTimeout(() => {
                window.scrollTo(0, 0);
                navigate("/turret-planner/getting-started", {replace: true});
            }, 150);

            return function cleanup() {
                clearTimeout(timeoutId);
            }
        }
    }, [navigate, turretStore]);

    const animationClasses = clsx({
        [styles.animation]: true,
        [styles.close]: isClosePage,
    });

    function handleClearTurrets() {
        dispatcher(clearTurrets());
        dispatcher(clearComponents());
        dispatcher(clearComponentsCheckbox());
    }

    return (
        <Container maxWidth={false} sx={{pb: 2}} className={styles.component}>
            <Header disableGutters/>

            <Box className={animationClasses}>
                <Stack direction="row" spacing={1}>
                    <Box sx={{width: "100%"}}>
                        <TurretPicker/>
                    </Box>
                    <IconButton color="danger"
                                variant="soft"
                                title={intlContext.text("UI", "clear-turrets")}
                                onClick={handleClearTurrets}>
                        <ClearAll/>
                    </IconButton>
                </Stack>

                <Box className={styles.layout}>
                    <Box className={styles.itemsList}>
                        {Object.keys(turretStore.entities).map(id => (
                            <Box key={id} className={styles.item}>
                                <Turret id={id} entity={turretStore.entities[id]}/>
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