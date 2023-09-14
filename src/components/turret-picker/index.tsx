import {useContext} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch} from "react-redux";
import {TurretType} from "~constants/enums/turrets";
import {Option, Select} from "@mui/joy";
import {createTurret} from "~reducers/turret.ts";
import {MIN_COMPONENT_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY} from "~constants/common.ts";
import {nanoid} from "nanoid";
import {createComponent} from "~reducers/component.ts";
import {TurretsMeta} from "~constants/meta/turrets.ts";

export function TurretPicker() {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turrets = Object.values(TurretType) as TurretType[];

    function handleSelect(_event: unknown, value: unknown) {
        const identity = nanoid();

        dispatch(createTurret({
            identity,
            entity: {
                type: value as TurretType,
                price: MIN_TURRET_PRICE,
                quantity: MIN_TURRET_QUANTITY,
            }
        }));

        for (const component of TurretsMeta[value as TurretType].components) {
            dispatch(createComponent({
                identity,
                entity: {
                    type: component,
                    quantity: MIN_COMPONENT_QUANTITY,
                }
            }))
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