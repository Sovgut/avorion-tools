import {ChangeEvent, SyntheticEvent, useContext, useState} from "react";
import {IntlContext} from "../contexts/intl";
import {INTL} from "../intl";
import {Autocomplete, Stack, TextField} from "@mui/material";

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

    function onChangeComponent(event: SyntheticEvent, value: string | null) {
        console.log(event, value);
        const copy = component;

        let key = String();

        // @ts-ignore
        for (const item of Object.keys(INTL["GOODS"][intlContext.language])) {
            // @ts-ignore
            if (INTL["GOODS"][intlContext.language][item] === value) {
                key = item;
                break;
            }
        }

        setComponent(key)

        props.onChange(key, quantity, copy)
    }

    // @ts-ignore
    const options = Object.values(INTL["GOODS"][intlContext.language]) as string[]

    return (
        <Stack direction="row" spacing={2}>
            <Autocomplete
                onChange={onChangeComponent}
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label={intlContext.text("UI", "component")}/>}
            />
            <TextField type="number" inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: 0}}
                       disabled={!component} defaultValue={0}
                       onChange={onChangeQuantity}/>
        </Stack>
    )
}