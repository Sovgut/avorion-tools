import {ChangeEvent, useContext, useState} from "react";
import {GOODS} from "../constants";
import {IntlContext} from "../contexts/intl";

interface FieldComponentProps {
    onChange(component: string, quantity: number, prevComponent?: string): void;
}

export function FieldComponent(props: FieldComponentProps) {
    const [component, setComponent] = useState<string | undefined>(undefined);
    const [quantity, setQuantity] = useState<number>(0);

    const intlContext = useContext(IntlContext);

    function onChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
        setQuantity(Number(event.target.value))

        if (!!component) {
            props.onChange(component, Number(event.target.value))
        }
    }

    function onChangeComponent(event: ChangeEvent<HTMLSelectElement>) {
        const copy = component;
        setComponent(event.target.value)

        props.onChange(event.target.value, quantity, copy)
    }

    return (
        <div>
            <select onChange={onChangeComponent}>
                {Object.keys(GOODS).map(g => <option key={g} value={g}>{intlContext.text("GOODS", g)}</option>)}
            </select>
            <input type="number" min="0" defaultValue={0} disabled={!component}
                   onChange={onChangeQuantity}/>
        </div>
    )
}