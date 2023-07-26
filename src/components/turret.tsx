import {GOODS} from "../constants";
import {ChangeEvent, ReactNode, useContext, useEffect, useState} from "react";
import {FieldComponent} from "./fields";
import {TurretContext} from "../contexts/turret";
import {nanoid} from "nanoid";
import {IntlContext} from "../contexts/intl";

interface TurretComponentProps {
    id: string;

    onRemove(id: string): void;
}

export function TurretComponent(props: TurretComponentProps) {
    const [multiply, setMultiply] = useState(1);
    const [fields, setFields] = useState<ReactNode[]>([]);
    const [components, setComponents] = useState<Partial<typeof GOODS>>({});

    const turretContext = useContext(TurretContext);
    const intlContext = useContext(IntlContext);

    useEffect(() => {
        const list = {};

        for (const component of Object.keys(components)) {
            // @ts-ignore
            list[component] = components[component] * multiply;
        }

        turretContext.set(props.id, list);
    }, [components, multiply])

    function onMultiplyChange(event: ChangeEvent<HTMLInputElement>) {
        setMultiply(Number(event.target.value));
    }

    function onChange(component: string, quantity: number, prevComponent?: string) {
        setComponents(prevState => {
            const newState = {...prevState};

            if (component) {
                // @ts-ignore
                newState[component] = quantity;
            }

            // @ts-ignore
            if (typeof prevComponent === "string" && typeof newState[prevComponent] === "number") {
                // @ts-ignore
                delete newState[prevComponent];
            }

            return newState;
        });
    }

    function createField() {
        const id = nanoid();
        const field = <FieldComponent key={id} onChange={onChange}/>

        setFields(prevFields => ([...prevFields, field]));
    }

    return (
        <div>
            <input type="number" min="1" defaultValue={1} onChange={onMultiplyChange}/>
            <button onClick={createField}>{intlContext.text("UI", "add-component")}</button>
            <button onClick={() => props.onRemove(props.id)}>{intlContext.text("UI", "remove-turret")}</button>
            {fields}
        </div>
    )
}