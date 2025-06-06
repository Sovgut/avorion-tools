import { FormEventHandler, Fragment, SyntheticEvent, useCallback, useContext, useState } from "react";
import { IntlContext } from "~contexts/intl";
import { useDispatch, useSelector } from "react-redux";
import { Button, DialogTitle, Divider, Input, ListItemDecorator, Modal, ModalClose, ModalDialog, Option, Select, Stack } from "@mui/joy";
import { createTurret } from "~reducers/turret.ts";
import { MIN_COMPONENT_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY } from "~constants/common.ts";
import { nanoid } from "nanoid";
import { createComponent } from "~reducers/component.ts";
import { TurretIcon } from "~components/turret-icon";
import { serializeTurret, serializeTurrets } from "~utils/serialize-turret";
import { Turret as TurretType } from "~data/turrets/enums";
import { TurretMetadata } from "~data/turrets/metadata";
import { RootState } from "~store";
import { createTab, setCurrentTab } from "~reducers/tab";
import { Tab } from "~models/tab";
import { useBreakpoint } from "~hooks/breakpoints";

interface ITurretPicker {
    variant: "soft" | "plain";
}

export function TurretPicker(props: ITurretPicker) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turrets = serializeTurrets(Object.keys(TurretType));
    const tabStore = useSelector((state: RootState) => state.tab);
    const breakpoint = useBreakpoint();

    const [selectedTurretType, setTurretType] = useState<TurretType | null>(null);

    function handleSelect(_: SyntheticEvent | null, value: {} | null) {
        if (value === null) return;

        const newValue = value as string;
        const turret = serializeTurret(newValue);

        setTurretType(turret);
    }

    const onNewTabSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();

        const target = e.currentTarget as HTMLFormElement;
        const formData = new FormData(target);
        const name = formData.get("name") as string;

        if (!name || !name.trim()) {
            alert("Please provide a name for the new tab.");
            return;
        }

        if (!selectedTurretType) {
            alert("Please select a turret type before creating a new tab.");
            return;
        }

        const tab: Tab = {
            id: nanoid(),
            name: name.trim()
        };

        dispatch(createTab(tab));
        dispatch(setCurrentTab(tab));

        const turretEntity = {
            id: nanoid(),
            tab_id: tab.id,
            type: selectedTurretType,
            price: MIN_TURRET_PRICE,
            quantity: MIN_TURRET_QUANTITY,
            enabled: true,
            location: { x: 0, y: 0 },
        }

        dispatch(createTurret(turretEntity));

        for (const component of TurretMetadata[selectedTurretType].commodities) {
            dispatch(createComponent(
                {
                    id: nanoid(),
                    turret_id: turretEntity.id,
                    type: component,
                    quantity: MIN_COMPONENT_QUANTITY,
                }
            ))
        }

        setTurretType(null);
    }, [selectedTurretType, dispatch]);

    const onTurretTabSubmit: FormEventHandler = useCallback((e) => {
        e.preventDefault();
        
        const target = e.currentTarget as HTMLFormElement;
        const formData = new FormData(target);
        const tab_id = formData.get("tabId") as string;

        if (!tab_id || !tab_id.trim()) {
            alert("Please provide a tab for the new turret.");
            return;
        }

        if (!selectedTurretType) {
            alert("Please select a turret type before creating a new tab.");
            return;
        }

        const tab = tabStore.entities.find(t => t.id === tab_id);
        if (!tab) {
            alert("Selected tab does not exist.");
            return;
        }

        dispatch(setCurrentTab(tab));

        const turretEntity = {
            id: nanoid(),
            tab_id: tab.id,
            type: selectedTurretType,
            price: MIN_TURRET_PRICE,
            quantity: MIN_TURRET_QUANTITY,
            enabled: true,
            location: { x: 0, y: 0 },
        }

        dispatch(createTurret(turretEntity));

        for (const component of TurretMetadata[selectedTurretType].commodities) {
            dispatch(createComponent(
                {
                    id: nanoid(),
                    turret_id: turretEntity.id,
                    type: component,
                    quantity: MIN_COMPONENT_QUANTITY,
                }
            ))
        }

        setTurretType(null);
    }, [tabStore, selectedTurretType, dispatch]);

    return (
        <Fragment>
            <Select
                placeholder={intlContext.text("UI", "select-turret")}
                onChange={handleSelect}
                value={null}
                variant={props.variant}
                slotProps={{
                    listbox: {
                        sx: {
                            maxHeight: "200px"
                        }
                    }
                }}
            >
                {turrets.map(turret => (
                    <Option key={turret} value={turret}>
                        <ListItemDecorator>
                            <TurretIcon type={turret} />
                        </ListItemDecorator>
                        {intlContext.text("TURRET", turret)}
                    </Option>
                ))}
            </Select>

            <Modal open={selectedTurretType !== null} onClose={() => setTurretType(null)}>
                <ModalDialog sx={{ minWidth: breakpoint.sm ? "auto" : 500, pt: 1.5 }}>
                    <DialogTitle sx={{ pr: 2 }}>Add a new turret</DialogTitle>
                    <ModalClose onClick={() => setTurretType(null)} />
                    <Divider />

                    <Stack component="form" onSubmit={onTurretTabSubmit} spacing={2}>
                        <Select
                            placeholder={"Select tab..."}
                            value={tabStore.current?.id ?? null}
                            variant="soft"
                            name="tabId"
                            disabled={tabStore.entities.length === 0}
                        >
                            {tabStore.entities.map(tab => (
                                <Option key={tab.id} value={tab.id}>
                                    {tab.name}
                                </Option>
                            ))}
                        </Select>
                        <Button type="submit"  disabled={tabStore.entities.length === 0}>Add turret</Button>
                    </Stack>

                    <Divider>OR</Divider>

                    <Stack component="form" onSubmit={onNewTabSubmit} spacing={2}>
                        <Input
                            placeholder={"Name for the new tab..."}
                            name="name"
                            variant="soft"
                            disabled={tabStore.entities.length >= 10}
                        />
                        <Button type="submit" disabled={tabStore.entities.length >= 10}>Create tab & add turret</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}