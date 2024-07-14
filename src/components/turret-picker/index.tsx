import {useContext} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch} from "react-redux";
import {ListItemDecorator, Option, Select} from "@mui/joy";
import {createTurret} from "~reducers/turret.ts";
import {MIN_COMPONENT_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY} from "~constants/common.ts";
import {nanoid} from "nanoid";
import {createComponent} from "~reducers/component.ts";
import {TurretIcon} from "~components/turret-icon";
import { serializeTurret, serializeTurrets } from "~utils/serialize-turret";
import { Turret } from "src/data/turrets/enums";
import { TurretMetadata } from "src/data/turrets/metadata";

export function TurretPicker() {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();
    const turrets = serializeTurrets(Object.keys(Turret));

    function handleSelect(_event: unknown, value: string | null) {
        if (!value) return;

        const turret = serializeTurret(value);
        const identity = nanoid();

        dispatch(createTurret({
            identity,
            entity: {
                type: turret,
                price: MIN_TURRET_PRICE,
                quantity: MIN_TURRET_QUANTITY,
            }
        }));

        for (const component of TurretMetadata[turret].commodities) {
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
            {turrets.map(turret => (
                <Option key={turret} value={turret}>
                    <ListItemDecorator>
                        <TurretIcon type={turret}/>
                    </ListItemDecorator>
                    {intlContext.text("TURRET", turret)}
                </Option>
            ))}
        </Select>
    )
}