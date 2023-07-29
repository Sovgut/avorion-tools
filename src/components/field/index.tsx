import {type ChangeEvent} from "react";
import {type IFieldComponent} from "./types";

import {Divider, Input, Stack, Typography} from "@mui/joy";

export function FieldComponent(props: IFieldComponent) {
    const sx = {
        minWidth: "auto"
    }

    if (props.labelWidth) {
        sx.minWidth = `${props.labelWidth}rem`
    }

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body2" sx={sx}>{props.label}</Typography>
            <Divider orientation="vertical"/>
        </Stack>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        props.onChange(props.id, e.target.value);
    }

    return (
        <Input
            sx={{width: "100%"}}
            startDecorator={decorator}
            onChange={onChange}
            type={props.type}
            value={props.value}
            defaultValue={props.defaultValue}
        />
    )
}