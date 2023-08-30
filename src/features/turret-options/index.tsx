import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateTurret} from "@/reducers/turret";
import {Field} from "@/common/components/field";
import {MAX_TURRET_PRICE, MAX_TURRET_QUANTITY} from "@/constants/common";

type TurretOptionsProps = {
    id: string;
    turret: Turret;
}

export function TurretOptions(props: TurretOptionsProps) {
    const intlContext = useContext(IntlContext)
    const dispatch = useDispatch();

    function onAttributeChange(attribute: "quantity" | "price") {
        return function onChange(id: string, value: string | null) {
            if (value) {
                if (Number.isNaN(Number(value))) return;

                if (attribute === 'quantity' && (Number(value) < 1 || Number(value) > MAX_TURRET_QUANTITY)) return;
                if (attribute === 'price' && (Number(value) < 0 || Number(value) > MAX_TURRET_PRICE)) return;

                dispatch(updateTurret({
                    id,
                    data: {
                        key: props.turret.key,
                        components: props.turret.components,
                        quantity: props.turret.quantity,
                        price: props.turret.price,
                        [attribute]: Number(value),
                    }
                }))
            }
        }
    }

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Field id={props.id}
                   label={intlContext.text("UI", "quantity")}
                   maxValue={MAX_TURRET_QUANTITY}
                   value={props.turret.quantity}
                   type="number"
                   onChange={onAttributeChange("quantity")}/>
            <Field id={props.id}
                   label={intlContext.text("UI", "turret-price")}
                   maxValue={MAX_TURRET_PRICE}
                   value={props.turret.price}
                   type="number"
                   onChange={onAttributeChange("price")}/>
        </Stack>
    )
}