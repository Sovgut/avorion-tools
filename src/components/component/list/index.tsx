import {TurretState} from "../../turret/types";
import {useContext, useEffect, useRef, useState} from "react";
import {Card, CardOverflow, Divider, Grid, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {Component, ComponentInfo} from "../../../constants";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"
import {ListItem} from "../item";

interface ComponentListProps {
    list: TurretState[]
}

type ComponentState = {
    [type in Component]: {
        quantity: number;
        price: number;
        volume: number;
    };
}

export function ComponentList(props: ComponentListProps) {
    const [cargo, setCargo] = useState<Partial<ComponentState>>({});
    const intlContext = useContext(IntlContext);

    const isFirstRender = useRef(true);

    let estimatedPrice = 0;
    let turretsPrice = 0;
    let volume = 0;

    useEffect(() => {
        const cache = localStorage.getItem("cargo");

        if (cache) {
            const parsed = JSON.parse(cache);

            setCargo(parsed);
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (props.list.length === 0) {
            localStorage.removeItem("cargo")

            setCargo({});
        }
    }, [props.list.length]);

    if (props.list.length === 0) return null;

    const rows = props.list.reduce((acc, turret) => {
        for (const component of turret.components) {
            if (!acc[component.type]) {
                acc[component.type] = component.quantity * turret.quantity;
            } else {
                acc[component.type] += component.quantity * turret.quantity;
            }

            estimatedPrice += ComponentInfo[component.type].price * acc[component.type];
            volume += ComponentInfo[component.type].volume * acc[component.type];
        }

        turretsPrice += turret.price * turret.quantity;

        return acc;
    }, {} as any);

    function onCargoChange(cType: string, value: string | null) {
        const quantity = Number(value) || 0;

        if (quantity >= 0) {
            setCargo(prevState => {
                const state = {
                    ...prevState,
                    [cType]: {
                        quantity: quantity,
                        price: ComponentInfo[cType as Component].price * quantity,
                        volume: ComponentInfo[cType as Component].volume * quantity,
                    }
                }

                localStorage.setItem("cargo", JSON.stringify(state));

                return state;
            });
        }
    }

    function getCargoEstimatedAttribute(attr: "price" | "volume") {
        return Object.keys(cargo).reduce((acc, cur) => {
            const attribute = cargo[cur as Component]?.[attr] ?? 0;

            return acc + attribute
        }, 0)
    }

    function calculateMinPrice() {
        const value = (estimatedPrice - getCargoEstimatedAttribute("price")) + turretsPrice

        return value > 0 ? value : 0
    }

    function calculateMaxPrice() {
        const percentage = 3.00; // 300%
        const value = ((estimatedPrice + estimatedPrice * percentage) - (getCargoEstimatedAttribute("price") + getCargoEstimatedAttribute("price") * percentage)) + turretsPrice;

        return value > 0 ? value : 0
    }

    function calculateVolume() {
        const value = volume - getCargoEstimatedAttribute("volume")

        return value > 0 ? value : 0
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
                    <ListItem key={row} type={row as Component} value={rows[row]} onCargoChange={onCargoChange}
                              cargo={cargo[row as Component]?.quantity}/>
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
                        <Stack direction="row" spacing={1}>
                            <Typography level="body1">¢</Typography>
                            <Typography
                                level="body1">{calculateMinPrice().toLocaleString()}</Typography>
                            <Typography level="body1">-</Typography>
                            <Typography
                                level="body1">{calculateMaxPrice().toLocaleString()}</Typography>
                        </Stack>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body1">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography
                            level="body1">{calculateVolume().toLocaleString()}</Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
        </Card>
    )
}