import {Component, ComponentInfo, SellerInfo} from "../../../constants";
import {
    Alert,
    Box,
    Checkbox,
    Divider,
    Link,
    Menu,
    Stack,
    Tooltip,
    Typography,
    Dropdown,
    MenuButton, MenuItem, Button, Modal, ModalDialog, ModalClose
} from "@mui/joy";
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
import {IIntlComponent} from "../../../contexts/intl/storage/types";

interface ListItemProps {
    type: Component;
    value: number;
    cargo: number | undefined;
    index: number;

    onCargoChange(cType: string, value: string | null): void;
}

export function ListItem(props: ListItemProps) {
    const [isChecked, setIsChecked] = useState(localStorage.getItem(`checkboxes-${props.type}`) === "true");
    const [menuOpen, setMenuOpen] = useState(false);

    const intlContext = useContext(IntlContext);
    const isFirstRender = useRef(true);

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
                        level="title-sm"
                        color={getComponentColor(component)}
                        sx={{textDecoration: isChecked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component as keyof IIntlComponent)}
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
                        level="title-sm"
                        color={getComponentColor(component)}
                        sx={{textDecoration: isChecked ? "line-through" : "none"}}
                    >
                        {intlContext.text("COMPONENT", component as keyof IIntlComponent)}
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
                level="title-sm"
                color={getComponentColor(component)}
                sx={{textDecoration: isChecked ? "line-through" : "none"}}
            >
                {intlContext.text("COMPONENT", component as keyof IIntlComponent)}
            </Typography>
        )
    }

    function onCheckboxCheck() {
        setIsChecked((prevState) => {
            localStorage.setItem(`checkboxes-${props.type}`, (!prevState ?? true).toString());

            return !prevState ?? true
        });
    }

    function calculateQuantity() {
        const value = props.value - (props.cargo || 0);

        return value > 0 ? value : 0;
    }

    function onMenuToggle() {
        setMenuOpen(prevState => !prevState);
    }

    function onMenuClose() {
        setMenuOpen(false);
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
                        color={calculateQuantity() !== props.value ? "warning" : "primary"}
                        fontWeight="bold">{calculateQuantity().toLocaleString()}</Typography>
                    <Button variant="outlined" color="neutral" onClick={onMenuToggle}><MoreIcon/></Button>
                    <Modal open={menuOpen} onClose={onMenuClose}>
                        <ModalDialog
                            layout="center"
                            size="lg"
                            variant="plain"
                            sx={{pt: 0}}
                        >
                            <Stack spacing={2}>
                                <ModalClose onClick={onMenuClose}/>
                                <Typography level="h2">{props.type}</Typography>

                                <Stack spacing={2}>
                                    <Alert color="warning"
                                           variant="soft"
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
                                    <FieldComponent id={props.type}
                                                    label={intlContext.text("UI", "cargo-field-label")}
                                                    value={props.cargo || 0}
                                                    type="number"
                                                    focus
                                                    onChange={props.onCargoChange}/>
                                </Stack>
                            </Stack>
                        </ModalDialog>
                    </Modal>
                </Stack>
            </td>
        </tr>
    )
}