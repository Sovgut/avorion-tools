import React, {useContext, useMemo} from "react";
import {IntlContext} from "@/contexts/intl";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {uniteComponents} from "@/common/utils/transformations/unite-components";
import {computeComponents} from "@/common/utils/computations/price";
import {Box, Card, CardOverflow, Divider, Link, Stack, Table, Typography} from "@mui/joy";
import {ComponentType} from "@/constants/enums/components";
import {ComponentItemType} from "@/components/components-table/component-type";
import {ComponentItemQuantity} from "@/components/components-table/component-quantity";
import {ComponentItemAction} from "@/components/components-table/component-action";

export function ComponentsTable() {
    const intlContext = useContext(IntlContext);

    const turrets = useSelector((state: RootState) => state.turret);
    const cargo = useSelector((state: RootState) => state.cargo);
    const components = useMemo(() => uniteComponents(turrets), [turrets]);
    const computations = useMemo(() => computeComponents(cargo, turrets), [cargo, turrets]);

    if (Object.keys(components).length === 0) {
        return null;
    }

    return (
        <Card variant="outlined" sx={{p: 0, mb: 2, gap: 0}}>
            <Typography level="body-lg" fontWeight="bold" textColor="white" sx={{p: 2, pb: 0}}>
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
                        width: "calc(40% - 40px - 32px)",
                        textAlign: "right",
                        paddingLeft: 0,
                        paddingRight: 0,
                        height: "max-content"
                    }}>{intlContext.text("UI", "quantity")}</th>
                    <th style={{width: "40px", height: "max-content"}}></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(components).sort((a, b) => a.localeCompare(b)).map(type => (
                    <tr key={type}>
                        <ComponentItemType type={type as ComponentType}/>
                        <ComponentItemQuantity type={type as ComponentType} value={components[type as ComponentType]}/>
                        <ComponentItemAction type={type as ComponentType}/>
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
                    Avorion Tools is a community work, and not officially created or maintained by <Link
                    href="https://boxelware.de/" target="_blank">Boxelware</Link>.
                </Typography>
            </Box>
        </Card>
    )
}