import {type ITurretOptions} from "./types";

import {FieldComponent} from "../field";
import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {TurretContext} from "../../contexts/turrets";

export function TurretOptions(props: ITurretOptions) {
    const intlContext = useContext(IntlContext)
    const turretContext = useContext(TurretContext);

    function onQuantityChange(tKey: string, value: string | null) {
        if (Number(value) < 1) return;

        turretContext.update(tKey, "quantity", Number(value));
    }

    function onPriceChange(tKey: string, value: string | null) {
        if (Number(value) < 0) return;

        turretContext.update(tKey, "price", Number(value));
    }

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <FieldComponent id={props.turret.key}
                            label={intlContext.text("UI", "quantity")}
                            value={props.turret.quantity}
                            type="number"
                            onChange={onQuantityChange}/>
            <FieldComponent id={props.turret.key}
                            label={intlContext.text("UI", "turret-price")}
                            value={props.turret.price}
                            type="number"
                            onChange={onPriceChange}/>
        </Stack>
    )
}