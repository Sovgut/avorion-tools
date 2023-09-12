import {useContext} from "react";
import {MoreVert as MoreIcon} from "@mui/icons-material";
import {IntlContext} from "@/contexts/intl";
import {Box, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {useDispatch} from "react-redux";
import {removeTurret} from "@/reducers/turret";
import {Turret} from "@/types";
import {TurretsMeta} from "@/constants/meta/turrets";
import {checkboxRemove} from "@/reducers/checkbox";
import {ComponentType} from "@/constants/enums/components";

type TurretHeaderProps = {
    id: string;
    turret: Turret;
}

export function TurretHeader(props: TurretHeaderProps) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onRemove() {
        for (const componentType of Object.keys(props.turret.components)) {
            dispatch(checkboxRemove(componentType as ComponentType));
        }

        dispatch(removeTurret(props.id));
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <img className={styles.icon} src={TurretsMeta[props.turret.key].icon} alt={props.turret.key}/>
                    <Typography level="title-md">{intlContext.text("TURRET", props.turret.key)}</Typography>
                </Stack>
                <Dropdown>
                    <MenuButton variant="plain" sx={{width: "44px", height: "40px"}}><MoreIcon/></MenuButton>
                    <Menu placement="bottom-end">
                        <MenuItem color="danger" onClick={onRemove}>{intlContext.text("UI", "remove-turret")}</MenuItem>
                    </Menu>
                </Dropdown>
            </Stack>
        </Box>
    )
}