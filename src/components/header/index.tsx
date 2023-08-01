import {Box, Option, Select, Stack, useColorScheme} from "@mui/joy";
import React, {useContext} from "react";
import {IntlContext} from "../../contexts/intl";

export function Header() {
    const {mode, setMode} = useColorScheme();
    const intlContext = useContext(IntlContext);

    function onThemeChange(event: React.SyntheticEvent | null, newValue: string | null) {
        if (newValue) {
            setMode(newValue as "dark" | "light")
        }
    }

    function onLanguageChange(event: React.SyntheticEvent | null, newValue: string | null) {
        if (newValue) {
            intlContext.selectLanguage(newValue)
        }
    }

    return (
        <Stack direction="row" spacing={2} sx={{pt:2}} justifyContent="space-between">
            <Box>
                <img height={80} width={70} src="/logo.png" alt="Turrer Turtet" />
            </Box>
            <Stack direction="row" spacing={2}>
                <Select placeholder={intlContext.text("UI", "theme")}
                        defaultValue={mode}
                        onChange={onThemeChange}
                        sx={{ height: "2rem" }}
                >
                    <Option value="system">{intlContext.text("UI", "system-theme")}</Option>
                    <Option value="light">{intlContext.text("UI", "light-theme")}</Option>
                    <Option value="dark">{intlContext.text("UI", "dark-theme")}</Option>
                </Select>

                <Select placeholder={intlContext.text("UI", "language")}
                        defaultValue={intlContext.language}
                        onChange={onLanguageChange}
                        sx={{ height: "2rem" }}
                >
                    <Option value="en-US">{intlContext.text("UI", "english-language")}</Option>
                    <Option value="ru">{intlContext.text("UI", "russian-language")}</Option>
                </Select>
            </Stack>
        </Stack>
    )
}