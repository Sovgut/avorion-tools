import { MouseEvent, useContext, useMemo, useState } from "react";
import { Close, ListAlt, MoreVert as MoreIcon, PlaceOutlined, PostAdd, RestartAlt } from "@mui/icons-material";
import { IntlContext } from "~contexts/intl";
import { Box, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Stack, } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteTurret, updateTurret } from "~reducers/turret";
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
import { TurretBlueprintAdd } from "../turret-blueprint/turret-blueprint-add";
import { TurretBlueprintList } from "../turret-blueprint/turret-blueprint-list";
import { TurretBlueprintModals } from "../turret-blueprint/types";
import { Turret as TurretEntity } from "~models/turret";
import { Toggleble } from "~components/UI/Toggleble/Toggleble";
import { Buttoneble } from "~components/UI/Buttoneble/Buttoneble";
import { ButtonebleGrouble } from "~components/UI/ButtonebleGrouble/ButtonebleGrouble";
import { Copiable } from "~components/UI/Copiable/Copiable";

type Props = {
    entity: TurretEntity;
};

export function TurretHeader({ entity }: Props) {
    const [modals, setModals] = useState<TurretBlueprintModals>({ blueprintAdd: false, blueprintList: false });

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
        dispatch(deleteTurret(entity.id));

        const turretComponents = componentStore.entities.filter(component => component.turret_id === entity.id);

        turretComponents.forEach(component => {
            dispatch(deleteComponent(component.id));
        });
    }

    function resetToDefaultValues() {
        dispatch(updateTurret({
            ...entity,
            quantity: MIN_TURRET_QUANTITY,
            price: MIN_TURRET_PRICE,
            location: { x: 0, y: 0 }
        }));

        const turretComponents = componentStore.entities.filter(component => component.turret_id === entity.id);

        turretComponents.forEach(component => {
            dispatch(updateComponent({ ...component, quantity: MIN_COMPONENT_QUANTITY }));
        });
    }

    function handleToggleTurretEnabled(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();

        const newEnabledState = typeof entity.enabled === 'undefined' ? false : !entity.enabled;
        dispatch(updateTurret({
            ...entity,
            enabled: newEnabledState,
        }));
    }

    const wasToggled = useMemo(() => {
        return typeof entity.enabled === 'boolean' && !entity.enabled
    }, [entity.enabled]);

    return (
        <Box sx={{ p: 2, pb: 0 }}>
            <Stack direction="row" justifyContent="space-between">
                <ButtonebleGrouble>
                    <Buttoneble onClick={() => setModals(state => ({ ...state, blueprintAdd: true }))}>
                        <PostAdd />
                    </Buttoneble>
                    <Buttoneble onClick={() => setModals(state => ({ ...state, blueprintList: true }))}>
                        <ListAlt />
                    </Buttoneble>
                    <Copiable value={`${entity.location.x ?? 0}:${entity.location.y ?? 0}`}>
                        <PlaceOutlined />
                    </Copiable>
                    <Toggleble onClick={handleToggleTurretEnabled} value={wasToggled}>
                        <TurretIcon type={entity.type} />
                        {intlContext.text("TURRET", entity.type)}
                    </Toggleble>
                </ButtonebleGrouble>

                <Stack direction="row" alignItems="center">
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

            <TurretBlueprintAdd entity={entity} open={modals.blueprintAdd} onClose={() => setModals(state => ({ ...state, blueprintAdd: false }))} />
            <TurretBlueprintList entity={entity} open={modals.blueprintList} onClose={() => setModals(state => ({ ...state, blueprintList: false }))} />
        </Box>
    );
}
