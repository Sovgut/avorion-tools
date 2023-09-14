import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "~contexts/intl";
import {useDispatch} from "react-redux";
import {updateTurret} from "~reducers/turret";
import {Numeric} from "~components/numeric";
import {MAX_TURRET_PRICE, MAX_TURRET_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY} from "~constants/common";
import {TurretEntity} from "~types/store/entity";

type Props = {
    id: string;
    entity: TurretEntity;
}

export function TurretOptions({id, entity}: Props) {
    const intlContext = useContext(IntlContext)
    const dispatch = useDispatch();

    function handleAttributeChange(attribute: "quantity" | "price") {
        return function $onAttributeChange(id: string, value: string | null) {
            dispatch(updateTurret({
                identity: id,
                entity: {
                    ...entity,
                    [attribute]: Number(value),
                }
            }));
        }
    }

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <Numeric id={id}
                     label={intlContext.text("UI", "quantity")}
                     max={MAX_TURRET_QUANTITY}
                     min={MIN_TURRET_QUANTITY}
                     value={entity.quantity}
                     onChange={handleAttributeChange("quantity")}/>
            <Numeric id={id}
                     label={intlContext.text("UI", "turret-price")}
                     max={MAX_TURRET_PRICE}
                     min={MIN_TURRET_PRICE}
                     value={entity.price}
                     onChange={handleAttributeChange("price")}/>
        </Stack>
    )
}