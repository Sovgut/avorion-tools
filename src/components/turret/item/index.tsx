import {TurretState} from "../types";
import {Button, Card, CardContent, Divider, Input, Menu, MenuItem, Stack, Typography} from "@mui/joy";
import {MoreVert as MoreIcon} from "@mui/icons-material"
import {useContext, useRef, useState} from "react";
import {IntlContext} from "../../../contexts/intl";
import styles from "./styles.module.css";

interface TurretItemProps {
    turret: TurretState;

    onComponentChange(tKey: string, cKey: string, value: string | null): void;

    onRemoveTurret(tKey: string): void;

    onTurretQuantityChange(tKey: string, value: string | null): void;

    onTurretPriceChange(tKey: string, value: string | null): void;
}

export function TurretItem(props: TurretItemProps) {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef(null);

    const intlContext = useContext(IntlContext);

    function onRemove() {
        setOpen(false);

        props.onRemoveTurret(props.turret.key)
    }

    function onClose() {
        setOpen(false);
    }

    function onOpen() {
        setOpen(!open);
    }

    return (
        <Card key={props.turret.key} sx={{height: "100%"}} variant="outlined">
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <img className={styles.icon} src={props.turret.icon} alt={props.turret.type}/>
                    <Typography level="h5">{intlContext.text("TURRET", props.turret.type)}</Typography>
                </Stack>
                <Button
                    variant="plain"
                    color="neutral"
                    title={intlContext.text("UI", "remove-turret")}
                    sx={{height: "3rem", width: "3rem"}}
                    ref={buttonRef}
                    id={`basic-${props.turret.key}-menu`}
                    aria-controls={`basic-${props.turret.key}-menu`}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={onOpen}
                >
                    <MoreIcon/>
                </Button>
            </Stack>
            <Divider/>
            <CardContent>
                <Stack spacing={2}>
                    <Stack spacing={2} direction="row" justifyContent="space-between">
                        <Input sx={{width: "100%"}} startDecorator={(
                            <Stack direction="row" spacing={1}>
                                <Typography level="body2">{intlContext.text("UI", "quantity")}</Typography>
                                <Divider orientation="vertical"/>
                            </Stack>
                        )} type="number" value={props.turret.quantity}
                               onChange={(e) => props.onTurretQuantityChange(props.turret.key, e.target.value)}/>
                        <Input sx={{width: "100%"}} startDecorator={(
                            <Stack direction="row" spacing={1}>
                                <Typography level="body2">{intlContext.text("UI", "turret-price")}</Typography>
                                <Divider orientation="vertical"/>
                            </Stack>
                        )} type="number" value={props.turret.price}
                               onChange={(e) => props.onTurretPriceChange(props.turret.key, e.target.value)}/>
                    </Stack>
                    <Divider/>
                    <Stack spacing={2}>
                        <Typography>{intlContext.text("UI", "components")}</Typography>
                        <Stack spacing={2}>
                            {props.turret.components.map(component => (
                                <Input key={component.key} startDecorator={(
                                    <Stack direction="row" spacing={1}>
                                        <Typography level="body2"
                                                    sx={{minWidth: "14rem"}}>{intlContext.text("COMPONENT", component.type)}</Typography>
                                        <Divider orientation="vertical"/>
                                    </Stack>
                                )} type="number" value={component.quantity}
                                       onChange={(e) => props.onComponentChange(props.turret.key, component.key, e.target.value)}/>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
            <Menu
                id={`basic-${props.turret.key}-menu`}
                anchorEl={buttonRef.current}
                open={open}
                onClose={onClose}
                aria-labelledby={`basic-${props.turret.key}-button`}
            >
                <MenuItem color="danger" onClick={onRemove}>{intlContext.text("UI", "remove-turret")}</MenuItem>
            </Menu>
        </Card>
    )
}