import {type ITurretHeader} from "./types";

import {useContext} from "react";
import {MoreVert as MoreIcon} from "@mui/icons-material";
import {IntlContext} from "../../contexts/intl";
import {Box, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {TurretContext} from "../../contexts/turret";

export function TurretHeader(props: ITurretHeader) {
    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);

    function onRemove() {
        turretContext.remove(props.turret.id);
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <img className={styles.icon} src={props.turret.icon} alt={props.turret.type}/>
                    <Typography level="title-md">{intlContext.text("TURRET", props.turret.type)}</Typography>
                </Stack>
                <Dropdown>
                    <MenuButton sx={{width: "44px", height: "40px"}}><MoreIcon/></MenuButton>
                    <Menu>
                        <MenuItem color="danger" onClick={onRemove}>{intlContext.text("UI", "remove-turret")}</MenuItem>
                    </Menu>
                </Dropdown>
            </Stack>
        </Box>
    )
}