import {useLayoutEffect} from "react";
import {useNavigate} from 'react-router-dom';

import {GettingStartedDesktop} from "./desktop";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
import {GettingStartedMobile} from "@/pages/getting-started/mobile";

export function GettingStartedPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const turrets = useSelector((state: RootState) => state.turret);
    const isSmallScreen = useMediaQuery({query: `(max-width: ${theme.breakpoints.values.md}px)`});

    useLayoutEffect(() => {
        if (turrets && Object.keys(turrets).length > 0) {
            navigate("/turret-planner", {replace: true});
        }
    }, [navigate, turrets]);

    if (isSmallScreen) {
        return <GettingStartedMobile/>;
    }

    return <GettingStartedDesktop/>
}