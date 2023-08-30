import {Card, Divider, Table, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {CargoItem} from "../cargo-item";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ComponentType} from "@/constants/enums/components";

export function CargoTable() {
    const intlContext = useContext(IntlContext);
    const cargo = useSelector((state: RootState) => state.cargo);

    if (Object.keys(cargo).length === 0) {
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
                {Object.keys(cargo).sort((a, b) => a.localeCompare(b)).map((componentType) => {
                    return <CargoItem key={componentType} type={componentType as ComponentType}
                                      value={cargo[componentType as ComponentType]}/>
                })}
                </tbody>
            </Table>
        </Card>
    )
}