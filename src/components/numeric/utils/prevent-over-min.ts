export function preventOverMin(value: number, initial: number) {
    if (value < initial) {
        return initial;
    }

    return value;
}