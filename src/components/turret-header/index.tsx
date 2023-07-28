import {type ITurretHeader} from "./types";

import {useContext, useRef, useState} from "react";
import {MoreVert as MoreIcon} from "@mui/icons-material";
import {IntlContext} from "../../contexts/intl";
import {Box, Button, Menu, MenuItem, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";

export function TurretHeader(props: ITurretHeader) {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef(null);
    const intlContext = useContext(IntlContext);

    function onClose() {
        setOpen(false);
    }

    function onOpen() {
        setOpen(!open);
    }

    function onRemove() {
        setOpen(false);

        props.onRemove(props.turret.key)
    }

    return (
        <Box>
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

            <Menu
                id={`basic-${props.turret.key}-menu`}
                anchorEl={buttonRef.current}
                open={open}
                onClose={onClose}
                aria-labelledby={`basic-${props.turret.key}-button`}
            >
                <MenuItem color="danger" onClick={onRemove}>{intlContext.text("UI", "remove-turret")}</MenuItem>
            </Menu>
        </Box>
    )
}