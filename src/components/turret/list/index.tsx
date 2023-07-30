import {Button, Container, Grid, Option, Select, Stack, useColorScheme} from "@mui/joy";
import {Component, Turret} from "../../../constants";
import React, {useContext, useEffect, useRef, useState} from "react";
import {nanoid} from "nanoid";
import {TurretState} from "../types";
import {TurretItem} from "../item";
import {ComponentList} from "../../component/list";
import {IntlContext} from "../../../contexts/intl";
import {FIRST_TURRET} from "./constants";
import {IIntlTurret} from "../../../contexts/intl/storage/types";
import {VolumeOffOutlined, VolumeUpOutlined} from "@mui/icons-material";

export function TurretList() {
    const [list, setList] = useState<TurretState[]>([]);
    const [selected, setSelected] = useState<keyof typeof Turret>(Object.keys(Turret)[FIRST_TURRET] as keyof typeof Turret);
    const [audioState, setAudio] = useState(true);

    const {mode, setMode} = useColorScheme();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const intlContext = useContext(IntlContext);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;

            if (localStorage.getItem("cache:audio") !== "false") {
                window.addEventListener("click", async () => await audioRef.current?.play(), {once: true});
            }
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (audioState) {
                audioRef.current?.play();
            } else {
                audioRef.current?.pause();
            }

            localStorage.setItem("cache:audio", audioState.toString());
        }
    }, [audioState]);

    useEffect(() => {
        const cache = localStorage.getItem("cache");

        if (cache) {
            const parsed = JSON.parse(cache);

            setList(parsed);
        }
    }, [])

    function createComponent(component: Component) {
        const key = nanoid();

        return {key, type: component, quantity: 0}
    }

    function onSelectTurret(value: string | null) {
        setSelected(value as keyof typeof Turret);
    }

    function onAddTurret() {
        if (!selected) return;

        const key = nanoid();
        const turret = {
            key,
            type: selected,
            quantity: 1,
            price: 0,
            icon: Turret[selected].icon,
            version: Turret[selected].version,
            components: Turret[selected].components.map(createComponent),
        }

        setList(prevState => {
            const turrets = [...prevState, turret];

            localStorage.setItem("cache", JSON.stringify(turrets))

            return turrets
        })
    }

    function onRemoveTurret(tKey: string) {
        if (window.confirm(intlContext.text("UI", "remove-turret-confirmation"))) {
            setList(prevState => {
                const turrets = prevState.filter(turret => turret.key !== tKey);

                localStorage.setItem("cache", JSON.stringify(turrets))

                return turrets;
            })
        }
    }

    function onTurretQuantityChange(tKey: string, value: string | null) {
        if (Number(value) < 1) return;

        setList(prevState => {
            const copy = [...prevState];
            const turrets = copy.map(turret => {
                if (turret.key === tKey) {
                    turret.quantity = Number(value)
                }

                return turret;
            });

            localStorage.setItem("cache", JSON.stringify(turrets))

            return turrets
        })
    }

    function onTurretPriceChange(tKey: string, value: string | null) {
        if (Number(value) < 0) return;

        setList(prevState => {
            const copy = [...prevState];
            const turrets = copy.map(turret => {
                if (turret.key === tKey) {
                    turret.price = Number(value)
                }

                return turret;
            });

            localStorage.setItem("cache", JSON.stringify(turrets))

            return turrets
        })
    }

    function onComponentChange(tKey: string, cKey: string, value: string | null) {
        if (Number(value) < 0) return;

        setList(prevState => {
            const copy = [...prevState];
            const turrets = copy.map(turret => {
                if (turret.key === tKey) {
                    turret.components = turret.components.map(component => {
                        if (component.key === cKey) {
                            return {
                                key: component.key,
                                type: component.type,
                                quantity: Number(value)
                            }
                        }

                        return component
                    })
                }

                return turret;
            })

            localStorage.setItem("cache", JSON.stringify(turrets))

            return turrets
        })
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

    function onAudioStateChange() {
        setAudio(prevState => !prevState);
    }

    return (
        <Grid container spacing={1}>
            <audio src="/assets/audio/dune-herald-of-the-change-1-hour-edit.mp3"
                   ref={audioRef}
                   autoPlay={true}
                   loop/>

            <Grid container sm={12} sx={{mt: 2, mb: 1}}>
                <Grid sm={7}>
                    <Select value={selected} onChange={(e, v) => onSelectTurret(v)}>
                        {Object.keys(Turret).map(turret => <Option key={turret}
                                                                   value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>)}
                    </Select>
                </Grid>
                <Grid sm={5}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Button onClick={onAddTurret}
                                disabled={!selected}>{intlContext.text("UI", "add-turret")}</Button>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={onAudioStateChange}>{audioState ? <VolumeUpOutlined/> :
                                <VolumeOffOutlined/>}</Button>
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
                        {list.map(turret => (
                            <Grid key={turret.key} xs={6}>
                                <TurretItem key={turret.key} turret={turret}
                                            onComponentChange={onComponentChange}
                                            onRemoveTurret={onRemoveTurret}
                                            onTurretQuantityChange={onTurretQuantityChange}
                                            onTurretPriceChange={onTurretPriceChange}/>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid>

            <Grid xl={5} xs={12}>
                <Container disableGutters maxWidth={false}>
                    <ComponentList list={list}/>
                </Container>
            </Grid>
        </Grid>
    )
}