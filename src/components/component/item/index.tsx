import {Component, ComponentInfo, SellerInfo} from "../../../constants";
import {Box, Checkbox, Link, Stack, Tooltip, Typography} from "@mui/joy";
import {DescriptionOutlined as LinkIcon, InfoOutlined as InfoIcon} from "@mui/icons-material";
import {useContext, useEffect, useRef, useState} from "react";
import {IntlContext} from "../../../contexts/intl";
import styles from './styles.module.css'

interface ListItemProps {
    type: Component;
    value: number;
}

export function ListItem(props: ListItemProps) {
    const [isChecked, setIsChecked] = useState(localStorage.getItem(`checkboxes-${props.type}`) === "true");

    const intlContext = useContext(IntlContext);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setIsChecked(false);
        localStorage.setItem(`checkboxes-${props.type}`, "false");
    }, [props.type, props.value]);

    useEffect(() => {
        return function cleanup() {
            localStorage.removeItem(`checkboxes-${props.type}`)
        }
    }, [props.type]);

    function getComponentColor(component: string) {
        if (ComponentInfo[component as Component].dangerous) return "danger";
        if (ComponentInfo[component as Component].illegal) return "warning";

        return undefined;
    }

    function getComponentComponent(component: string) {
        if (ComponentInfo[component as Component].dangerous) {
            return (
                <Stack direction="row" spacing={.5} alignItems="center">
                    <Typography
                        level="h6"
                        color={getComponentColor(component)}
                        sx={{textDecoration: isChecked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip size="sm" arrow title={intlContext.text("UI", "dangerous-cargo")} variant="soft"
                             color="danger"
                             placement="top">
                        <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                    </Tooltip>
                </Stack>
            )
        }

        if (ComponentInfo[component as Component].illegal) {
            return (
                <Stack direction="row" spacing={.5} alignItems="center">
                    <Typography
                        level="h6"
                        color={getComponentColor(component)}
                        sx={{textDecoration: isChecked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component)}
                    </Typography>
                    <Tooltip size="sm" arrow title={intlContext.text("UI", "illegal-cargo")} variant="soft"
                             color="warning"
                             placement="top">
                        <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                    </Tooltip>
                </Stack>
            )
        }

        return (
            <Typography
                level="h6"
                color={getComponentColor(component)}
                sx={{textDecoration: isChecked ? "line-through" : "none"}}
            >
                {intlContext.text("COMPONENT", component)}
            </Typography>
        )
    }

    function onCheckboxCheck() {
        setIsChecked((prevState) => {
            localStorage.setItem(`checkboxes-${props.type}`, (!prevState ?? true).toString());

            return !prevState ?? true
        });
    }

    return (
        <tr key={props.type}>
            <td>
                <Checkbox onChange={() => onCheckboxCheck()} checked={isChecked}/>
            </td>
            <td>
                <Stack direction="row" spacing={1}>
                    <img className={styles.icon} src={ComponentInfo[props.type].icon} alt={props.type}/>
                    {getComponentComponent(props.type)}
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
                <Typography color="primary">{props.value.toLocaleString()}</Typography>
            </td>
        </tr>
    )
}