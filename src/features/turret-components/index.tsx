import {Stack, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Field} from "@/common/components/field";
import {MAX_COMPONENT_QUANTITY} from "@/constants/common";
import {Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateComponent} from "@/reducers/turret";
import {ComponentType} from "@/constants/enums/components";

type TurretComponentsProps = {
    id: string;
    turret: Turret;
}

export function TurretComponents(props: TurretComponentsProps) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onComponentChange(type: string, value: string | null) {
        if (value && Number(value) >= 0 && Number(value) <= MAX_COMPONENT_QUANTITY) {
            dispatch(updateComponent({
                type: type as ComponentType,
                turretId: props.id,
                data: Number(value)
            }));
        }
    }

    return (
        <Stack spacing={2}>
            <Typography>{intlContext.text("UI", "components")}</Typography>
            <Stack spacing={2}>
                {Object.keys(props.turret.components).map(componentType => (
                    <Field
                        key={componentType}
                        id={componentType}
                        maxValue={MAX_COMPONENT_QUANTITY}
                        label={intlContext.text("COMPONENT", componentType as ComponentType)}
                        labelWidth={14}
                        value={props.turret.components[componentType as ComponentType]}
                        type="number"
                        onChange={onComponentChange}/>
                ))}
            </Stack>
        </Stack>
    )
}