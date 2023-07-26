import {useContext, useEffect} from "react";
import {TurretContext} from "../contexts/turret";
import {IntlContext} from "../contexts/intl";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export function ComponentList() {
    const turretContext = useContext(TurretContext)
    const intlContext = useContext(IntlContext);

    useEffect(() => {
    }, [turretContext.turrets, intlContext.language]);

    const list = Object.keys(turretContext.turrets).reduce((acc: any, cur: any) => {
        const components = turretContext.turrets[cur];

        for (const component of Object.keys(components)) {
            if (!acc[component]) {
                acc[component] = 0;
            }

            // @ts-ignore
            acc[component] += components[component];
        }

        return acc;
    }, {})

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{intlContext.text("UI", "component")}</TableCell>
                        <TableCell align="right">{intlContext.text("UI", "quantity")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(list).map((row) => (
                        <TableRow
                            key={row}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {intlContext.text("GOODS", row)}
                            </TableCell>
                            <TableCell align="right">{list[row]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}