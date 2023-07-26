import React, {useContext, useState} from 'react';
import {TurretComponent} from "./components/turret";
import {nanoid} from "nanoid";
import {ComponentList} from "./components/list";
import {TurretContext} from "./contexts/turret";
import {IntlContext} from "./contexts/intl";
import {
    Button,
    Container,
    createTheme,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    PaletteMode,
    Select,
    SelectChangeEvent,
    Stack,
    ThemeProvider
} from "@mui/material";
import {getSystemTheme} from "./utils/get-browser-theme";

function App() {
    const [turrets, setTurrets] = useState<string[]>([nanoid()]);
    const [theme, setTheme] = useState<PaletteMode>(localStorage.getItem("theme") as PaletteMode ?? getSystemTheme())

    const turretContext = useContext(TurretContext);
    const intlContext = useContext(IntlContext);

    function createTurret() {
        const id = nanoid();

        setTurrets(prevTurrets => ([...prevTurrets, id]))
    }

    function removeTurret(id: string) {
        setTurrets((prevState) => {
            return prevState.filter(turret => turret !== id);
        });

        turretContext.remove(id);
    }

    function onThemeChange(event: SelectChangeEvent) {
        setTheme(event.target.value as PaletteMode)
        localStorage.setItem("theme", event.target.value)
    }

    const themePalette = createTheme({
        palette: {
            mode: theme as PaletteMode,
        },
    });

    return (
        <ThemeProvider theme={themePalette}>
            <CssBaseline/>

            <Container sx={{p: 2}}>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="contained"
                                onClick={createTurret}>{intlContext.text("UI", "add-turret")}</Button>
                        <Stack direction="row" spacing={2}>
                            <FormControl>
                                <InputLabel
                                    id="theme-simple-select-label">{intlContext.text("UI", "theme")}</InputLabel>
                                <Select
                                    labelId="theme-simple-select-label"
                                    id="theme-simple-select"
                                    defaultValue={theme}
                                    label={intlContext.text("UI", "theme")}
                                    onChange={onThemeChange}
                                >
                                    <MenuItem value="light">{intlContext.text("UI", "light-theme")}</MenuItem>
                                    <MenuItem value="dark">{intlContext.text("UI", "dark-theme")}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel
                                    id="language-simple-select-label">{intlContext.text("UI", "language")}</InputLabel>
                                <Select
                                    labelId="language-simple-select-label"
                                    id="language-simple-select"
                                    defaultValue={intlContext.language}
                                    label={intlContext.text("UI", "language")}
                                    onChange={(e) => intlContext.selectLanguage(e.target.value)}
                                >
                                    <MenuItem value="en-US">{intlContext.text("UI", "english-language")}</MenuItem>
                                    <MenuItem value="ru">{intlContext.text("UI", "russian-language")}</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Stack spacing={2}>
                        {turrets.map(turret => <TurretComponent id={turret} key={turret} onRemove={removeTurret}/>)}
                        <ComponentList/>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default App;
