import {useContext} from "react";
import {Card, CardOverflow, Divider, Grid, Stack, Table, Tooltip, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {InfoOutlined as InfoIcon} from "@mui/icons-material"
import {ListItem} from "../item";
import {ComponentContext} from "../../../contexts/components";
import {ComponentsCalculationsContext} from "../../../contexts/components-calculations";

export function ComponentList() {
    const intlContext = useContext(IntlContext);
    const componentContext = useContext(ComponentContext);
    const calculationContext = useContext(ComponentsCalculationsContext);

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
                {componentContext.flat().map((component) => (
                    <ListItem key={component} type={component}/>
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
                                level="body1">{calculationContext.calculateMinPrice().toLocaleString()}</Typography>
                            <Typography level="body1">-</Typography>
                            <Typography
                                level="body1">{calculationContext.calculateMaxPrice().toLocaleString()}</Typography>
                        </Stack>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body1">{intlContext.text("UI", "estimated-volume")}</Typography>
                        <Typography
                            level="body1">{calculationContext.calculateVolume().toLocaleString()}</Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
        </Card>
    )
}