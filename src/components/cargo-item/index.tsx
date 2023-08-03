import {Box, Button, Link, Stack, Typography} from "@mui/joy";
import styles from "../component-item/styles.module.css";
import {Component, ComponentInfo, SellerInfo} from "../../constants";
import {DescriptionOutlined as LinkIcon, Remove,} from "@mui/icons-material";
import {useContext} from "react";
import {IntlContext} from "../../contexts/intl";
import {CargoContext} from "../../contexts/cargo";
import {ComponentItemType} from "../component-item-type";

type CargoItemProps = {
    type: Component;
    value: number;
}

export function CargoItem(props: CargoItemProps) {
    const intlContext = useContext(IntlContext);
    const cargoContext = useContext(CargoContext);

    function onClear() {
        cargoContext.remove(props.type);
    }

    return (
        <tr key={props.type}>
            <td>
                <Stack direction="row" spacing={1}>
                    <img className={styles.icon} src={ComponentInfo[props.type].icon} alt={props.type}/>
                    <ComponentItemType type={props.type}/>
                </Stack>
                <Stack spacing={1} direction="row">
                    {ComponentInfo[props.type].soldBy.map(station => (
                        <Stack key={props.type + station} direction="row" alignItems="center">
                            <Box component="span">{intlContext.text("STATION", station)}</Box>
                            <Link key={props.type + station} href={SellerInfo[station].link} target="_blank">
                                <LinkIcon fontSize="small"/>
                            </Link>
                        </Stack>
                    ))}
                </Stack>
            </td>
            <td style={{textAlign: "right"}}>
                <Typography
                    color="primary"
                    fontWeight="bold"
                >
                    {props.value.toLocaleString()}
                </Typography>
            </td>
            <td>
                <Button variant="outlined" color="neutral" onClick={onClear}><Remove/></Button>
            </td>
        </tr>
    )
}