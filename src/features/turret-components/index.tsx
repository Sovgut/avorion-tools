import {Stack, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Field} from "@/components/field";
import {MAX_COMPONENT_QUANTITY} from "@/constants/common";
import {Component, TODOANY, Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateComponent} from "@/reducers/turrets";

type TurretComponentsProps = {
    id: string;
    turret: Turret;
}

export function TurretComponents(props: TurretComponentsProps) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onComponentChange(component: Component) {
        return function (id: string, value: string | null) {
            if (value && Number(value) >= 0 && Number(value) <= MAX_COMPONENT_QUANTITY) {

                dispatch(updateComponent({
                    id,
                    turretId: props.id,
                    data: {
                        key: component.key,
                        quantity: Number(value),
                    }
                }));
            }
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {Object.keys(props.turret.components).map(id => (
                    <Field
                        key={id}
                        id={id}
                        maxValue={MAX_COMPONENT_QUANTITY}
                        label={intlContext.text("COMPONENT", props.turret.components[id].key as TODOANY)}
                        labelWidth={14}
                        value={props.turret.components[id].quantity}
                        type="number"
                        onChange={onComponentChange(props.turret.components[id])}/>
                ))}
            </Stack>
        </Stack>
    )
}