import { MouseEvent, useContext } from "react";
import { Close, CopyAll, MoreVert as MoreIcon, PlaceOutlined, RestartAlt } from "@mui/icons-material";
import { IntlContext } from "~contexts/intl";
import { Box, Divider, Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, Tooltip, Typography, } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteTurret, updateTurret } from "~reducers/turret";
import { TurretEntity } from "~types/store/entity.ts";
import { deleteComponent, updateComponent } from "~reducers/component.ts";
import { RootState } from "~store";
import {
    MIN_COMPONENT_QUANTITY,
    MIN_TURRET_PRICE,
    MIN_TURRET_QUANTITY,
    PAGE_ANIMATION_CONTROLS,
} from "~constants/common.ts";
import { clearComponentsCheckbox } from "~reducers/checkbox.ts";
import { TurretIcon } from "~components/turret-icon";
import { AnimationControlContext } from "~contexts/animation-control";
import { serializeCommoditites } from "~utils/serialize-commodity";

type Props = {
    id: string;
    entity: TurretEntity;
};

export function TurretHeader({ id, entity }: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turretStore = useSelector((state: RootState) => state.turret);
    const componentStore = useSelector((state: RootState) => state.component);
    const controls = useContext(AnimationControlContext);

    function removeTurretAndCleanState() {
        if (Object.keys(turretStore.entities).length === 1) {
            controls?.start(PAGE_ANIMATION_CONTROLS).then(performStateCleanup);
        } else {
            performStateCleanup();
        }
    }

    function performStateCleanup() {
        dispatch(clearComponentsCheckbox());
        dispatch(deleteComponent({ identity: id }));
        dispatch(deleteTurret({ identity: id }));
    }

    function resetToDefaultValues() {
        dispatch(updateTurret({
            identity: id,
            entity: { ...entity, quantity: MIN_TURRET_QUANTITY, price: MIN_TURRET_PRICE, location: { x: 0, y: 0 } }
        }));

        (serializeCommoditites(Object.keys(componentStore.entities[id])))
            .forEach(type => dispatch(updateComponent({
                identity: id,
                entity: { type, quantity: MIN_COMPONENT_QUANTITY }
            })));
    }

    function handleCopyText(component: string) {
        return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation();

            window.navigator.clipboard.writeText(component).then();
        };
    }

    return (
        <Box sx={{ p: 2, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <TurretIcon type={entity.type} />

                    <Typography level="title-md">
                        {intlContext.text("TURRET", entity.type)}
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center">
                    <Tooltip variant="soft" color="primary" placement="top" arrow title={intlContext.text("UI", "copy-location")}>
                        <IconButton
                            size="sm"
                            title={intlContext.text("UI", "copy-location")}
                            onClick={handleCopyText(`${entity.location.x ?? 0}:${entity.location.y ?? 0}`)}
                        >
                            <PlaceOutlined />
                        </IconButton>
                    </Tooltip>
                    <Dropdown>
                        <MenuButton variant="soft" sx={{ width: "24px", height: "24px" }}>
                            <MoreIcon />
                        </MenuButton>
                        <Menu placement="bottom-end" variant="soft" sx={{ minWidth: "200px" }}>
                            <MenuItem onClick={resetToDefaultValues}>
                                <ListItemDecorator>
                                    <RestartAlt />
                                </ListItemDecorator>
                                {intlContext.text("UI", "reset-components")}
                            </MenuItem>
                            <Divider />
                            <MenuItem color="danger" onClick={removeTurretAndCleanState}>
                                <ListItemDecorator>
                                    <Close />
                                </ListItemDecorator>
                                {intlContext.text("UI", "remove-turret")}
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Stack>
            </Stack>
        </Box>
    );
}
