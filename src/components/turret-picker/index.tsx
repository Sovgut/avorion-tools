import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {useDispatch} from "react-redux";
import {TurretType} from "@/constants/enums/turrets";
import {addTurret} from "@/reducers/turret";
import {Option, Select} from "@mui/joy";

export function TurretPicker() {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turrets = Object.values(TurretType) as TurretType[];

    function handleSelect(event: unknown, value: unknown) {
        if (value) {
            dispatch(addTurret(value as TurretType));
        }
    }

    return (
        <Select
            placeholder={intlContext.text("UI", "select-turret")}
            onChange={handleSelect}
            value={null}
            slotProps={{
                listbox: {
                    sx: {
                        maxHeight: "200px"
                    }
                }
            }}
        >
            {turrets.map(turret => <Option key={turret} value={turret}>{intlContext.text("TURRET", turret)}</Option>)}
        </Select>
    )
}