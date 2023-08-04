import {Link as MUILink, Option, Select, Stack, Typography, useColorScheme} from "@mui/joy";
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
        <Stack direction="row" spacing={2} sx={{pt: 2}} justifyContent="space-between">
            <Stack direction="row" spacing={4}>
                <Stack justifyItems="center" spacing={-1} sx={{opacity: .5, userSelect: "none", pointerEvents: "none"}}>
                    <Typography fontWeight="bolder" fontSize={18}>Avorion</Typography>
                    <Typography letterSpacing={4} fontSize={16}>Instruments</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <MUILink color="neutral" level="title-lg" underline="none" variant="plain" href="/turret-planner">
                        Turret planner
                    </MUILink>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Select placeholder={intlContext.text("UI", "theme")}
                        defaultValue={mode}
                        onChange={onThemeChange}
                        sx={{height: "2rem"}}
                >
                    <Option value="system">{intlContext.text("UI", "system-theme")}</Option>
                    <Option value="light">{intlContext.text("UI", "light-theme")}</Option>
                    <Option value="dark">{intlContext.text("UI", "dark-theme")}</Option>
                </Select>

                <Select placeholder={intlContext.text("UI", "language")}
                        defaultValue={intlContext.language}
                        onChange={onLanguageChange}
                        sx={{height: "2rem"}}
                >
                    <Option value="en-US">{intlContext.text("UI", "english-language")}</Option>
                    <Option value="ru">{intlContext.text("UI", "russian-language")}</Option>
                </Select>
            </Stack>
        </Stack>
    )
}