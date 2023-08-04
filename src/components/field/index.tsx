import {type ChangeEvent, useEffect, useRef} from "react";
import {type IFieldComponent} from "./types";

import {Divider, Input, Stack, Typography} from "@mui/joy";

export function Field(props: IFieldComponent) {
    const ref = useRef<HTMLInputElement>(null);

    const sx = {
        minWidth: "auto"
    }

    if (props.labelWidth) {
        sx.minWidth = `${props.labelWidth}rem`
    }

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body-md" sx={sx}>{props.label}</Typography>
            <Divider orientation="vertical"/>
        </Stack>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        props.onChange(props.id, e.target.value);
    }

    useEffect(() => {
        if (props.focus && ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <Input
            ref={ref}
            sx={{width: "100%"}}
            startDecorator={decorator}
            onChange={onChange}
            type={props.type}
            value={props.value}
            defaultValue={props.defaultValue}
        />
    )
}