import {TurretState} from "../../turret/types";
import {useContext} from "react";
import {Card, CardOverflow, Divider, Grid, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {Component, ComponentInfo} from "../../../constants";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"
import {ListItem} from "../item";

interface ComponentListProps {
    list: TurretState[]
}


export function ComponentList(props: ComponentListProps) {
    const intlContext = useContext(IntlContext);

    let estimatedPrice = 0;
    let volume = 0;

    // useEffect(() => {
    //     if (props.list.length === 0) {
    //         return setComponentStates({});
    //     }
    //
    //     setComponentStates((prevState) => {
    //         for (const turret of props.list) {
    //             for (const component of turret.components) {
    //                 const value = (ComponentInfo[component.type].price * component.quantity) * turret.quantity;
    //
    //                 if (componentStates[component.type]) {
    //                     if (componentStates[component.type].value !== value) {
    //                         prevState[component.type] = {
    //                             value,
    //                             checked: false,
    //                         }
    //                     }
    //                 } else {
    //                     prevState[component.type] = {
    //                         value,
    //                         checked: false,
    //                     }
    //                 }
    //             }
    //         }
    //
    //         console.log(prevState)
    //
    //         return prevState;
    //     });
    // }, [props.list.reduce((acc, turret) => {
    //     for (const component of turret.components) {
    //         acc += (ComponentInfo[component.type].price * component.quantity) * turret.quantity;
    //     }
    //
    //     return acc;
    // }, 0)])

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
                    <ListItem key={row} type={row as Component} value={rows[row]}/>
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