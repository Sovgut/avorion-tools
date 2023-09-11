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
    value?: string | number;
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
            <Typography className={styles.label} level="body-md" fontWeight="bold"
                        sx={{opacity: .5}}>{props.label}</Typography>
        </Stack>
    );

    useEffect(() => {
        if (props.focus && ref.current) {
            handleFocus();
            ref.current.focus();
        }
    }, [props.focus]);

    function handleClick(): void {
        if (ref.current) {
            handleFocus()
        }
    }

    function handleFocus(): void {
        if (ref.current) {
            ref.current.select()
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e.target.value;
        const min = Number(props.min) ?? 0;
        const max = Number(props.max) ?? Number.MAX_SAFE_INTEGER;
        let parsed = Number(value ?? min);

        parsed = preventNaN(parsed, min);
        parsed = preventOverMin(parsed, min);
        parsed = preventOverMax(parsed, max);

        props.onChange(props.id, parsed.toString() || null);
    }

    return (
        <Input
            className={styles.component}
            startDecorator={decorator}
            slotProps={{
                input: {
                    inputMode: "numeric",
                    className: styles.input,
                    style: {
                        color: `rgb(${theme.palette.primary.mainChannel})`,
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: "bold"
                    },
                    max: props.max,
                    ref,
                    onFocus: handleFocus,
                }
            }}
            onChange={handleChange}
            onClick={handleClick}
            type="number"
            value={String(props.value)}
        />
    )
}