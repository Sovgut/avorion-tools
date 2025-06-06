import { Box, Container, IconButton, Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~store";
import { Turret } from "~components/turret-item";
import { clsx } from "clsx";
import { TurretPicker } from "~components/turret-picker";
import { CancelOutlined } from "@mui/icons-material";
import { deleteTurret } from "~reducers/turret";
import { ComponentsTable } from "~components/components-table";
import { CargoTable } from "~components/cargo-table";
import { deleteComponent } from "~reducers/component.ts";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationControlContext } from "~contexts/animation-control";
import { PAGE_ANIMATION_EXIT, PAGE_ANIMATION_INITIAL } from "~constants/common.ts";
import { deleteTab, setCurrentTab } from "~reducers/tab";

import styles from "./styles.module.css";

export function TurretPlannerPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const turretStore = useSelector((state: RootState) => state.turret);
    const componentStore = useSelector((state: RootState) => state.component);
    const tabStore = useSelector((state: RootState) => state.tab);
    const controls = useContext(AnimationControlContext);

    useEffect(() => {
        if ((!tabStore.current || tabStore.current === null) && tabStore.entities.length !== 0) {
            dispatch(setCurrentTab(tabStore.entities[0]));
        } else if (tabStore.entities.length === 0) {
            window.scrollTo(0, 0);
            navigate("/turret-planner/getting-started", { replace: true });
        }
    }, [navigate, tabStore, dispatch]);

    const animationClasses = clsx({
        [styles.animation]: true,
    });

    const tabTurrets = useMemo(() => {
        if (!tabStore.current) return [];

        return turretStore.entities.filter((turret) => {
            return tabStore.current?.id === turret.tab_id;
        })
    }, [tabStore.current, turretStore, tabStore]);
    const tabComponents = useMemo(() => {
        return componentStore.entities.filter((component) => {
            return tabTurrets.some((turret) => turret.id === component.turret_id);
        })
    }, [tabStore.current, tabTurrets, componentStore]);

    const onTabRemove = useCallback((tabId: string) => {
        const accepted = window.confirm("Are you sure to remove this tab? All turrets and components in this tab will be deleted.");
        if (!accepted) return;

        if (tabId === tabStore.current?.id) {
            const otherTabs = tabStore.entities.filter(tab => tab.id !== tabId);
            if (otherTabs.length > 0) {
                dispatch(setCurrentTab(otherTabs[0]));
            } else {
                dispatch(setCurrentTab(null));
            }
        }

        const tabTurrets = turretStore.entities.filter(turret => turret.tab_id === tabId);
        const tabComponents = componentStore.entities.filter(component => {
            return tabTurrets.some(turret => turret.id === component.turret_id);
        });

        tabTurrets.forEach(turret => {
            dispatch(deleteTurret(turret.id));
        });

        tabComponents.forEach(component => {
            dispatch(deleteComponent(component.id));
        });

        dispatch(deleteTab(tabId));
    }, [dispatch, tabStore, turretStore, componentStore]);

    return (
        <motion.div
            animate={controls}
            initial={PAGE_ANIMATION_INITIAL}
            exit={PAGE_ANIMATION_EXIT}
        >
            <Container sx={{ pb: 2, mt: 2 }} className={styles.component}>
                <Stack className={animationClasses} spacing={2} direction="column">
                    <Stack direction="row" spacing={1}>
                        <Box sx={{ width: "100%" }}>
                            <TurretPicker variant="soft" />
                        </Box>
                    </Stack>

                    <Box className={styles.layout}>
                        <Tabs aria-label="Turret tabs" sx={{ borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }} value={tabStore.current?.id} onChange={(_e, value) => {
                            const selectedTab = tabStore.entities.find(tab => tab.id === value);
                            if (selectedTab) {
                                dispatch(setCurrentTab(selectedTab));
                            }
                        }}>
                            <TabList sx={{ overflow: 'auto', scrollSnapType: 'x mandatory' }}>
                                {tabStore.entities.map((tab) => (
                                    <Tab value={tab.id} component="div" role="button" key={tab.id} sx={{ flex: 'none', scrollSnapAlign: 'start' }}>
                                        <Typography fontWeight={tabStore.current?.id === tab.id ? "600" : "400"}>
                                            {tab.name}
                                        </Typography>

                                        <IconButton 
                                            color="danger"
                                            variant="plain"
                                            
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onTabRemove(tab.id);
                                            }}
                                            title={"Remove tab"}>
                                            <CancelOutlined />
                                        </IconButton>
                                    </Tab>
                                ))}
                            </TabList>

                            {tabStore.entities.map((tab) => (
                                <TabPanel value={tab.id} key={tab.id}>
                                    <Box className={styles.tableList}>
                                        <Box className={styles.table}>
                                            <ComponentsTable turrets={tabTurrets} components={tabComponents} />
                                        </Box>
                                        <Box className={styles.table}>
                                            <CargoTable />
                                        </Box>
                                    </Box>

                                    <Box className={styles.itemsList}>
                                        <AnimatePresence>
                                            {tabTurrets.map((entity) => (
                                                <motion.div
                                                    key={entity.id}
                                                    initial={{ opacity: 0, scale: .7 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: .7 }}
                                                    className={styles.item}
                                                    layout
                                                >
                                                    <Turret entity={entity} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </Box>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </Box>
                </Stack>
            </Container>
        </motion.div>
    );
}
