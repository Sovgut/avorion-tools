import {useContext} from "react";
import {Card, CardOverflow, Divider, Grid, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../contexts/intl";
import {Component} from "../../constants";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"
import {ComponentItem} from "../component-item";
import {TurretContext} from "../../contexts/turret";
import {ComponentContext} from "../../contexts/component";
import {CalculatorContext} from "../../contexts/calculator";

export function ComponentTable() {
    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);
    const componentContext = useContext(ComponentContext);
    const calculatorContext = useContext(CalculatorContext);

    if (turretContext.records.length === 0) return null;

    const rows = turretContext.records.reduce((acc, turret) => {
        for (const component of componentContext.turretComponents(turret.id)) {
            if (!acc[component.type]) {
                acc[component.type] = component.quantity * turret.quantity;
            } else {
                acc[component.type] += component.quantity * turret.quantity;
            }
        }

        return acc;
    }, {} as Record<string, number>);

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
                {Object.keys(rows).sort((a, b) => a.localeCompare(b)).map((row) => (
                    <ComponentItem key={row}
                                   type={row as Component}
                                   value={rows[row]}/>
                ))}
                </tbody>
            </Table>

            <CardOverflow variant="soft" color="neutral">
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
                        <Stack direction="row" spacing={1}>
                            <Typography level="body-lg">¢</Typography>
                            <Typography
                                level="body-lg">{calculatorContext.estimation("price").min.toLocaleString()}</Typography>
                            <Typography level="body-lg">-</Typography>
                            <Typography
                                level="body-lg">{calculatorContext.estimation("price").max.toLocaleString()}</Typography>
                        </Stack>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body-lg">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography
                            level="body-lg">{calculatorContext.estimation("volume").volume.toLocaleString()}</Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
        </Card>
    )
}