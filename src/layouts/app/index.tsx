import {ReactNode} from "react";
import {Box} from "@mui/joy";
import {Background} from "~components/background";
import {Header} from "~components/header";

type Props = {
    children: ReactNode;
}

export function App({children}: Props) {
    return (
        <Box>
            <Background/>
            <Header/>
            {children}
        </Box>
    )
}