import {type ITurretComponents} from "./types";

import {Stack, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {ComponentContext} from "../../contexts/component";
import {FieldComponent} from "../field";

export function TurretComponents(props: ITurretComponents) {
    const intlContext = useContext(IntlContext);
    const componentContext = useContext(ComponentContext);

    function onComponentChange(id: string, value: string | null) {
        if (value && Number(value) >= 0) {
            componentContext.update(id, Number(value));
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {componentContext.turretComponents(props.turret.id).map(component => (
                    <FieldComponent
                        key={component.id}
                        id={component.id}
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