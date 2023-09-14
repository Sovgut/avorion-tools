import {useContext, useEffect, useMemo, useState} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {Box, Card, CardOverflow, Divider, Link, Stack, Table, Typography} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {ComponentItemType} from "~components/components-table/component-type";
import {ComponentItemQuantity} from "~components/components-table/component-quantity";
import {computationWorker} from "~workers";
import {clearTurrets} from "~reducers/turret.ts";
import {clearComponents} from "~reducers/component.ts";
import {clearCargoComponents} from "~reducers/cargo.ts";
import {clearComponentsCheckbox} from "~reducers/checkbox.ts";
import styles from './styles.module.css';
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
import {computeComponents, initialComputationComponents} from "~utils/computations/price.ts";

export function ComponentsTable() {
    const [components, setComponents] = useState<Record<ComponentType, number>>({} as Record<ComponentType, number>)
    const [computations, setComputations] = useState<ReturnType<typeof computeComponents>>(initialComputationComponents);

    const theme = useTheme();
    const intlContext = useContext(IntlContext);
    const componentStore = useSelector((state: RootState) => state.component);
    const turretStore = useSelector((state: RootState) => state.turret);
    const cargoStore = useSelector((state: RootState) => state.cargo);
    const worker = useMemo(() => computationWorker, []);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

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

    let fontSize: 'md' | number = 'md';

    if (isSmallScreen) {
        fontSize = 12;
    }

    return (
        <Card className={styles.animation} variant="outlined" sx={{p: 0, gap: 0, boxShadow: "sm"}}>
            <Typography level="body-lg" fontWeight="bold" textColor="white" sx={{p: 2, pb: 1, pt: 3}}>
                {intlContext.text("UI", "cargo-required")}
            </Typography>
            <Divider sx={{mt: 2}}/>
            <Table>
                <tbody>
                {(Object.keys(components) as ComponentType[]).sort((a, b) => a.localeCompare(b)).map(type => (
                    <tr key={type}>
                        <ComponentItemType type={type}/>
                        <ComponentItemQuantity type={type} value={components[type]}/>
                    </tr>
                ))}
                </tbody>
            </Table>
            {(computations.avg > 0 || computations.volume > 0) && (
                <CardOverflow variant="soft" color="neutral" sx={{borderRadius: 0}}>
                    <Divider inset="context" sx={{mt: 0}}/>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{p: 1}}>
                            <Typography fontSize={fontSize}
                                        level="body-sm">{intlContext.text("UI", "estimated-price")}</Typography>
                            <Stack direction="row">
                                {computations.avg > 0 && (
                                    <Typography fontSize={fontSize} level="body-sm">~</Typography>
                                )}
                                <Typography fontSize={fontSize}
                                            level="body-sm">{computations.avg.toLocaleString()}</Typography>
                            </Stack>
                        </Stack>
                        <Divider/>
                        <Stack direction="row" justifyContent="space-between" sx={{p: 1}}>
                            <Typography fontSize={fontSize}
                                        level="body-sm">{intlContext.text("UI", "estimated-volume")}</Typography>
                            <Typography fontSize={fontSize}
                                        level="body-sm">{computations.volume.toLocaleString()}</Typography>
                        </Stack>
                    </Stack>
                </CardOverflow>
            )}

            <Divider/>
            <Box sx={{p: 1}}>
                <Typography level="body-sm">
                    <b>Avorion Tools</b> is a community work, and not officially created or maintained by <Link
                    href="https://boxelware.de/" target="_blank">Boxelware</Link>.
                </Typography>
            </Box>
        </Card>
    )
}