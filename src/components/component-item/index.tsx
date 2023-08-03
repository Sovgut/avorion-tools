import {Component, ComponentInfo, SellerInfo} from "../../constants";
import {Box, Checkbox, Link, Stack, Typography} from "@mui/joy";
import {DescriptionOutlined as LinkIcon} from "@mui/icons-material";
import {useContext, useEffect, useRef, useState} from "react";
import {IntlContext} from "../../contexts/intl";
import styles from './styles.module.css'
import {CargoContext} from "../../contexts/cargo";
import {ComponentItemType} from "../component-item-type";
import {ComponentAddCargo} from "../component-add-cargo";

interface ComponentItemProps {
    type: Component;
    value: number;
}

export function ComponentItem(props: ComponentItemProps) {
    const [isChecked, setIsChecked] = useState(localStorage.getItem(`cache:checkbox-${props.type.toLowerCase().replace(/\s/gm, "-")}`) === "true");

    const intlContext = useContext(IntlContext);
    const cargoContext = useContext(CargoContext);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setIsChecked(false);
        localStorage.setItem(`cache:checkbox-${props.type.toLowerCase().replace(/\s/gm, "-")}`, "false");
    }, [props.type, props.value]);

    useEffect(() => {
        return function cleanup() {
            localStorage.removeItem(`cache:checkbox-${props.type.toLowerCase().replace(/\s/gm, "-")}`)
        }
    }, [props.type]);


    function onCheckboxCheck() {
        setIsChecked((prevState) => {
            localStorage.setItem(`cache:checkbox-${props.type.toLowerCase().replace(/\s/gm, "-")}`, (!prevState ?? true).toString());

            return !prevState ?? true
        });
    }

    function calculateQuantity() {
        const cargo = cargoContext.byType(props.type);
        const value = props.value - cargo.reduce((acc, cur) => acc + cur.quantity, 0);

        return value > 0 ? value : 0;
    }

    return (
        <tr key={props.type}>
            <td>
                <Checkbox onChange={() => onCheckboxCheck()} checked={isChecked}/>
            </td>
            <td>
                <Stack direction="row" spacing={1}>
                    <img className={styles.icon} src={ComponentInfo[props.type].icon} alt={props.type}/>
                    <ComponentItemType type={props.type} isChecked={isChecked}/>
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
                    color={calculateQuantity() !== props.value ? "warning" : "primary"}
                    fontWeight="bold"
                >
                    {calculateQuantity().toLocaleString()}
                </Typography>
            </td>
            <td>
                <ComponentAddCargo type={props.type}/>
            </td>
        </tr>
    )
}