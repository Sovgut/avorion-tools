import {Button, Container, Grid, Option, Select, Stack, useColorScheme} from "@mui/joy";
import React, {useContext} from "react";
import {TTurret} from "../../../types";
import {TurretItem} from "../item";
import {ComponentList} from "../../component/list";
import {IntlContext} from "../../../contexts/intl";
import {IIntlTurret} from "../../../contexts/intl/storage/types";
import {TurretContext} from "../../../contexts/turrets";
import {TurretMetadata} from "../../../contexts/turrets/constants";

export function TurretList() {
    const {mode, setMode} = useColorScheme();

    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);

    function onSelectTurret(value: string | null) {
        if (!value) return;

        turretContext.select(value as TTurret);
    }

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
        <Grid container spacing={1}>
            <Grid container sm={12} sx={{mt: 2, mb: 1}}>
                <Grid sm={7}>
                    <Select value={turretContext.selected} onChange={(e, v) => onSelectTurret(v)}>
                        {Object.keys(TurretMetadata).map(turret => <Option key={turret}
                                                                           value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>)}
                    </Select>
                </Grid>
                <Grid sm={5}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Button onClick={turretContext.add}>{intlContext.text("UI", "add-turret")}</Button>
                        <Stack direction="row" spacing={2}>
                            <Select placeholder={intlContext.text("UI", "theme")} defaultValue={mode}
                                    onChange={onThemeChange}>
                                <Option value="system">{intlContext.text("UI", "system-theme")}</Option>
                                <Option value="light">{intlContext.text("UI", "light-theme")}</Option>
                                <Option value="dark">{intlContext.text("UI", "dark-theme")}</Option>
                            </Select>

                            <Select placeholder={intlContext.text("UI", "language")} defaultValue={intlContext.language}
                                    onChange={onLanguageChange}>
                                <Option value="en-US">{intlContext.text("UI", "english-language")}</Option>
                                <Option value="ru">{intlContext.text("UI", "russian-language")}</Option>
                            </Select>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Grid xl={7} xs={12}>
                <Container disableGutters maxWidth={false}>
                    <Grid container spacing={1}>
                        {turretContext.container.map(turret => (
                            <Grid key={turret.key} xs={6}>
                                <TurretItem key={turret.key} turret={turret}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid>

            <Grid xl={5} xs={12}>
                <Container disableGutters maxWidth={false}>
                    <ComponentList/>
                </Container>
            </Grid>
        </Grid>
    )
}