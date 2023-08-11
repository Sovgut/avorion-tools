import React, {useContext, useLayoutEffect} from "react";
import {TurretContext} from "../../contexts/turret";
import {useNavigate} from 'react-router-dom';

import {GettingStartedDesktop} from "./desktop";

export function GettingStarted() {
    const navigate = useNavigate();
    const turretContext = useContext(TurretContext);

    useLayoutEffect(() => {
        if (turretContext.records.length > 0) {
            navigate("/turret-planner");
        }
    }, [navigate, turretContext.records]);

    return <GettingStartedDesktop/>
}