export function preventNaN(value: number | string, initial: number) {
    if (value === '-') {
        return '-';
    }
    
    if (Number.isNaN(Number(value))) {
        return initial;
    }

    return Number(value);
}