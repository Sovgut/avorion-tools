import {Box} from "@mui/joy";
import {ReactNode} from "react";
import styles from './styles.module.css';

type Props = {
    children: ReactNode;
}

export function GettingStartedLayout({children}: Props) {
    return (
        <Box className={styles.component}>
            {children}
        </Box>
    )
}