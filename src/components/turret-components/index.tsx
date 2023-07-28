import {type ITurretComponents} from "./types";

import {Stack, Typography} from "@mui/joy";
import {FieldComponent} from "../field";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";

export function TurretComponents(props: ITurretComponents) {
    const intlContext = useContext(IntlContext);

    function onComponentChange(tKey: string) {
        return function onChange(cKey: string, value: string | null): void {
            props.onComponentChange(tKey, cKey, value);
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {props.turret.components.map(component => (
                    <FieldComponent
                        key={component.key}
                        id={component.key}
                        label={intlContext.text("COMPONENT", component.type)}
                        labelWidth={14}
                        value={component.quantity}
                        type="number"
                        onChange={onComponentChange(props.turret.key)}/>
                ))}
            </Stack>
        </Stack>
    )
}