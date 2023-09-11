import {ComponentType} from "@/constants/enums/components";
import React, {Fragment, useContext} from "react";
import {Box, Checkbox, Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {ComponentsMeta} from "@/constants/meta/components";
import {IntlContext} from "@/contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {checkboxAdd, checkboxRemove} from "@/reducers/checkbox";
import {SxProps} from "@mui/joy/styles/types";

type Props = {
    type: ComponentType,
}

export function ComponentItemType(props: Props) {
    const intlContext = useContext(IntlContext);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const dispatch = useDispatch();

    function handleCheckbox() {
        if (checkbox[props.type]) {
            dispatch(checkboxRemove(props.type));
        } else {
            dispatch(checkboxAdd(props.type));
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

    if (checkbox[props.type]) {
        sx.textDecoration = "line-through";
        sx.opacity = .5;
    }

    return (
        <Fragment>
            <td>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Checkbox size="sm" onChange={handleCheckbox} checked={!!checkbox[props.type]}/>
                </Box>
            </td>
            <td style={{paddingLeft: 0, paddingRight: 0}}>
                <Stack direction="row" spacing={1}>
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