import {type ChangeEvent, useEffect, useRef} from "react";

import {Input, Stack, Typography} from "@mui/joy";
import {useTheme} from '@mui/joy/styles';

type FieldProps = {
    id: string;
    label: string;
    labelWidth?: number;
    value?: string | number;
    defaultValue?: string | number;
    type: "text" | "number";
    focus?: boolean
    maxValue: number

    onChange(id: string, value: string | null): void;
}

export function Field(props: FieldProps) {
    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body-md">{props.label}</Typography>
        </Stack>
    );

    function trimZeroNumber(value: string | null) {
        if (!value) return undefined;
        let result = value.split("");

        for (let i = 0; i < value.length; i++) {
            if (result.length > 2) {
                if (result[i] === "0") {
                    result.shift();
                } else {
                    break;
                }
            }
        }

        return result.join("");
    }

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = trimZeroNumber(e.target.value);

        props.onChange(props.id, value || null);
    }

    useEffect(() => {
        if (props.focus && ref.current) {
            ref.current.focus();
        }
    }, [props.focus]);

    function onFocus(): void {
        if (ref.current) {
            ref.current.select()
        }
    }

    function onClick(): void {
        if (ref.current) {
            ref.current.focus();
        }
    }

    return (
        <Input
            sx={{width: "100%", display: "flex", justifyContent: "space-between"}}
            startDecorator={decorator}
            slotProps={{
                input: {
                    inputMode: "numeric",
                    style: {
                        color: `rgb(${theme.palette.primary.mainChannel})`,
                        textAlign: "right",
                        fontFamily: "monospace"
                    },
                    max: props.maxValue,
                    ref,
                    onFocus,
                }
            }}
            onChange={onChange}
            onClick={onClick}
            type="text"
            value={trimZeroNumber(String(props.value))}
            defaultValue={props.defaultValue}
        />
    )
}