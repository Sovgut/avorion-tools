import { Stack } from "@mui/joy";
import { Fragment, useContext, useMemo, useState } from "react";
import { IntlContext } from "~contexts/intl";
import { Numeric } from "~components/numeric";
import { MAX_COMPONENT_QUANTITY } from "~constants/common";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { RootState } from "~store";
import { updateComponent } from "~reducers/component.ts";
import { Turret as TurretEntity } from "~models/turret";
import { Commodity } from "~data/commodities/enums";

type Props = {
    entity: TurretEntity
}

export function TurretComponents({ entity }: Props) {
    const [fallbackComponents] = useState<string[]>(new Array(7).fill(null).map(() => nanoid()))

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    const componentStore = useSelector((state: RootState) => state.component);

    function handleComponentChange(type: Commodity) {
        return function $handleComponentChange(id: string, value: string | null) {
            if (value === '' || value === null || value === '-') {
                dispatch(updateComponent({
                    type: Number(type),
                    quantity: 0,
                    id: id,
                    turret_id: entity.id
                }));
                return;
            }

            const numericValue = Number(value);
            if (!isNaN(numericValue)) {
                dispatch(updateComponent({
                    type: Number(type),
                    quantity: numericValue,
                    id: id,
                    turret_id: entity.id
                }));
            }
        }
    }

    const list = useMemo(() => {
        return componentStore.entities.filter(component => component.turret_id === entity.id)
    }, [componentStore.entities, entity.id]);


    if (list.length === 0) {
        return (
            <Stack spacing={2} sx={{ p: 2, pt: 0 }}>
                {fallbackComponents.map((key) => (
                    <Numeric key={key} disabled />
                ))}
            </Stack>
        )
    }

    return (
        <Stack spacing={2} sx={{ p: 2, pt: 0 }}>
            {list.map(component => (
                <Numeric
                    key={component.id}
                    id={component.id}
                    max={MAX_COMPONENT_QUANTITY}
                    label={intlContext.text("COMMODITY", component.type)}
                    value={component.quantity}
                    onChange={handleComponentChange(component.type)} />
            ))}

            {list.length === 5 &&
                <Fragment>
                    <Numeric disabled />
                    <Numeric disabled />
                </Fragment>
            }

            {list.length === 6 &&
                <Numeric disabled />
            }
        </Stack>
    )
}