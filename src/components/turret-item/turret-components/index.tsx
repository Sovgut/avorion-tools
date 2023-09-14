import {Stack} from "@mui/joy";
import {Fragment, useContext} from "react";
import {IntlContext} from "~contexts/intl";
import {Numeric} from "~components/numeric";
import {MAX_COMPONENT_QUANTITY} from "~constants/common";
import {useDispatch, useSelector} from "react-redux";
import {ComponentType} from "~constants/enums/components";
import {nanoid} from "nanoid";
import {RootState} from "~store";
import {updateComponent} from "~reducers/component.ts";

type Props = {
    id: string;
}

export function TurretComponents({id}: Props) {
    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    const componentStore = useSelector((state: RootState) => state.component);

    function handleComponentChange(type: string, value: string | null) {
        dispatch(updateComponent({
            identity: id,
            entity: {
                type: type as ComponentType,
                quantity: Number(value),
            }
        }));
    }

    const list = Object.keys(componentStore.entities[id] ?? {}) as ComponentType[];

    return (
        <Stack spacing={2}>
            {list.map(type => (
                <Numeric
                    key={type}
                    id={type}
                    max={MAX_COMPONENT_QUANTITY}
                    label={intlContext.text("COMPONENT", type)}
                    value={componentStore.entities[id][type]}
                    onChange={handleComponentChange}/>
            ))}

            {list.length === 5 &&
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

            {list.length === 6 &&
                <Numeric
                    id={nanoid()}
                    label={String()}
                    hidden/>
            }
        </Stack>
    )
}