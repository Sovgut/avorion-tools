import {useLayoutEffect} from "react";
import {useNavigate} from 'react-router-dom';

import {GettingStartedDesktop} from "./desktop";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export function GettingStarted() {
    const navigate = useNavigate();
    const turrets = useSelector((state: RootState) => state.turret)

    useLayoutEffect(() => {
        if (Object.keys(turrets).length > 0) {
            navigate("/turret-planner");
        }
    }, [navigate, turrets]);

    return <GettingStartedDesktop/>
}