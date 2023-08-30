/**
 * Checks if a given value is null.
 *
 * @param {unknown} value - The value to check.
 * @return {boolean} True if the value is null, false otherwise.
 */
export function isNull(value: unknown): value is null {
    return typeof value === "object" && value === null;
}