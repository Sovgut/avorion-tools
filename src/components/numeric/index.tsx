import {type ChangeEvent, useEffect, useRef} from "react";

import {Input, Typography} from "@mui/joy";
import {useTheme} from '@mui/joy/styles';
import styles from './styles.module.css';
import {preventNaN} from "~components/numeric/utils/prevent-nan";
import {preventOverMin} from "~components/numeric/utils/prevent-over-min";
import {preventOverMax} from "~components/numeric/utils/prevent-over-max";

type NumericProps = {
    id: string;
    label: string;
    value?: string | number;
    focus?: boolean
    min?: number;
    max?: number;
    hidden?: boolean;

    onChange?(id: string, value: string | null): void;
}

export function Numeric(props: NumericProps) {
    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);

    const decorator = (
        <Typography className={styles.label} level="body-sm">
            {props.label}
        </Typography>
    );

    useEffect(() => {
        if (props.focus && ref.current) {
            handleFocus();
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

        props.onChange?.(props.id, parsed.toString() || null);
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
                        fontSize: theme.fontSize.sm,
                        fontFamily: "monospace",
                    },
                    max: props.max,
                    ref,
                }
            }}
            sx={{opacity: props.hidden ? '0.75' : '1'}}
            disabled={props.hidden}
            onChange={handleChange}
            onClick={handleClick}
            type="number"
            value={String(props.value ?? String())}
        />
    )
}