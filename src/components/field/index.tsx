import {type ChangeEvent, useEffect, useRef} from "react";
import {type IFieldComponent} from "./types";

import {Input, Stack, Typography} from "@mui/joy";
import {useTheme} from '@mui/joy/styles';

export function Field(props: IFieldComponent) {
    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body-md">{props.label}</Typography>
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
            sx={{width: "100%", display: "flex", justifyContent: "space-between"}}
            startDecorator={decorator}
            slotProps={{
                input: {
                    style: {
                        color: `rgb(${theme.palette.primary.mainChannel})`,
                        textAlign: "right",
                        fontFamily: "monospace"
                    },
                    max: props.maxValue
                }
            }}
            onChange={onChange}
            type={props.type}
            value={props.value}
            defaultValue={props.defaultValue}
        />
    )
}