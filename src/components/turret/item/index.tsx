import {TurretState} from "../types";
import {Box, Button, Card, CardContent, Divider, Input, Stack, Typography} from "@mui/joy";
import {Delete as DeleteIcon} from "@mui/icons-material"
import {useContext} from "react";
import {IntlContext} from "../../../contexts/intl";

interface TurretItemProps {
    turret: TurretState;

    onComponentChange(tKey: string, cKey: string, value: string | null): void;

    onRemoveTurret(tKey: string): void;

    onTurretQuantityChange(tKey: string, value: string | null): void;
}

export function TurretItem(props: TurretItemProps) {
    const intlContext = useContext(IntlContext);

    return (
        <Card key={props.turret.key}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={4}>
                    <Stack>
                        <Typography level="h3">{intlContext.text("TURRET", props.turret.type)}</Typography>
                        <Typography level="body2">
                            {intlContext.text("UI", "recipe-for-version")} {props.turret.version}
                        </Typography>
                    </Stack>
                    <Input startDecorator={(
                        <Stack direction="row" spacing={1}>
                            <Typography level="body2">{intlContext.text("UI", "quantity")}</Typography>
                            <Divider orientation="vertical"/>
                        </Stack>
                    )} type="number" value={props.turret.quantity}
                           onChange={(e) => props.onTurretQuantityChange(props.turret.key, e.target.value)}/>
                </Stack>
                <Button variant="soft" color="danger" title={intlContext.text("UI", "remove-turret")}
                        onClick={() => props.onRemoveTurret(props.turret.key)}><DeleteIcon/></Button>
            </Stack>
            <Divider/>
            <CardContent>
                {props.turret.components.map(component => (
                    <Box key={component.key} sx={{p: 1}}>
                        <Input startDecorator={(
                            <Stack direction="row" spacing={1}>
                                <Typography level="body2"
                                            sx={{minWidth: "14rem"}}>{intlContext.text("COMPONENT", component.type)}</Typography>
                                <Divider orientation="vertical"/>
                            </Stack>
                        )} type="number" value={component.quantity}
                               onChange={(e) => props.onComponentChange(props.turret.key, component.key, e.target.value)}/>
                    </Box>
                ))}
            </CardContent>
        </Card>
    )
}