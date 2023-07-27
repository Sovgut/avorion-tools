import {TurretState} from "../../turret/types";
import {useContext, useEffect} from "react";
import {Card, Stack, Table, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";
import {Component, ComponentInfo} from "../../../constants";

interface ComponentListProps {
    list: TurretState[]
}

export function ComponentList(props: ComponentListProps) {
    const intlContext = useContext(IntlContext);

    let estimatedPrice = 0

    useEffect(() => {
    }, [props.list]);

    if (props.list.length === 0) return null;

    const rows = props.list.reduce((acc, cur) => {
        for (const component of cur.components) {
            if (!acc[component.type]) {
                acc[component.type] = component.quantity * cur.quantity;
            } else {
                acc[component.type] += component.quantity * cur.quantity;
            }

            estimatedPrice += (ComponentInfo[component.type].price * component.quantity) * cur.quantity;
        }

        return acc;
    }, {} as any);

    return (
        <Card>
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th>{intlContext.text("UI", "component")}</th>
                    <th style={{width: "8rem"}}>{intlContext.text("UI", "quantity")}</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(rows).map((row) => (
                    <tr key={row}>
                        <td>
                            <Typography level="h6">{intlContext.text("COMPONENT", row)}</Typography>
                            <Stack spacing={1} direction="row">
                                {ComponentInfo[row as Component].soldBy.map(station => (
                                    <Typography key={row + station} level="body3">
                                        {intlContext.text("STATION", station)}
                                    </Typography>
                                ))}
                            </Stack>
                        </td>
                        <td style={{textAlign: "right"}}>
                            <Typography color="primary">{rows[row]}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th>Estimated price</th>
                    <th style={{textAlign: "right"}}>{estimatedPrice.toLocaleString()}</th>
                </tr>
                </tfoot>
            </Table>
        </Card>
    )
}