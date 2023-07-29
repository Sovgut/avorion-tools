import {Component, ComponentInfo, SellerInfo} from "../../../constants";
import {Alert, Box, Button, Checkbox, Divider, Link, Menu, Stack, Tooltip, Typography} from "@mui/joy";
import {
    DescriptionOutlined as LinkIcon,
    Info as NoteIcon,
    InfoOutlined as InfoIcon,
    MoreVert as MoreIcon
} from "@mui/icons-material";
import {useContext, useEffect, useRef, useState} from "react";
import {IntlContext} from "../../../contexts/intl";
import styles from './styles.module.css'
import {FieldComponent} from "../../field";

interface ListItemProps {
    type: Component;
    value: number;
    cargo: number | undefined;

    onCargoChange(cType: string, value: string | null): void;
}

export function ListItem(props: ListItemProps) {
    const [isChecked, setIsChecked] = useState(localStorage.getItem(`checkboxes-${props.type}`) === "true");
    const [open, setOpen] = useState(false);

    const intlContext = useContext(IntlContext);
    const isFirstRender = useRef(true);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setIsChecked(false);
        props.onCargoChange(props.type, "0");
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

    function onClose() {
        setOpen(false);
    }

    function onOpen() {
        setOpen(!open);
    }

    function calculateQuantity() {
        const value = props.value - (props.cargo || 0);

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
                <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                    <Typography
                        color={calculateQuantity() !== props.value ? "info" : "primary"}
                        fontWeight="bold">{calculateQuantity().toLocaleString()}</Typography>
                    <Button
                        variant="plain"
                        color="neutral"
                        sx={{height: "3rem", width: "3rem"}}
                        ref={buttonRef}
                        id={`cargo-${props.type}-menu`}
                        aria-controls={`cargo-${props.type}-menu`}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={onOpen}
                    >
                        <MoreIcon/>
                    </Button>
                </Stack>
                <Menu
                    id={`cargo-${props.type}-menu`}
                    anchorEl={buttonRef.current}
                    open={open}
                    onClose={onClose}
                    aria-labelledby={`cargo-${props.type}-button`}
                    sx={{width: "300px", pt: 0, pb: 0}}
                >
                    <Stack>
                        <Alert color="info"
                               sx={{alignItems: 'flex-start', borderRadius: 0}}
                               startDecorator={<NoteIcon/>}>
                            <Stack spacing={1}>
                                <Typography fontWeight="lg">
                                    {intlContext.text("UI", "please-note")}
                                </Typography>
                                <Typography fontSize="sm" sx={{opacity: 0.8}}>
                                    {intlContext.text("UI", "cargo-field-note")}
                                </Typography>
                            </Stack>
                        </Alert>
                        <Divider/>
                        <Box sx={{p: 1}}>
                            <FieldComponent id={props.type} label={intlContext.text("UI", "cargo-field-label")}
                                            value={props.cargo || 0} type="number"
                                            onChange={props.onCargoChange}/>
                        </Box>
                    </Stack>
                </Menu>
            </td>
        </tr>
    )
}