import {type ITurretComponents} from "./types";

import {Stack, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {ComponentContext} from "../../contexts/component";
import {Field} from "../field";

const MAX_COMPONENT_QUANTITY = 9_999;

export function TurretComponents(props: ITurretComponents) {
    const intlContext = useContext(IntlContext);
    const componentContext = useContext(ComponentContext);

    function onComponentChange(id: string, value: string | null) {
        if (value && Number(value) >= 0 && Number(value) <= MAX_COMPONENT_QUANTITY) {
            componentContext.update(id, Number(value));
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {componentContext.turretComponents(props.turret.id).map(component => (
                    <Field
                        key={component.id}
                        id={component.id}
                        maxValue={MAX_COMPONENT_QUANTITY}
                        label={intlContext.text("COMPONENT", component.type)}
                        labelWidth={14}
                        value={component.quantity}
                        type="number"
                        onChange={onComponentChange}/>
                ))}
            </Stack>
        </Stack>
    )
}