export function preventOverMax(value: number, initial: number) {
    if (value > initial) {
        return initial;
    }

    return value;
}