import React, {useContext, useState} from 'react';
import {TurretComponent} from "./components/turret";
import {nanoid} from "nanoid";
import {ComponentList} from "./components/list";
import {TurretContext} from "./contexts/turret";
import {IntlContext} from "./contexts/intl";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";

function App() {
    const [turrets, setTurrets] = useState<string[]>([nanoid()]);

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

    return (
        <Container sx={{p: 2}}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Button variant="contained" onClick={createTurret}>{intlContext.text("UI", "add-turret")}</Button>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={intlContext.language}
                            label="Language"
                            onChange={(e) => intlContext.selectLanguage(e.target.value)}
                        >
                            <MenuItem value={"en-US"}>English</MenuItem>
                            <MenuItem value={"ru"}>Russian</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2}>
                    {turrets.map(turret => <TurretComponent id={turret} key={turret} onRemove={removeTurret}/>)}
                    <ComponentList/>
                </Stack>
            </Stack>
        </Container>
    );
}

export default App;
