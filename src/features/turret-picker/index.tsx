import {Button, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Option, Select, Stack} from "@mui/joy";
import {IIntlTurret} from "@/contexts/intl/storage/types";
import {Add, ArrowDropDown, ClearAll} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {IntlContext} from "@/contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {addTurret, clearTurrets} from "@/reducers/turrets";
import {RootState} from "@/store";
import {TurretType} from "@/constants/enums/turrets";

type TurretPickerProps = {
    clearable?: boolean;
}

export function TurretPicker(props: TurretPickerProps) {
    const [selected, setSelected] = useState<TurretType>(TurretType.Chaingun);
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turrets = useSelector((state: RootState) => state.turrets);

    function onSelectTurret(value: TurretType | null) {
        if (value) {
            setSelected(value);
        }
    }

    function onAddTurret() {
        if (!selected) return;

        dispatch(addTurret(selected));
    }

    return (
        <Stack direction="row" spacing={1}>
            <Select value={selected} onChange={(e, v) => onSelectTurret(v)}
                    sx={{width: "100%"}}>
                {Object.values(TurretType).map(turret => (
                    <Option key={turret}
                            value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>
                ))}
            </Select>
            <Button
                onClick={onAddTurret}
                disabled={!selected}
            >
                <Stack direction="row" sx={{width: "max-content"}} alignItems="center"
                       spacing={1}>
                    <Add/>
                    {intlContext.text("UI", "add-turret")}
                </Stack>
            </Button>
            {props.clearable && (
                <Dropdown>
                    <MenuButton variant="solid" color="primary">
                        <ArrowDropDown/>
                    </MenuButton>
                    <Menu>
                        <MenuItem
                            color="danger"
                            onClick={() => dispatch(clearTurrets())}
                            disabled={Object.keys(turrets).length === 0}
                        >
                            <ListItemDecorator>
                                <ClearAll/>
                            </ListItemDecorator>
                            {intlContext.text("UI", "clear-turrets")}
                        </MenuItem>
                    </Menu>
                </Dropdown>
            )}
        </Stack>
    )
}