import {Box, Button, Container, Grid, Option, Select, Stack, useColorScheme} from "@mui/joy";
import {Component, Turret} from "../../../constants";
import React, {useContext, useEffect, useRef, useState} from "react";
import {nanoid} from "nanoid";
import {TurretState} from "../types";
import {TurretItem} from "../item";
import {ComponentList} from "../../component/list";
import {IntlContext} from "../../../contexts/intl";
import {FIRST_TURRET} from "./constants";
import {IIntlTurret} from "../../../contexts/intl/storage/types";
import {Add, VolumeOffOutlined, VolumeUpOutlined} from "@mui/icons-material";

export function TurretList() {
    const [list, setList] = useState<TurretState[]>([]);
    const [selected, setSelected] = useState<keyof typeof Turret>(Object.keys(Turret)[FIRST_TURRET] as keyof typeof Turret);

    const intlContext = useContext(IntlContext);

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

    function onClearTurrets() {
        if (window.confirm(intlContext.text("UI", "clear-turrets-confirmation"))) {
            localStorage.removeItem("cache");

            setList([]);
        }
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



    return (
        <Grid container xs={12} spacing={1}>
            <Grid container xl={7} xs={12}>
                <Grid container xs={12} spacing={1} alignContent="flex-start">
                    <Grid xs={12}>
                        <Stack direction="row" spacing={1}>
                            <Select value={selected} onChange={(e, v) => onSelectTurret(v)} sx={{width: "100%"}}>
                                {Object.keys(Turret).map(turret => <Option key={turret}
                                                                           value={turret}>{intlContext.text("TURRET", turret as keyof IIntlTurret)}</Option>)}
                            </Select>
                            <Button onClick={onAddTurret}
                                    disabled={!selected}
                            >
                                <Add />
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid container xs={12}>
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
                </Grid>
            </Grid>

            <Grid xl={5} xs={12}>
                <Container disableGutters maxWidth={false}>
                    <ComponentList list={list}/>
                </Container>
            </Grid>
        </Grid>
    )
}