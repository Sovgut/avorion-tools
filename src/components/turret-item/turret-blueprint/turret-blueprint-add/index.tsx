import { Button, DialogTitle, Divider, Input, Modal, ModalClose, ModalDialog, Option, Select, Stack } from "@mui/joy";
import { nanoid } from "nanoid";
import { FormEventHandler, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MIN_COMPONENT_QUANTITY } from "~constants/common";
import { IntlContext } from "~contexts/intl";
import { Rarity, RarityColor } from "~data/common";
import { useBreakpoint } from "~hooks/breakpoints";
import { createBlueprint } from "~reducers/blueprint";
import { RootState } from "~store";
import { TurretEntity } from "~types/store/entity";
import { serializeCommoditites } from "~utils/serialize-commodity";

type Props = {
    id: string;
    entity: TurretEntity;
    open: boolean;
    onClose: () => void;
};

export function TurretBlueprintAdd({ id, entity, open, onClose }: Props) {
    const breakpoint = useBreakpoint();
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const componentStore = useSelector((state: RootState) => state.component);

    const onAddBlueprint: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLFormElement;
        const formData = new FormData(target);
        const name = formData.get("name") as string;
        const rarity = formData.get("rarity") as string;

        if (!name || !name.trim()) {
            alert(intlContext.text("UI", "blueprint-add-name-required"));
            return;
        }

        if (!rarity || !rarity.trim()) {
            alert(intlContext.text("UI", "blueprint-add-rarity-required"));
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

        onClose();
    }, [dispatch, onClose, id, entity]);

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                <DialogTitle sx={{ pr: 2 }}>{intlContext.text("UI", "blueprint-add-title")}</DialogTitle>
                <ModalClose onClick={onClose} />
                <Divider />
                <Stack onSubmit={onAddBlueprint} component="form" spacing={2}>
                    <Input sx={{ width: '100%' }} placeholder={intlContext.text("UI", "blueprint-add-name")} name="name" />
                    <Select sx={{ width: '100%' }} defaultValue={Rarity.Legendary} name="rarity">
                        <Option value={Rarity.Legendary} sx={{ color: RarityColor.Legendary }}>{intlContext.text("UI", "rarity-legendary")}</Option>
                        <Option value={Rarity.Exotic} sx={{ color: RarityColor.Exotic }}>{intlContext.text("UI", "rarity-exotic")}</Option>
                        <Option value={Rarity.Exceptional} sx={{ color: RarityColor.Exceptional }}>{intlContext.text("UI", "rarity-exceptional")}</Option>
                        <Option value={Rarity.Rare} sx={{ color: RarityColor.Rare }}>{intlContext.text("UI", "rarity-rare")}</Option>
                        <Option value={Rarity.Uncommon} sx={{ color: Rarity.Uncommon }}>{intlContext.text("UI", "rarity-uncommon")}</Option>
                        <Option value={Rarity.Common} sx={{ color: Rarity.Common }}>{intlContext.text("UI", "rarity-common")}</Option>
                        <Option value={Rarity.Petty} sx={{ color: Rarity.Petty }}>{intlContext.text("UI", "rarity-petty")}</Option>
                    </Select>
                    <Button type="submit">{intlContext.text("UI", "blueprint-add-submit")}</Button>
                </Stack>
            </ModalDialog>
        </Modal>
    );
}