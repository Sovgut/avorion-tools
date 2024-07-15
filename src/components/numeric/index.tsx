import {type ChangeEvent, useEffect, useRef} from "react";

import {Input, Typography} from "@mui/joy";
import {useTheme} from '@mui/joy/styles';
import styles from './styles.module.css';
import {preventNaN} from "~components/numeric/utils/prevent-nan";
import {preventOverMin} from "~components/numeric/utils/prevent-over-min";
import {preventOverMax} from "~components/numeric/utils/prevent-over-max";

type NumericProps = {
    id?: string;
    label?: string;
    value?: string | number;
    focus?: boolean
    min?: number;
    max?: number;
    disabled?: boolean;

    onChange?(id: string, value: string | null): void;
}

export function Numeric({id, label, value, focus, min, max, disabled, onChange}: NumericProps) {
    const theme = useTheme();
    const ref = useRef<HTMLInputElement>(null);

    const decorator = (
        <Typography className={styles.label} level="body-sm">
            {label}
        </Typography>
    );

    useEffect(() => {
        if (focus && ref.current) {
            handleFocus();
        }
    }, [focus]);

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
        const initialMin = Number(min) ?? 0;
        const initialMax = Number(max) ?? Number.MAX_SAFE_INTEGER;
        let parsed = Number(value ?? initialMin);

        parsed = preventNaN(parsed, initialMin);
        parsed = preventOverMin(parsed, initialMin);
        parsed = preventOverMax(parsed, initialMax);

        onChange?.(id || String(), parsed.toString() || null);
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
                    max: max,
                    ref,
                }
            }}
            variant="plain"
            sx={{opacity: disabled ? '0.75' : '1'}}
            disabled={disabled}
            onChange={handleChange}
            onClick={handleClick}
            type="number"
            value={String(value ?? String())}
        />
    )
}