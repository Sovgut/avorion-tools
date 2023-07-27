import {TurretState} from "../../turret/types";
import {useContext, useEffect} from "react";
import {Card, Table, Typography} from "@mui/joy";
import {IntlContext} from "../../../contexts/intl";

interface ComponentListProps {
    list: TurretState[]
}

export function ComponentList(props: ComponentListProps) {
    const intlContext = useContext(IntlContext);

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
        }

        return acc;
    }, {} as any);

    return (
        <Card>
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th>{intlContext.text("UI", "component")}</th>
                    <th style={{width: "7rem"}}>{intlContext.text("UI", "quantity")}</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(rows).map((row) => (
                    <tr key={row}>
                        <td>{intlContext.text("COMPONENT", row)}</td>
                        <td style={{textAlign: "right"}}><Typography color="primary">{rows[row]}</Typography></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    )
}