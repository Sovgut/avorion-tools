import {Stack} from "@mui/joy";
import {Fragment, useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Numeric} from "components/numeric";
import {MAX_COMPONENT_QUANTITY} from "@/constants/common";
import {Turret} from "@/types";
import {useDispatch} from "react-redux";
import {updateComponent} from "@/reducers/turret";
import {ComponentType} from "@/constants/enums/components";
import {nanoid} from "nanoid";

type Props = {
    id: string;
    turret: Turret;
}

export function TurretComponents({id, turret}: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    function onComponentChange(type: string, value: string | null) {
        dispatch(updateComponent({
            type: type as ComponentType,
            turretId: id,
            data: Number(value)
        }));
    }

    const components = Object.keys(turret.components) as ComponentType[];

    return (
        <Stack spacing={2}>
            {components.map(component => (
                <Numeric
                    key={component}
                    id={component}
                    max={MAX_COMPONENT_QUANTITY}
                    label={intlContext.text("COMPONENT", component)}
                    value={turret.components[component]}
                    onChange={onComponentChange}/>
            ))}

            {components.length === 5 &&
                <Fragment>
                    <Numeric
                        id={nanoid()}
                        label={String()}
                        hidden/>
                    <Numeric
                        id={nanoid()}
                        label={String()}
                        hidden/>
                </Fragment>
            }

            {components.length === 6 &&
                <Numeric
                    id={nanoid()}
                    label={String()}
                    hidden/>
            }
        </Stack>
    )
}