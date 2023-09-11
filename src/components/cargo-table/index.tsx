import React, {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Card, Divider, Table, Typography} from "@mui/joy";
import {ComponentType} from "@/constants/enums/components";
import {CargoItemType} from "@/components/cargo-table/cargo-type";
import {CargoItemQuantity} from "@/components/cargo-table/cargo-quantity";
import {CargoItemAction} from "@/components/cargo-table/cargo-action";

export function CargoTable() {
    const intlContext = useContext(IntlContext);
    const cargo = useSelector((state: RootState) => state.cargo);

    if (Object.keys(cargo).length === 0) {
        return null;
    }

    return (
        <Card variant="outlined" sx={{p: 0, mb: 2, gap: 0}}>
            <Typography level="body-lg" fontWeight="bold" textColor="white" sx={{p: 2, pb: 0}}>
                {intlContext.text("UI", "cargo")}
            </Typography>
            <Divider sx={{mt: 2}}/>
            <Table>
                <thead>
                <tr>
                    <th style={{paddingRight: 0, height: "max-content"}}>
                        <Typography>{intlContext.text("UI", "component")}</Typography>
                    </th>
                    <th style={{
                        textAlign: "right",
                        paddingLeft: 0,
                        paddingRight: 0,
                        height: "max-content"
                    }}>{intlContext.text("UI", "quantity")}</th>
                    <th style={{width: "40px", height: "max-content"}}></th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(cargo).sort((a, b) => a.localeCompare(b)).map(type => (
                    <tr key={type}>
                        <CargoItemType type={type as ComponentType}/>
                        <CargoItemQuantity value={cargo[type as ComponentType]}/>
                        <CargoItemAction type={type as ComponentType}/>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    )
}