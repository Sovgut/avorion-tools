import {Box} from "@mui/joy";
import {Background} from "~components/background";
import {Header} from "~components/header";
import { Outlet } from "react-router";

export function App() {
    return (
        <Box id="layout">
            <Background/>
            <Header/>
            <Outlet />
        </Box>
    )
}