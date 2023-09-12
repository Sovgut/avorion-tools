import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateTurret} from "@/reducers/turret";
import {Numeric} from "components/numeric";
import {MAX_TURRET_PRICE, MAX_TURRET_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY} from "@/constants/common";

type TurretOptionsProps = {
    id: string;
    turret: Turret;
}

export function TurretOptions(props: TurretOptionsProps) {
    const intlContext = useContext(IntlContext)
    const dispatch = useDispatch();

    function onAttributeChange(attribute: "quantity" | "price") {
        return function onChange(id: string, value: string | null) {
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

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Numeric id={props.id}
                     label={intlContext.text("UI", "quantity")}
                     max={MAX_TURRET_QUANTITY}
                     min={MIN_TURRET_QUANTITY}
                     value={props.turret.quantity}
                     onChange={onAttributeChange("quantity")}/>
            <Numeric id={props.id}
                     label={intlContext.text("UI", "turret-price")}
                     max={MAX_TURRET_PRICE}
                     min={MIN_TURRET_PRICE}
                     value={props.turret.price}
                     onChange={onAttributeChange("price")}/>
        </Stack>
    )
}