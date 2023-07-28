import {type ITurretOptions} from "./types";

import {FieldComponent} from "../field";
import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";

export function TurretOptions(props: ITurretOptions) {
    const intlContext = useContext(IntlContext)

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <FieldComponent id={props.turret.key}
                            label={intlContext.text("UI", "quantity")}
                            value={props.turret.quantity}
                            type="number"
                            onChange={props.onQuantityChange}/>
            <FieldComponent id={props.turret.key}
                            label={intlContext.text("UI", "turret-price")}
                            value={props.turret.price}
                            type="number"
                            onChange={props.onPriceChange}/>
        </Stack>
    )
}