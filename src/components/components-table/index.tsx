import {useContext, useEffect, useMemo, useState} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {Box, Card, CardOverflow, Divider, Link, Stack, Table, Typography} from "@mui/joy";
import {ComponentItemType} from "~components/components-table/component-type";
import {ComponentItemQuantity} from "~components/components-table/component-quantity";
import {computationWorker} from "~workers";
import {clearTurrets} from "~reducers/turret.ts";
import {clearComponents} from "~reducers/component.ts";
import {clearCargoComponents} from "~reducers/cargo.ts";
import {clearComponentsCheckbox} from "~reducers/checkbox.ts";
import {computeComponents, initialComputationComponents} from "~utils/computations/price.ts";
import {AnimatePresence, motion} from "framer-motion";
import {useBreakpoint} from "~hooks/breakpoints";
import { Commodity } from "~data/commodities/enums";
import { serializeCommoditites } from "~utils/serialize-commodity";

export function ComponentsTable() {
    const [components, setComponents] = useState<Record<Commodity, number>>({} as Record<Commodity, number>);
    const [computations, setComputations] = useState<ReturnType<typeof computeComponents>>(initialComputationComponents);

    const intlContext = useContext(IntlContext);
    const componentStore = useSelector((state: RootState) => state.component);
    const turretStore = useSelector((state: RootState) => state.turret);
    const cargoStore = useSelector((state: RootState) => state.cargo);
    const worker = useMemo(() => computationWorker, []);
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();

    useEffect(() => {
        async function performComputation() {
            setComponents(await worker.uniteComponents(turretStore, componentStore));
            setComputations(await worker.computeComponents(cargoStore, turretStore, componentStore));
        }

        performComputation().catch(() => {
            dispatch(clearTurrets());
            dispatch(clearComponents());
            dispatch(clearCargoComponents());
            dispatch(clearComponentsCheckbox());
        });
    }, [cargoStore, componentStore, turretStore, worker, dispatch]);

    if (Object.keys(components).length === 0) {
        return null;
    }

    let fontSize: "md" | number = "md";

    if (breakpoint.sm) {
        fontSize = 12;
    }

    return (
        <Card variant="soft" sx={{p: 0, gap: 0, boxShadow: "sm"}}>
            <Typography level="body-lg" fontWeight="bold" textColor="white" sx={{p: 2, pb: 0.1, pt: 3}}>
                {intlContext.text("UI", "cargo-required")}
            </Typography>
            <Divider sx={{mt: 2}}/>
            <AnimatePresence>
                <motion.div
                    style={{overflow: "hidden"}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    layoutId="components-table"
                    layout
                >
                    <Table>
                        <tbody>
                        <AnimatePresence>
                            {(serializeCommoditites(Object.keys(components))).sort((a, b) => a - b).map(type => (
                                <motion.tr
                                    key={type}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    layoutId={`component-row-${type}`}
                                    layout
                                >
                                    <ComponentItemType type={type}/>
                                    <ComponentItemQuantity type={type} value={components[type]}/>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </Table>
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                {(computations.avg > 0 || computations.volume > 0) && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        layout
                    >
                        <CardOverflow variant="soft" color="neutral" sx={{borderRadius: 0}}>
                            <Divider inset="context" sx={{mt: 0}}/>
                            <Stack sx={{width: "100%"}}>
                                <Stack direction="row" justifyContent="space-between" sx={{p: 2, pt: 1, pb: 1}}>
                                    <Typography fontSize={fontSize}
                                                level="body-sm">{intlContext.text("UI", "estimated-price")}</Typography>
                                    <Stack direction="row">
                                        <Typography fontSize={fontSize} level="body-sm">~</Typography>
                                        <Typography fontSize={fontSize}
                                                    level="body-sm">{computations.avg.toLocaleString()}</Typography>
                                    </Stack>
                                </Stack>
                                <Divider/>
                                <Stack direction="row" justifyContent="space-between" sx={{p: 2, pt: 1, pb: 1}}>
                                    <Typography fontSize={fontSize}
                                                level="body-sm">{intlContext.text("UI", "estimated-volume")}</Typography>
                                    <Typography fontSize={fontSize}
                                                level="body-sm">{computations.volume.toLocaleString()}</Typography>
                                </Stack>
                            </Stack>
                        </CardOverflow>
                    </motion.div>
                )}
            </AnimatePresence>

            <Divider/>
            <Box sx={{p: 2}}>
                <Typography level="body-sm">
                    <b>Avorion Tools</b> is a community work, and not officially created or maintained by <Link
                    href="https://boxelware.de/" target="_blank">Boxelware</Link>.
                </Typography>
            </Box>
        </Card>
    );
}