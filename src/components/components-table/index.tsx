import {useContext, useEffect, useMemo, useState} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {Box, Card, CardOverflow, Divider, Link, Stack, Table, Typography} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {ComponentItemType} from "~components/components-table/component-type";
import {ComponentItemQuantity} from "~components/components-table/component-quantity";
import {ComponentItemAction} from "~components/components-table/component-action";
import {computationWorker} from "~workers";
import {clearTurrets} from "~reducers/turret.ts";
import {clearComponents} from "~reducers/component.ts";
import {clearCargoComponents} from "~reducers/cargo.ts";
import {clearComponentsCheckbox} from "~reducers/checkbox.ts";

export function ComponentsTable() {
    const [components, setComponents] = useState<Record<ComponentType, number>>({} as Record<ComponentType, number>)
    const [computations, setComputations] = useState<{ min: number, max: number, avg: number, volume: number }>({
        min: 0,
        max: 0,
        avg: 0,
        volume: 0
    })

    const intlContext = useContext(IntlContext);
    const componentStore = useSelector((state: RootState) => state.component);
    const turretStore = useSelector((state: RootState) => state.turret);
    const cargoStore = useSelector((state: RootState) => state.cargo);
    const worker = useMemo(() => computationWorker, []);
    const dispatch = useDispatch();

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

    return (
        <Card variant="outlined" sx={{p: 0, gap: 0, boxShadow: "sm"}}>
            <Typography level="body-lg" fontWeight="bold" textColor="white" sx={{p: 2, pb: 1, pt: 3}}>
                {intlContext.text("UI", "cargo-required")}
            </Typography>
            <Divider sx={{mt: 2}}/>
            <Table>
                <thead>
                <tr>
                    <th style={{width: "32px", height: "max-content"}}/>
                    <th style={{paddingLeft: 0, paddingRight: 0, height: "max-content"}}>
                        <Typography>{intlContext.text("UI", "component")}</Typography>
                    </th>
                    <th style={{
                        textAlign: "right",
                        paddingLeft: 0,
                        paddingRight: 0,
                        height: "max-content"
                    }}>{intlContext.text("UI", "quantity")}</th>
                    <th style={{width: "40px", height: "max-content"}}></th>
                </tr>
                </thead>
                <tbody>
                {(Object.keys(components) as ComponentType[]).sort((a, b) => a.localeCompare(b)).map(type => (
                    <tr key={type}>
                        <ComponentItemType type={type}/>
                        <ComponentItemQuantity type={type} value={components[type]}/>
                        <ComponentItemAction type={type}/>
                    </tr>
                ))}
                </tbody>
            </Table>
            <CardOverflow variant="soft" color="neutral" sx={{borderRadius: 0}}>
                <Divider inset="context" sx={{mt: 0}}/>
                <Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{p: 1}}>
                        <Typography level="body-sm">{intlContext.text("UI", "estimated-price")}</Typography>
                        <Stack direction="row">
                            <Typography level="body-sm">~¢</Typography>
                            <Typography level="body-sm">{computations.avg.toLocaleString()}</Typography>
                        </Stack>
                    </Stack>
                    <Divider/>
                    <Stack direction="row" justifyContent="space-between" sx={{p: 1}}>
                        <Typography level="body-sm">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography level="body-sm">{computations.volume.toLocaleString()}</Typography>
                    </Stack>
                </Stack>
            </CardOverflow>
            <Box sx={{p: 1}}>
                <Typography level="body-sm">
                    <b>Avorion Tools</b> is a community work, and not officially created or maintained by <Link
                    href="https://boxelware.de/" target="_blank">Boxelware</Link>.
                </Typography>
            </Box>
        </Card>
    )
}