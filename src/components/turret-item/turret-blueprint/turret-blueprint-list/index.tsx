import { Delete } from "@mui/icons-material";
import { DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import { useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MIN_TURRET_QUANTITY } from "~constants/common";
import { IntlContext } from "~contexts/intl";
import { Rarity, RarityColor } from "~data/common";
import { useBreakpoint } from "~hooks/breakpoints";
import { deleteBlueprint } from "~reducers/blueprint";
import { updateComponent } from "~reducers/component";
import { updateTurret } from "~reducers/turret";
import { RootState } from "~store";
import { BlueprintEntity, TurretEntity } from "~types/store/entity";

type Props = {
    id: string;
    entity: TurretEntity;
    open: boolean;
    onClose: () => void;
};

export function TurretBlueprintList({ id, entity, open, onClose }: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const blueprints = useSelector((state: RootState) => state.blueprint.entities);

    const blueprintsList = useMemo(() => Object.values(blueprints).filter(blueprint => blueprint.reference.type === entity.type), [blueprints, entity.type]);

    const getBlueprintRarityColor = useCallback((blueprint: BlueprintEntity) => {
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

    const onDelete = useCallback((identity: string) => {
        dispatch(deleteBlueprint({ identity }));

        if (blueprintsList.length === 1) {
            onClose();
        }
    }, [dispatch, blueprintsList.length, onClose]);

    const onLoad = useCallback((blueprint: BlueprintEntity) => {
        dispatch(updateTurret({
            identity: id,
            entity: { ...blueprint.reference, enabled: true, quantity: MIN_TURRET_QUANTITY }
        }))

        blueprint.components.forEach(({ type, quantity }) => {
            dispatch(updateComponent({
                identity: id,
                entity: { type: Number(type), quantity: Number(quantity) }
            }));
        });

        onClose();
    }, [dispatch, id, onClose]);

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