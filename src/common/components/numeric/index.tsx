import {type ChangeEvent, useEffect, useRef} from "react";

import {Input, Stack, Typography} from "@mui/joy";
import {useTheme} from '@mui/joy/styles';
import styles from './styles.module.css';
import {preventNaN} from "@/common/components/numeric/utils/prevent-nan";
import {preventOverMin} from "@/common/components/numeric/utils/prevent-over-min";
import {preventOverMax} from "@/common/components/numeric/utils/prevent-over-max";

type NumericProps = {
    id: string;
    label: string;
    labelWidth?: number;
    value?: string | number;
    defaultValue?: string | number;
    focus?: boolean
    min?: number;
    max?: number;

    onChange(id: string, value: string | null): void;
}

export function Numeric(props: NumericProps) {
    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body-md">{props.label}</Typography>
        </Stack>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value;
        const min = Number(props.min) ?? 0;
        const max = Number(props.max) ?? Number.MAX_SAFE_INTEGER;
        let parsed = Number(value ?? min);

        parsed = preventNaN(parsed, min);
        parsed = preventOverMin(parsed, min);
        parsed = preventOverMax(parsed, max);

        props.onChange(props.id, parsed.toString() || null);
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
                    className: styles.input,
                    style: {
                        color: `rgb(${theme.palette.primary.mainChannel})`,
                        textAlign: "right",
                        fontFamily: "monospace"
                    },
                    max: props.max,
                    ref,
                    onFocus,
                }
            }}
            onChange={onChange}
            onClick={onClick}
            type="number"
            value={String(props.value)}
            defaultValue={props.defaultValue}
        />
    )
}