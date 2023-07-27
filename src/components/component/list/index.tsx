import {TurretState} from "../../turret/types";
import {useContext, useEffect} from "react";
import {Sheet, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {Component, ComponentInfo} from "../../../constants";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"

interface ComponentListProps {
    list: TurretState[]
}

export function ComponentList(props: ComponentListProps) {
    const intlContext = useContext(IntlContext);

    let estimatedPrice = 0
    let volume = 0;

    useEffect(() => {
    }, [props.list]);

    if (props.list.length === 0) return null;

    const rows = props.list.reduce((acc, turret) => {
        for (const component of turret.components) {
            if (!acc[component.type]) {
                acc[component.type] = component.quantity * turret.quantity;
            } else {
                acc[component.type] += component.quantity * turret.quantity;
            }

            estimatedPrice += (ComponentInfo[component.type].price * component.quantity) * turret.quantity;
            volume += (ComponentInfo[component.type].volume * component.quantity) * turret.quantity;
        }

        estimatedPrice += turret.price * turret.quantity

        return acc;
    }, {} as any);

    function getComponentColor(component: string) {
        if (ComponentInfo[component as Component].dangerous) return "danger";
        if (ComponentInfo[component as Component].illegal) return "warning";

        return undefined;
    }

    function getComponentComponent(component: string) {
        if (ComponentInfo[component as Component].dangerous) {
            return (
                <Stack direction="row" spacing={.5} alignItems="center">
                    <Typography
                        level="h6"
                        color={getComponentColor(component)}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip arrow title={intlContext.text("UI", "dangerous-cargo")} variant="soft" color="danger"
                             placement="top">
                        <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                    </Tooltip>
                </Stack>
            )
        }

        if (ComponentInfo[component as Component].illegal) {
            return (
                <Stack direction="row" spacing={.5} alignItems="center">
                    <Typography
                        level="h6"
                        color={getComponentColor(component)}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip arrow title={intlContext.text("UI", "illegal-cargo")} variant="soft" color="warning"
                             placement="top">
                        <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                    </Tooltip>
                </Stack>
            )
        }

        return (
            <Typography
                level="h6"
                color={getComponentColor(component)}
            >
                {intlContext.text("COMPONENT", component)}
            </Typography>
        )
    }

    return (
        <Sheet variant="outlined">
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th>
                        <Stack direction="row" spacing={.5} alignItems="center">
                            <Typography>{intlContext.text("UI", "component")}</Typography>
                            <Tooltip
                                title={intlContext.text("UI", "component-source-info")}
                                arrow
                                variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                    </th>
                    <th style={{width: "25%", textAlign: "right"}}>{intlContext.text("UI", "quantity")}</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(rows).map((row) => (
                    <tr key={row}>
                        <td>
                            {getComponentComponent(row)}
                            <Stack spacing={1} direction="row">
                                {ComponentInfo[row as Component].soldBy.map(station => (
                                    <Typography key={row + station} level="body3">
                                        {intlContext.text("STATION", station)}
                                    </Typography>
                                ))}
                            </Stack>
                        </td>
                        <td style={{textAlign: "right"}}>
                            <Typography color="primary">{rows[row]}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>
                        <Stack direction="row" spacing={.5} alignItems="center">
                            <Typography>{intlContext.text("UI", "estimated-price")}</Typography>
                            <Tooltip
                                title={intlContext.text("UI", "estimated-price-info")}
                                arrow
                                variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                    </th>
                    <th style={{textAlign: "right"}}>{estimatedPrice.toLocaleString()}</th>
                </tr>
                <tr>
                    <th>{intlContext.text("UI", "estimated-volume")}</th>
                    <th style={{textAlign: "right"}}>{volume.toLocaleString()}</th>
                </tr>
                </tfoot>
            </Table>
        </Sheet>
    )
}