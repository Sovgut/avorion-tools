import {Button, Container, Grid, Option, Select, Stack} from "@mui/joy";
import React, {useContext, useState} from "react";
import {TurretItem} from "../turret-item";
import {TurretContext} from "../../contexts/turret";
import {ComponentTable} from "../component-table";
import {TurretType} from "../../constants";
import {IIntlTurret} from "../../contexts/intl/storage/types";
import {Add} from "@mui/icons-material";
import {IntlContext} from "../../contexts/intl";
import {CargoTable} from "../cargo-table";

export function TurretGrid() {
    const [selected, setSelected] = useState<TurretType>(TurretType.Chaingun);

    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);

    function onSelectTurret(value: TurretType | null) {
        if (value) {
            setSelected(value);
        }
    }

    function onAddTurret() {
        if (!selected) return;

        turretContext.add(selected);
    }

    return (
        <Grid container xs={12} spacing={1}>
            <Grid container xl={7} xs={12}>
                <Grid container xs={12} spacing={1} alignContent="flex-start">
                    <Grid xs={12}>
                        <Stack direction="row" spacing={1}>
                            <Select value={selected} onChange={(e, v) => onSelectTurret(v)} sx={{width: "100%"}}>
                                {Object.keys(TurretType).map(turret => (
                                    <Option key={turret}
                                            value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={onAddTurret}
                                disabled={!selected}
                            >
                                <Add/>
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid container xs={12}>
                        {turretContext.records.map(turret => (
                            <Grid key={turret.id} xs={6}>
                                <TurretItem key={turret.id} turret={turret}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid xl={5} xs={12}>
                <Container disableGutters maxWidth={false}>
                    <Stack spacing={1}>
                        <CargoTable/>
                        <ComponentTable/>
                    </Stack>
                </Container>
            </Grid>
        </Grid>
    )
}