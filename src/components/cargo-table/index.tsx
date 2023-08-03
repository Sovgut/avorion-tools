import {Card, Divider, Table, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {CargoContext} from "../../contexts/cargo";
import {CargoItem} from "../cargo-item";

export function CargoTable() {
    const intlContext = useContext(IntlContext);
    const cargoContext = useContext(CargoContext);

    if (cargoContext.records.length === 0) {
        return null;
    }

    return (
        <Card variant="outlined">
            <Typography level="h3">{intlContext.text("UI", "cargo")}</Typography>
            <Divider/>
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th><Typography>{intlContext.text("UI", "component")}</Typography></th>
                    <th style={{width: "25%", textAlign: "right"}}>{intlContext.text("UI", "quantity")}</th>
                    <th style={{width: "4rem"}}></th>
                </tr>
                </thead>
                <tbody>
                {cargoContext.unite(cargoContext.records).sort((a, b) => a.type.localeCompare(b.type)).map((item) => {
                    const value = cargoContext.byType(item.type).reduce((acc, cur) => acc + cur.quantity, 0);

                    return <CargoItem key={item.type} type={item.type} value={value}/>
                })}
                </tbody>
            </Table>
        </Card>
    )
}