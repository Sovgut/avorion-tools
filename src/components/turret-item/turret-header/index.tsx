import { FormEvent, Fragment, MouseEvent, useContext, useMemo, useState } from "react";
import { Close, Delete, ListAlt, MoreVert as MoreIcon, PlaceOutlined, PostAdd, RestartAlt } from "@mui/icons-material";
import { IntlContext } from "~contexts/intl";
import { Box, Button, DialogTitle, Divider, Dropdown, IconButton, Input, List, ListItem, ListItemButton, ListItemDecorator, Menu, MenuButton, MenuItem, Modal, ModalClose, ModalDialog, Option, Select, Stack, Tooltip, Typography, } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteTurret, updateTurret } from "~reducers/turret";
import { BlueprintEntity, TurretEntity } from "~types/store/entity.ts";
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
import { SxProps } from "@mui/joy/styles/types";
import { createBlueprint, deleteBlueprint } from "~reducers/blueprint";
import { nanoid } from "nanoid";
import { Rarity } from "~data/common";
import { useBreakpoint } from "~hooks/breakpoints";

type Props = {
    id: string;
    entity: TurretEntity;
};

const RARITY_COLORS: Record<Rarity, string> = {
    "petty": "#808080", 
    "common": "#dfdfdf",
    "uncommon": "#31dd31",
    "rare": "#3198ff",
    "exceptional": "#ffca42",
    "exotic": "#ff420e",
    "legendary": "#c642ff",
}

export function TurretHeader({ id, entity }: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turretStore = useSelector((state: RootState) => state.turret);
    const componentStore = useSelector((state: RootState) => state.component);
    const controls = useContext(AnimationControlContext);
    const breakpoint = useBreakpoint();

    const [addBlueprintModalOpen, setAddBlueprintModalOpen] = useState(false);
    const [listBlueprintsOpen, setListBlueprintsOpen] = useState(false);
    const blueprints = useSelector((state: RootState) => state.blueprint.entities);

    const blueprintsList = useMemo(() => Object.values(blueprints).filter(blueprint => blueprint.reference.type === entity.type), [blueprints, entity.type]);
    const hasBlueprints = blueprintsList.length > 0;

    const sx: SxProps = { opacity: 1, cursor: "pointer", userSelect: "none" };
    if (typeof entity.enabled === 'boolean' && !entity.enabled) {
        sx.opacity = 0.5;
    }

    function handleAddBlueprint(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const rarity = formData.get("rarity") as string;

        if (!name || !name.trim()) {
            setAddBlueprintModalOpen(false);
            return;
        }

        if (!rarity || !rarity.trim()) {
            setAddBlueprintModalOpen(false);
            return;
        }

        const identity = nanoid();
        const components = serializeCommoditites(Object.keys(componentStore.entities[id])).map(type => ({
            type: Number(type),
            quantity: componentStore.entities[id][type] ?? MIN_COMPONENT_QUANTITY,
        }));

        dispatch(createBlueprint({
            identity,
            entity: {
                id: identity,
                rarity: rarity as Rarity,
                name: name.trim(),
                reference: entity,
                components: components,
            }
        }))

        setAddBlueprintModalOpen(false);
    }

    function handleDeleteBlueprint(identity: string) {
        dispatch(deleteBlueprint({ identity }));

        if (blueprintsList.length === 1) {
            setListBlueprintsOpen(false);
        }
    }

    function handleLoadBlueprint(blueprint: BlueprintEntity) {
        dispatch(updateTurret({
            identity: id,
            entity: { ...blueprint.reference, enabled: true, quantity: MIN_TURRET_QUANTITY }
        }))

        blueprint.components.forEach(({type, quantity}) => {
            dispatch(updateComponent({
                identity: id,
                entity: { type: Number(type), quantity: Number(quantity) }
            }));
        });

        setListBlueprintsOpen(false);
    }

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

    function handleToggleTurretEnabled(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();

        const newEnabledState = typeof entity.enabled === 'undefined' ? false : !entity.enabled;
        dispatch(updateTurret({
            identity: id,
            entity: { ...entity, enabled: newEnabledState }
        }));
    }

    function handleCopyText(component: string) {
        return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation();

            window.navigator.clipboard.writeText(component).then();
        };
    }

    return (
        <Fragment>
            <Box sx={{ p: 2, pb: 0 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="center" sx={sx} onClick={handleToggleTurretEnabled} role="button">
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
                                <MenuItem onClick={() => setAddBlueprintModalOpen(true)}>
                                    <ListItemDecorator>
                                        <PostAdd />
                                    </ListItemDecorator>
                                    {intlContext.text("UI", "blueprint-add")}
                                </MenuItem>
                                <MenuItem disabled={!hasBlueprints} onClick={() => setListBlueprintsOpen(true)}>
                                    <ListItemDecorator>
                                        <ListAlt />
                                    </ListItemDecorator>
                                    {intlContext.text("UI", "blueprint-list")}
                                </MenuItem>
                                <Divider />
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
            </Box>

            <Modal open={addBlueprintModalOpen} onClose={() => setAddBlueprintModalOpen(false)}>
                <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                    <DialogTitle sx={{ pr: 2 }}>{intlContext.text("UI", "blueprint-add-title")}</DialogTitle>
                    <ModalClose onClick={() => setListBlueprintsOpen(false)} />
                    <Divider />
                    <Stack onSubmit={handleAddBlueprint} component="form" spacing={2}>
                        <Input sx={{width: '100%'}} placeholder={intlContext.text("UI", "blueprint-add-name")} name="name" />
                        <Select sx={{width: '100%'}} defaultValue={Rarity.Legendary} name="rarity">
                            <Option value={Rarity.Legendary} sx={{ color: RARITY_COLORS.legendary }}>{intlContext.text("UI", "rarity-legendary")}</Option>
                            <Option value={Rarity.Exotic} sx={{ color: RARITY_COLORS.exotic }}>{intlContext.text("UI", "rarity-exotic")}</Option>
                            <Option value={Rarity.Exceptional} sx={{ color: RARITY_COLORS.exceptional }}>{intlContext.text("UI", "rarity-exceptional")}</Option>
                            <Option value={Rarity.Rare} sx={{ color: RARITY_COLORS.rare }}>{intlContext.text("UI", "rarity-rare")}</Option>
                            <Option value={Rarity.Uncommon} sx={{ color: RARITY_COLORS.uncommon }}>{intlContext.text("UI", "rarity-uncommon")}</Option>
                            <Option value={Rarity.Common} sx={{ color: RARITY_COLORS.common }}>{intlContext.text("UI", "rarity-common")}</Option>
                            <Option value={Rarity.Petty} sx={{ color: RARITY_COLORS.petty }}>{intlContext.text("UI", "rarity-petty")}</Option>
                        </Select>
                        <Button type="submit">{intlContext.text("UI", "blueprint-add-submit")}</Button>
                    </Stack>
                </ModalDialog>
            </Modal>

            <Modal open={listBlueprintsOpen} onClose={() => setListBlueprintsOpen(false)}>
                <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                    <DialogTitle sx={{ pr: 2 }}>{intlContext.text("UI", "blueprint-list-title")}</DialogTitle>
                    <ModalClose onClick={() => setListBlueprintsOpen(false)} />
                    <Divider />
                    <List>
                        {blueprintsList.map(blueprint => (
                            <ListItem key={blueprint.id} endAction={
                                <IconButton onClick={() => handleDeleteBlueprint(blueprint.id)} aria-label="Delete" size="sm" color="danger"><Delete /></IconButton>
                            }>
                                <ListItemButton onClick={() => handleLoadBlueprint(blueprint)}>
                                    <Typography sx={{ color: RARITY_COLORS[blueprint.rarity] }}>
                                        {blueprint.name}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
}
