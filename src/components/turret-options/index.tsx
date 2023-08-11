import {type ITurretOptions} from "./types";

import {Field} from "../field";
import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {TurretContext} from "../../contexts/turret";

const MAX_TURRET_QUANTITY = 9_999;
const MAX_TURRET_PRICE = 1_000_000_000;

export function TurretOptions(props: ITurretOptions) {
    const intlContext = useContext(IntlContext)
    const turretContext = useContext(TurretContext);

    function onAttributeChange(attribute: "quantity" | "price") {
        return function onChange(id: string, value: string | null) {
            if (value) {
                if (attribute === 'quantity' && (Number(value) < 1 || Number(value) > MAX_TURRET_QUANTITY)) return;
                if (attribute === 'price' && (Number(value) < 0 || Number(value) > MAX_TURRET_PRICE)) return;

                turretContext.update(id, attribute, Number(value));
            }
        }
    }

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Field id={props.turret.id}
                   label={intlContext.text("UI", "quantity")}
                   maxValue={MAX_TURRET_QUANTITY}
                   value={props.turret.quantity}
                   type="number"
                   onChange={onAttributeChange("quantity")}/>
            <Field id={props.turret.id}
                   label={intlContext.text("UI", "turret-price")}
                   maxValue={MAX_TURRET_PRICE}
                   value={props.turret.price}
                   type="number"
                   onChange={onAttributeChange("price")}/>
        </Stack>
    )
}