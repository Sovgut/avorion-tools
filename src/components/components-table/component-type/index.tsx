import {ComponentType} from "~constants/enums/components";
import {Fragment, useContext} from "react";
import {Box, Checkbox, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {ComponentsMeta} from "~constants/meta/components";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {SxProps} from "@mui/joy/styles/types";
import {createComponentCheckbox, deleteComponentCheckbox} from "~reducers/checkbox.ts";

type Props = {
    type: ComponentType,
}

export function ComponentItemType(props: Props) {
    const intlContext = useContext(IntlContext);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const dispatch = useDispatch();

    function handleCheckbox() {
        if (checkbox.entities[props.type]) {
            dispatch(deleteComponentCheckbox({type: props.type}));
        } else {
            dispatch(createComponentCheckbox({type: props.type}));
        }
    }

    const sx: SxProps = {textDecoration: "none", opacity: 1}
    let color: "danger" | "warning" | undefined;

    if (ComponentsMeta[props.type].dangerous) {
        color = "danger";
    }

    if (ComponentsMeta[props.type].illegal) {
        color = "warning";
    }

    if (checkbox.entities[props.type]) {
        sx.textDecoration = "line-through";
        sx.opacity = .5;
    }

    return (
        <Fragment>
            <td onClick={handleCheckbox}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Checkbox size="sm" onChange={handleCheckbox} checked={!!checkbox.entities[props.type]}/>
                </Box>
            </td>
            <td onClick={handleCheckbox} style={{paddingLeft: 0, paddingRight: 0}}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <img className={styles.icon}
                         src={ComponentsMeta[props.type].icon}
                         alt={intlContext.text("COMPONENT", props.type)}/>
                    <Typography key={props.type} color={color} sx={sx}>
                        {intlContext.text("COMPONENT", props.type)}
                    </Typography>
                </Stack>
            </td>
        </Fragment>
    )
}