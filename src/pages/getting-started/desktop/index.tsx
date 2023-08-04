import React, {useContext, useState} from "react";
import {TurretType} from "../../../constants";
import {IntlContext} from "../../../contexts/intl";
import {TurretContext} from "../../../contexts/turret";
import {Box, Button, Container, Option, Select, Sheet, Stack, Typography} from "@mui/joy";
import {Header} from "../../../components/header";
import {IIntlTurret} from "../../../contexts/intl/storage/types";
import {Add} from "@mui/icons-material";
import styles from './styles.module.css'

export function GettingStartedDesktop() {
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
        <Box sx={{display: "flex", position: "relative", width: "100%", height: "100vh", flexDirection: "column"}}>
            <Box sx={{position: "absolute", zIndex: 999, width: "100%"}}>
                <Header fontColor="white"/>
            </Box>
            <Stack direction="row" sx={{height: "100%"}}>
                <Box sx={{display: "flex", position: "relative", height: "100%", width: "50vw"}}>
                    <Box sx={{
                        top: 0,
                        left: 0,
                        position: "absolute",
                        zIndex: "0",
                        height: "100%",
                        width: "100%",
                        overflow: "hidden"
                    }}>
                        <video style={{width: "100%", height: "100%", objectFit: "cover"}}
                               src={`/assets/video/dark-background.mp4`}
                               autoPlay
                               loop
                               muted
                               controls={false}/>
                    </Box>
                    <Box sx={{
                        top: 0,
                        left: 0,
                        position: "absolute",
                        zIndex: "1",
                        height: "100%",
                        width: "100%",
                        background: "linear-gradient(to bottom, transparent, var(--joy-palette-background-level1))",
                        opacity: ".75"
                    }}/>
                </Box>
                <Container maxWidth={false} disableGutters sx={{height: "100%", width: "50vw"}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        borderLeft: "2px solid var(--joy-palette-background-level2)"
                    }}>
                        <Sheet sx={{position: "relative", width: "100%", height: "100%", p: 4, pt: 16}}>
                            <Box className={styles.pipes} sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                width: "100%",
                                height: "100%",
                                mixBlendMode: "difference",
                                filter: "invert(1)",
                            }}/>
                            <Box sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 2,
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(to bottom, var(--joy-palette-background-level1) 50%, transparent)"
                            }}/>
                            <Stack sx={{position: "relative", height: "calc(100% - 16rem)", zIndex: 3}}
                                   justifyContent="center" spacing={4}>
                                <Typography level="h2">Welcome pilot 👋</Typography>
                                <Stack spacing={2}>
                                    <Typography level="title-lg">Ready to upgrade your Avorion ship's defense
                                        system?</Typography>
                                    <Typography>
                                        Within our application,
                                        we can guide you through the process of adding a brand new turret! Not only we
                                        provide detailed recipes for constructing the turret, but we also offer a
                                        comprehensive rundown of the components required.
                                    </Typography>
                                    <Typography level="title-lg">Estimations</Typography>
                                    <Typography>
                                        To ensure you stay within budget,
                                        our application will calculate a price estimate for your proposed turret.
                                        Moreover,
                                        to ensure a perfect fit, we'll also provide volume estimations.
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Select value={selected} onChange={(e, v) => onSelectTurret(v)}
                                            sx={{width: "100%"}}>
                                        {Object.keys(TurretType).map(turret => (
                                            <Option key={turret}
                                                    value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>
                                        ))}
                                    </Select>
                                    <Button
                                        onClick={onAddTurret}
                                        disabled={!selected}
                                    >
                                        <Stack direction="row" sx={{width: "max-content"}} alignItems="center"
                                               spacing={1}>
                                            <Add/>
                                            {intlContext.text("UI", "add-turret")}
                                        </Stack>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Sheet>
                    </Box>
                </Container>
            </Stack>
        </Box>
    );
}