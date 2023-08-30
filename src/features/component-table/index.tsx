import React, {useContext, useMemo} from "react";
import {Card, CardOverflow, Divider, Grid, Link, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "@/contexts/intl";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"
import {ComponentItem} from "@/features/component-item";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {uniteComponents} from "@/common/utils/transformations/unite-components";
import {ComponentType} from "@/constants/enums/components";
import {computeComponents} from "@/common/utils/computations/price";

export function ComponentTable() {
    const intlContext = useContext(IntlContext);

    const turrets = useSelector((state: RootState) => state.turret);
    const cargo = useSelector((state: RootState) => state.cargo);
    const components = useMemo(() => uniteComponents(turrets), [turrets]);
    const computations = useMemo(() => computeComponents(cargo, turrets), [cargo, turrets]);

    if (Object.keys(turrets).length === 0) return null;

    return (
        <Card variant="outlined">
            <Typography level="h3">{intlContext.text("UI", "cargo-required")}</Typography>
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th style={{width: "2rem"}}/>
                    <th>
                        <Stack direction="row" spacing={.5} alignItems="center">
                            <Typography>{intlContext.text("UI", "component")}</Typography>
                            <Tooltip
                                title={intlContext.text("UI", "component-source-info")}
                                size="sm"
                                arrow
                                variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                    </th>
                    <th style={{width: "25%", textAlign: "right"}}>{intlContext.text("UI", "quantity")}</th>
                    <th style={{width: "4rem"}}></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(components).sort((a, b) => a.localeCompare(b)).map(type => (
                    <ComponentItem key={type} type={type as ComponentType} value={components[type as ComponentType]}/>
                ))}
                </tbody>
            </Table>

            <CardOverflow variant="soft" color="neutral" sx={{ borderRadius: 0 }}>
                <Divider inset="context"/>
                <Stack spacing={2} sx={{width: "100%", pt: 2, pb: 2}}>

                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={.5} alignItems="center" justifyContent="space-between">
                            <Typography level="body-lg">{intlContext.text("UI", "estimated-price")}</Typography>
                            <Tooltip
                                title={intlContext.text("UI", "estimated-price-info")}
                                size="sm"
                                arrow
                                variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography level="body-lg">~</Typography>
                            <Stack direction="row">
                                <Typography level="body-lg">¢</Typography>
                                <Typography
                                    level="body-lg">{computations.avg.toLocaleString()}</Typography>
                            </Stack>
                            <Tooltip size="sm" arrow title={(
                                <Stack direction="row" spacing={1}>
                                    <Stack direction="row">
                                        <Typography level="body-lg">¢</Typography>
                                        <Typography
                                            level="body-lg">{computations.min.toLocaleString()}</Typography>
                                    </Stack>
                                    <Typography level="body-lg">-</Typography>
                                    <Stack direction="row">
                                        <Typography level="body-lg">¢</Typography>
                                        <Typography
                                            level="body-lg">{computations.max.toLocaleString()}</Typography>
                                    </Stack>
                                </Stack>
                            )} variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body-lg">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography
                            level="body-lg">{computations.volume.toLocaleString()}</Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
            <Stack>
                <Typography>Avorion Tools is a community work, and not officially created or maintained by <Link href="https://boxelware.de/" target="_blank">Boxelware</Link>.</Typography>
            </Stack>
        </Card>
    )
}