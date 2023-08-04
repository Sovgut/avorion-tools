import {TurretType} from "../../constants";
import React, {useContext, useState} from "react";
import {IntlContext} from "../../contexts/intl";
import {TurretContext} from "../../contexts/turret";
import {useNavigate} from 'react-router-dom';

import {GettingStartedDesktop} from "./desktop";

export function GettingStarted() {
    const [selected, setSelected] = useState<TurretType>(TurretType.Chaingun);
    const navigate = useNavigate();

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

    if (turretContext.records.length > 0) {
        navigate("/turret-planner");
    }

    return <GettingStartedDesktop/>
}