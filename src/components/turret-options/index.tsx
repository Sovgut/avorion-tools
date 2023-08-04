import {type ITurretOptions} from "./types";

import {Field} from "../field";
import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {TurretContext} from "../../contexts/turret";

export function TurretOptions(props: ITurretOptions) {
    const intlContext = useContext(IntlContext)
    const turretContext = useContext(TurretContext);

    function onAttributeChange(attribute: "quantity" | "price") {
        return function onChange(id: string, value: string | null) {
            if (value) {
                if (attribute === 'quantity' && Number(value) < 1) return;
                if (attribute === 'price' && Number(value) < 0) return;

                turretContext.update(id, attribute, Number(value));
            }
        }
    }

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Field id={props.turret.id}
                   label={intlContext.text("UI", "quantity")}
                   value={props.turret.quantity}
                   type="number"
                   onChange={onAttributeChange("quantity")}/>
            <Field id={props.turret.id}
                   label={intlContext.text("UI", "turret-price")}
                   value={props.turret.price}
                   type="number"
                   onChange={onAttributeChange("price")}/>
        </Stack>
    )
}