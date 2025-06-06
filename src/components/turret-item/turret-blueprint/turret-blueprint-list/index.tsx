import { Delete } from "@mui/icons-material";
import { DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MIN_TURRET_QUANTITY } from "~constants/common";
import { IntlContext } from "~contexts/intl";
import { Rarity, RarityColor } from "~data/common";
import { useBreakpoint } from "~hooks/breakpoints";
import { Blueprint } from "~models/blueprint";
import { Turret as TurretEntity } from "~models/turret";
import { deleteBlueprint } from "~reducers/blueprint";
import { updateComponent } from "~reducers/component";
import { updateTurret } from "~reducers/turret";
import { RootState } from "~store";

type Props = {
    entity: TurretEntity;
    open: boolean;
    onClose: () => void;
};

export function TurretBlueprintList({ entity, open, onClose }: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const blueprints = useSelector((state: RootState) => state.blueprint.entities);

    const blueprintsList = useMemo(() => Object.values(blueprints).filter(blueprint => blueprint.turret.type === entity.type), [blueprints, entity.type]);

    const getBlueprintRarityColor = useCallback((blueprint: Blueprint) => {
        switch (blueprint.rarity) {
            case Rarity.Petty:
                return RarityColor.Petty;
            case Rarity.Common:
                return RarityColor.Common;
            case Rarity.Uncommon:
                return RarityColor.Uncommon;
            case Rarity.Rare:
                return RarityColor.Rare;
            case Rarity.Exceptional:
                return RarityColor.Exceptional;
            case Rarity.Exotic:
                return RarityColor.Exotic;
            case Rarity.Legendary:
                return RarityColor.Legendary;
            default:
                return RarityColor.Common;
        }
    }, [])

    const onDelete = useCallback((id: string) => {
        dispatch(deleteBlueprint(id));

        if (blueprintsList.length === 1) {
            onClose();
        }
    }, [dispatch, blueprintsList.length, onClose]);

    const onLoad = useCallback((blueprint: Blueprint) => {
        dispatch(updateTurret({ ...blueprint.turret, enabled: true, quantity: MIN_TURRET_QUANTITY }))

        blueprint.components.forEach((component) => {
            dispatch(updateComponent(component));
        });

        onClose();
    }, [dispatch, onClose]);

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                <DialogTitle sx={{ pr: 2 }}>{intlContext.text("UI", "blueprint-list-title")}</DialogTitle>
                <ModalClose onClick={onClose} />
                <Divider />
                <List>
                    {blueprintsList.map(blueprint => (
                        <ListItem key={blueprint.id} endAction={
                            <IconButton onClick={() => onDelete(blueprint.id)} aria-label="Delete" size="sm" color="danger"><Delete /></IconButton>
                        }>
                            <ListItemButton onClick={() => onLoad(blueprint)}>
                                <Typography sx={{ color: getBlueprintRarityColor(blueprint) }}>
                                    {blueprint.name}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </ModalDialog>
        </Modal>
    )
}