import {useContext} from "react";
import {Close, MoreVert as MoreIcon, RestartAlt} from "@mui/icons-material";
import {IntlContext} from "~contexts/intl";
import {Box, Divider, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, Typography,} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {deleteTurret, updateTurret} from "~reducers/turret";
import {TurretEntity} from "~types/store/entity.ts";
import {deleteComponent, updateComponent} from "~reducers/component.ts";
import {RootState} from "~store";
import {ComponentType} from "~constants/enums/components.ts";
import {MIN_COMPONENT_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY,} from "~constants/common.ts";
import {clearComponentsCheckbox} from "~reducers/checkbox.ts";
import {TurretIcon} from "~components/turret-icon";
import {AnimationControlContext} from "~contexts/animation-control";

type Props = {
    id: string;
    entity: TurretEntity;
};

export function TurretHeader({id, entity}: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turretStore = useSelector((state: RootState) => state.turret);
    const componentStore = useSelector((state: RootState) => state.component);
    const controls = useContext(AnimationControlContext);

    function handleDeleteTurret() {
        if (Object.keys(turretStore.entities).length === 1) {
            if (controls) {
                controls
                    .start({
                        opacity: 0,
                        transition: {duration: .150}
                    })
                    .then(() => {
                        dispatch(clearComponentsCheckbox());
                        dispatch(deleteComponent({identity: id}));
                        dispatch(deleteTurret({identity: id}));
                    });
            }
        } else {
            clearTurretState();
        }
    }

    function clearTurretState() {
        dispatch(clearComponentsCheckbox());
        dispatch(deleteComponent({identity: id}));
        dispatch(deleteTurret({identity: id}));
    }

    function handleResetFields() {
        dispatch(
            updateTurret({
                identity: id,
                entity: {
                    ...entity,
                    quantity: MIN_TURRET_QUANTITY,
                    price: MIN_TURRET_PRICE,
                },
            })
        );

        for (const type of Object.keys(
            componentStore.entities[id]
        ) as ComponentType[]) {
            dispatch(
                updateComponent({
                    identity: id,
                    entity: {
                        type,
                        quantity: MIN_COMPONENT_QUANTITY,
                    },
                })
            );
        }
    }

    return (
        <Box sx={{p: 2, pb: 0}}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <TurretIcon type={entity.type}/>
                    <Typography level="title-md">
                        {intlContext.text("TURRET", entity.type)}
                    </Typography>
                </Stack>
                <Dropdown>
                    <MenuButton variant="plain" sx={{width: "44px", height: "40px"}}>
                        <MoreIcon/>
                    </MenuButton>
                    <Menu placement="bottom-end" sx={{minWidth: "200px"}}>
                        <MenuItem onClick={handleResetFields}>
                            <ListItemDecorator>
                                <RestartAlt/>
                            </ListItemDecorator>
                            {intlContext.text("UI", "reset-components")}
                        </MenuItem>
                        <Divider/>
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
    );
}
