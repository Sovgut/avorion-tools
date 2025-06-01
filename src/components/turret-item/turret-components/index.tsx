import {Stack} from "@mui/joy";
import {Fragment, useContext, useState} from "react";
import {IntlContext} from "~contexts/intl";
import {Numeric} from "~components/numeric";
import {MAX_COMPONENT_QUANTITY} from "~constants/common";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {RootState} from "~store";
import {updateComponent} from "~reducers/component.ts";
import { serializeCommoditites, serializeCommodity } from "~utils/serialize-commodity";

type Props = {
    id: string;
}

export function TurretComponents({id}: Props) {
    const [fallbackComponents] = useState<string[]>(new Array(7).fill(null).map(() => nanoid()))

    const intlContext = useContext(IntlContext);
    const dispatch = useDispatch();

    const componentStore = useSelector((state: RootState) => state.component);

    function handleComponentChange(type: string, value: string | null) {
        if (value === '' || value === null || value === '-') {
            dispatch(updateComponent({
                identity: id,
                entity: {
                    type: serializeCommodity(type),
                    quantity: 0,
                }
            }));
            return;
        }
        
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
            dispatch(updateComponent({
                identity: id,
                entity: {
                    type: serializeCommodity(type),
                    quantity: numericValue,
                }
            }));
        }
    }

    const list = serializeCommoditites(Object.keys(componentStore.entities[id] ?? {}));


    if (list.length === 0) {
        return (
            <Stack spacing={2} sx={{p: 2, pt: 0}}>
                {fallbackComponents.map((key) => (
                    <Numeric key={key} disabled/>
                ))}
            </Stack>
        )
    }

    return (
        <Stack spacing={2} sx={{p: 2, pt: 0}}>
            {list.map(type => (
                <Numeric
                    key={type}
                    id={String(type)}
                    max={MAX_COMPONENT_QUANTITY}
                    label={intlContext.text("COMMODITY", type)}
                    value={componentStore.entities[id][type]}
                    onChange={handleComponentChange}/>
            ))}

            {list.length === 5 &&
                <Fragment>
                    <Numeric disabled/>
                    <Numeric disabled/>
                </Fragment>
            }

            {list.length === 6 &&
                <Numeric disabled/>
            }
        </Stack>
    )
}