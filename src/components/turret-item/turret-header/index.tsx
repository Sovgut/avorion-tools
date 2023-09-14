import {useContext} from "react";
import {Close, MoreVert as MoreIcon} from "@mui/icons-material";
import {IntlContext} from "~contexts/intl";
import {Box, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {useDispatch} from "react-redux";
import {deleteTurret} from "~reducers/turret";
import {TurretsMeta} from "~constants/meta/turrets";
import {TurretEntity} from "~types/store/entity.ts";
import {deleteComponent} from "~reducers/component.ts";

type Props = {
    id: string;
    entity: TurretEntity;
}

export function TurretHeader({id, entity}: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function handleDeleteTurret() {
        dispatch(deleteComponent({identity: id}))
        dispatch(deleteTurret({identity: id}));
    }

    // function handleResetFields() {
    //     dispatch(updateTurret({
    //         id: id,
    //         data: {
    //             ...entity,
    //             price: MIN_TURRET_PRICE,
    //             quantity: MIN_TURRET_QUANTITY,
    //         }
    //     }))
    //
    //     for (const componentType of Object.keys(entity.components)) {
    //         dispatch(updateComponent({
    //             type: componentType as ComponentType,
    //             turretId: id,
    //             data: MIN_COMPONENT_PRICE,
    //         }));
    //     }
    // }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <img className={styles.icon} src={TurretsMeta[entity.type].icon} alt={entity.type}/>
                    <Typography level="title-md">{intlContext.text("TURRET", entity.type)}</Typography>
                </Stack>
                <Dropdown>
                    <MenuButton variant="plain" sx={{width: "44px", height: "40px"}}><MoreIcon/></MenuButton>
                    <Menu placement="bottom-end" sx={{minWidth: "200px"}}>
                        {/*<MenuItem onClick={handleResetFields}>*/}
                        {/*    <ListItemDecorator>*/}
                        {/*        <RestartAlt/>*/}
                        {/*    </ListItemDecorator>*/}
                        {/*    {intlContext.text("UI", "reset-components")}*/}
                        {/*</MenuItem>*/}
                        {/*<Divider/>*/}
                        <MenuItem color="danger" onClick={handleDeleteTurret}>
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