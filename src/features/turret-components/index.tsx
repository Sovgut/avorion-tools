import {Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Numeric} from "common/components/numeric";
import {MAX_COMPONENT_QUANTITY} from "@/constants/common";
import {Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateComponent} from "@/reducers/turret";
import {ComponentType} from "@/constants/enums/components";
import {nanoid} from "nanoid";

type TurretComponentsProps = {
    id: string;
    turret: Turret;
}

export function TurretComponents(props: TurretComponentsProps) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onComponentChange(type: string, value: string | null) {
        dispatch(updateComponent({
            type: type as ComponentType,
            turretId: props.id,
            data: Number(value)
        }));
    }

    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                {Object.keys(props.turret.components).map(componentType => (
                    <Numeric
                        key={componentType}
                        id={componentType}
                        max={MAX_COMPONENT_QUANTITY}
                        label={intlContext.text("COMPONENT", componentType as ComponentType)}
                        value={props.turret.components[componentType as ComponentType]}
                        onChange={onComponentChange}/>
                ))}

                {Object.keys(props.turret.components).length === 6 ? (
                    <Numeric
                        id={nanoid()}
                        label={String()}
                        hidden/>
                ) : null}
            </Stack>
        </Stack>
    )
}