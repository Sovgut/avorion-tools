import {
    Button,
    Container,
    Dropdown,
    Grid,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Option,
    Select,
    Stack
} from "@mui/joy";
import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {TurretItem} from "../../components/turret-item";
import {TurretContext} from "../../contexts/turret";
import {ComponentTable} from "../../components/component-table";
import {TurretType} from "../../constants";
import {IIntlTurret} from "../../contexts/intl/storage/types";
import {Add, ArrowDropDown, ClearAll} from "@mui/icons-material";
import {IntlContext} from "../../contexts/intl";
import {CargoTable} from "../../components/cargo-table";
import {nanoid} from "nanoid";
import {TurretItemSkeleton} from "../../components/turret-item/skeleton";
import {ComponentTableSkeleton} from "../../components/component-table/skeleton";
import {Header} from "../../components/header";
import {useNavigate} from "react-router-dom";

export function TurretBuilder() {
    const [selected, setSelected] = useState<TurretType>(TurretType.Chaingun);
    const [skeletonTurrets, setSkeletonTurrets] = useState<string[]>([])
    const navigate = useNavigate();

    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);

    useEffect(() => {
        const turrets: string[] = [];

        for (let i = 0; i < 4; i++) {
            turrets.push(nanoid());
        }

        setSkeletonTurrets(turrets);
    }, []);

    useLayoutEffect(() => {
        if (turretContext.records.length === 0) {
            navigate("/turret-planner/getting-started");
        }
    }, [navigate, turretContext.records]);

    function onSelectTurret(value: TurretType | null) {
        if (value) {
            setSelected(value);
        }
    }

    function onAddTurret() {
        if (!selected) return;

        turretContext.add(selected);
    }

    function onClearTurrets() {
        turretContext.clear();
    }

    function renderTurrets() {
        if (turretContext.records.length === 0) {
            return renderTurretsSkeleton();
        }

        return turretContext.records.map(turret => (
            <Grid key={turret.id} xs={6}>
                <TurretItem key={turret.id} turret={turret}/>
            </Grid>
        ))
    }

    function renderTurretsSkeleton() {
        return skeletonTurrets.map(turret => (
            <Grid key={turret} xs={6}>
                <TurretItemSkeleton key={turret} id={turret}/>
            </Grid>
        ))
    }

    function renderComponents() {
        return turretContext.records.length === 0 ? renderComponentsSkeleton() : <ComponentTable/>
    }

    function renderComponentsSkeleton() {
        return <ComponentTableSkeleton/>
    }

    return (
        <Container maxWidth={false}>
            <Header disableGutters/>
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
                                    <Stack direction="row" sx={{width: "max-content"}} alignItems="center" spacing={1}>
                                        <Add/>
                                        {intlContext.text("UI", "add-turret")}
                                    </Stack>
                                </Button>
                                <Dropdown>
                                    <MenuButton variant="solid" color="primary">
                                        <ArrowDropDown/>
                                    </MenuButton>
                                    <Menu>
                                        <MenuItem
                                            color="danger"
                                            onClick={onClearTurrets}
                                            disabled={turretContext.records.length === 0}
                                        >
                                            <ListItemDecorator>
                                                <ClearAll/>
                                            </ListItemDecorator>
                                            {intlContext.text("UI", "clear-turrets")}
                                        </MenuItem>
                                    </Menu>
                                </Dropdown>
                            </Stack>
                        </Grid>
                        <Grid container xs={12}>
                            {renderTurrets()}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid xl={5} xs={12}>
                    <Container disableGutters maxWidth={false}>
                        <Stack spacing={1}>
                            <CargoTable/>
                            {renderComponents()}
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}