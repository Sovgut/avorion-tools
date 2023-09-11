export function preventNaN(value: number, initial: number) {
    if (Number.isNaN(value)) {
        return initial;
    }

    return value;
}