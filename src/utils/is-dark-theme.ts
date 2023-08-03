export function isDarkTheme(mode: "light" | "dark" | "system" | undefined, system: "light" | "dark" | undefined): boolean {
    if (mode === 'system') {
        return system === 'dark';
    }

    return mode === 'dark';
}