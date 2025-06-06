import { Fragment, useContext } from "react";
import { IntlContext } from "~contexts/intl";
import { useDispatch } from "react-redux";
import { updateTurret } from "~reducers/turret";
import { Numeric } from "~components/numeric";
import { MAX_TURRET_PRICE, MAX_TURRET_QUANTITY, MIN_TURRET_PRICE, MIN_TURRET_QUANTITY } from "~constants/common";
import { Sheet, Stack } from "@mui/joy";
import { Turret as TurretEntity } from "~models/turret";

type Props = {
    entity: TurretEntity;
}

export function TurretOptions({ entity }: Props) {
    const intlContext = useContext(IntlContext)
    const dispatch = useDispatch();

    function handleAttributeChange(attribute: "quantity" | "price") {
        return function $onAttributeChange(_id: string, value: string | null) {
            if (value === '' || value === null) {
                dispatch(updateTurret({
                    ...entity,
                    [attribute]: 0,
                }));
                return;
            }

            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
                dispatch(updateTurret({
                    ...entity,
                    [attribute]: numericValue,
                }));
            }
        }
    }

    const onLocationChange = (direction: "x" | "y") => (_id: string, value: string | null) => {
        if (value === '-' || value === '') {
            const defaultLocation = entity.location || { x: 0, y: 0 };
            const updatedLocation = { ...defaultLocation, [direction]: value };
            dispatch(updateTurret({ ...entity, location: updatedLocation }));
            return;
        }

        const parsedValue = Number(value);
        if (isNaN(parsedValue)) return;

        const defaultLocation = entity.location || { x: 0, y: 0 };
        const updatedLocation = { ...defaultLocation, [direction]: parsedValue };
        dispatch(updateTurret({ ...entity, location: updatedLocation }));
    }

    return (
        <Fragment>
            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ p: 2, pt: 0, pb: 0 }}>
                <Numeric id={entity.id}
                    label={intlContext.text("UI", "quantity")}
                    max={MAX_TURRET_QUANTITY}
                    min={MIN_TURRET_QUANTITY}
                    value={entity.quantity}
                    onChange={handleAttributeChange("quantity")} />
                <Numeric id={entity.id}
                    label={intlContext.text("UI", "turret-price")}
                    max={MAX_TURRET_PRICE}
                    min={MIN_TURRET_PRICE}
                    value={entity.price}
                    onChange={handleAttributeChange("price")} />
            </Stack>
            <Sheet>
                <Stack spacing={2} direction="row" justifyContent="space-between">
                    <Numeric id={entity.id}
                        label={intlContext.text("UI", "position-x")}
                        max={500}
                        min={-500}
                        value={entity.location?.x ?? 0}
                        onChange={onLocationChange("x")} />
                    <Numeric id={entity.id}
                        label={intlContext.text("UI", "position-y")}
                        max={500}
                        min={-500}
                        value={entity.location?.y ?? 0}
                        onChange={onLocationChange("y")} />
                </Stack>
            </Sheet>
        </Fragment>
    )
}