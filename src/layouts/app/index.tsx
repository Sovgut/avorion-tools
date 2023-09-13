import {ReactNode} from "react";
import {Box} from "@mui/joy";
import {Background} from "@/components/background";

type Props = {
    children: ReactNode;
}

export function App({children}: Props) {
    return (
        <Box>
            <Background/>
            {children}
        </Box>
    )
}