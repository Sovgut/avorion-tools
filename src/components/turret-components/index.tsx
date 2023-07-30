import {type ITurretComponents} from "./types";

import {Stack, Typography} from "@mui/joy";
import {FieldComponent} from "../field";
import {useContext, useEffect} from "react";
import {IntlContext} from "../../contexts/intl";
import {ComponentContext} from "../../contexts/components";
import {Component} from "../../constants";

export function TurretComponents(props: ITurretComponents) {
    const intlContext = useContext(IntlContext);
    const componentContext = useContext(ComponentContext);

    useEffect(() => {
    }, [componentContext.container]);

    function onComponentChange(tKey: string) {
        return function onChange(cType: string, value: string | null): void {
            if (Number(value) < 0) return;

            componentContext.update(tKey, cType as Component, Number(value));
        }
    }

    const components = componentContext.container[props.turret.key];

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {components && Object.keys(components).map(cType => (
                    typeof components[cType as Component] === "object" ? <FieldComponent
                        key={components[cType as Component]!.key}
                        id={cType}
                        label={intlContext.text("COMPONENT", cType as Component)}
                        labelWidth={14}
                        value={components[cType as Component]!.quantity}
                        type="number"
                        onChange={onComponentChange(props.turret.key)}/> : null
                ))}
            </Stack>
        </Stack>
    )
}