import {TurretState} from "../../turret/types";
import {useContext, useEffect, useState} from "react";
import {Card, CardOverflow, Checkbox, Divider, Grid, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {Component, ComponentInfo} from "../../../constants";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"

interface ComponentListProps {
    list: TurretState[]
}

interface CheckboxState {
    [component: string]: {
        checked: boolean;
        value: number;
    }
}

export function ComponentList(props: ComponentListProps) {
    const [componentStates, setComponentStates] = useState<CheckboxState>({})

    const intlContext = useContext(IntlContext);

    let estimatedPrice = 0
    let volume = 0;

    useEffect(() => {
        const cache = localStorage.getItem("checkboxes");

        if (cache) {
            const parsed = JSON.parse(cache);
            setComponentStates(parsed);
        }
    }, [])

    useEffect(() => {
        if (props.list.length === 0) {
            setComponentStates({});
        }

        for (const turret of props.list) {
            for (const component of turret.components) {
                if (componentStates[component.type]) {
                    const value = (ComponentInfo[component.type].price * component.quantity) * turret.quantity;

                    if (componentStates[component.type].value !== value) {
                        setComponentStates(prevState => ({
                            ...prevState,
                            [component.type]: {
                                value,
                                checked: false,
                            }
                        }))
                    }
                }
            }
        }
    }, [props.list.reduce((acc, turret) => {
        for (const component of turret.components) {
            acc += (ComponentInfo[component.type].price * component.quantity) * turret.quantity;
        }

        return acc;
    }, 0)])

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

        estimatedPrice += turret.price * turret.quantity;

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
                        sx={{textDecoration: componentStates[component]?.checked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip size="sm" arrow title={intlContext.text("UI", "dangerous-cargo")} variant="soft"
                             color="danger"
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
                        sx={{textDecoration: componentStates[component]?.checked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip size="sm" arrow title={intlContext.text("UI", "illegal-cargo")} variant="soft"
                             color="warning"
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
                sx={{textDecoration: componentStates[component]?.checked ? "line-through" : "none"}}
            >
                {intlContext.text("COMPONENT", component)}
            </Typography>
        )
    }

    function onCheckboxCheck(component: string) {
        setComponentStates(prevState => {
            const state = {
                ...prevState,
                [component]: {value: prevState[component]?.value ?? 0, checked: !prevState[component]?.checked ?? true}
            };

            localStorage.setItem("checkboxes", JSON.stringify(state));

            return state;
        });
    }

    return (
        <Card variant="outlined">
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
                </tr>
                </thead>
                <tbody>
                {Object.keys(rows).map((row) => (
                    <tr key={row}>
                        <td>
                            <Checkbox onChange={() => onCheckboxCheck(row)}
                                      checked={componentStates[row]?.checked ?? false}/>
                        </td>
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
                            <Typography color="primary">{rows[row].toLocaleString()}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <CardOverflow variant="soft" color="neutral">
                <Divider inset="context"/>
                <Stack spacing={2} sx={{width: "100%", pt: 2, pb: 2}}>

                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={.5} alignItems="center" justifyContent="space-between">
                            <Typography level="body1">{intlContext.text("UI", "estimated-price")}</Typography>
                            <Tooltip
                                title={intlContext.text("UI", "estimated-price-info")}
                                size="sm"
                                arrow
                                variant="outlined" placement="top">
                                <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                            </Tooltip>
                        </Stack>
                        <Typography level="body1">{estimatedPrice.toLocaleString()}</Typography>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body1">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography level="body1">{volume.toLocaleString()}</Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
        </Card>
    )
}