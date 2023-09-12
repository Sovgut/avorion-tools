import {useContext} from "react";
import {Close, MoreVert as MoreIcon, RestartAlt} from "@mui/icons-material";
import {IntlContext} from "@/contexts/intl";
import {Box, Divider, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {useDispatch} from "react-redux";
import {removeTurret, updateComponent, updateTurret} from "@/reducers/turret";
import {Turret} from "@/types";
import {TurretsMeta} from "@/constants/meta/turrets";
import {checkboxRemove} from "@/reducers/checkbox";
import {ComponentType} from "@/constants/enums/components";
import {MIN_COMPONENT_PRICE, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY} from "@/constants/common";

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

    function handleResetFields() {
        dispatch(updateTurret({
            id: props.id,
            data: {
                ...props.turret,
                price: MIN_TURRET_PRICE,
                quantity: MIN_TURRET_QUANTITY,
            }
        }))

        for (const componentType of Object.keys(props.turret.components)) {
            dispatch(updateComponent({
                type: componentType as ComponentType,
                turretId: props.id,
                data: MIN_COMPONENT_PRICE,
            }));
        }
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
                    <Menu placement="bottom-end" sx={{minWidth: "200px"}}>
                        <MenuItem onClick={handleResetFields}>
                            <ListItemDecorator>
                                <RestartAlt/>
                            </ListItemDecorator>
                            {intlContext.text("UI", "reset-components")}
                        </MenuItem>
                        <Divider/>
                        <MenuItem color="danger" onClick={onRemove}>
                            <ListItemDecorator>
                                <Close/>
                            </ListItemDecorator>
                            {intlContext.text("UI", "remove-turret")}
                        </MenuItem>
                    </Menu>
                </Dropdown>
            </Stack>
        </Box>
    )
}