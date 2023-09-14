import {ComponentType} from "~constants/enums/components";
import {MouseEvent, useContext} from "react";
import {Box, IconButton, Stack, Typography} from "@mui/joy";
import {ComponentsMeta} from "~constants/meta/components";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {SxProps} from "@mui/joy/styles/types";
import {createComponentCheckbox, deleteComponentCheckbox} from "~reducers/checkbox.ts";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from "react-responsive";
import {CopyAll} from "@mui/icons-material";
import {ComponentIcon} from "~components/component-icon";

type Props = {
    type: ComponentType,
}

export function ComponentItemType(props: Props) {
    const theme = useTheme();
    const intlContext = useContext(IntlContext);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

    function handleCheckbox() {
        if (checkbox.entities[props.type]) {
            dispatch(deleteComponentCheckbox({type: props.type}));
        } else {
            dispatch(createComponentCheckbox({type: props.type}));
        }
    }

    const sx: SxProps = {textDecoration: "none", opacity: 1};
    let fontSize: 'md' | number = 'md';
    let color: "danger" | "warning" | undefined;

    if (isSmallScreen) {
        fontSize = 12;
    }

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

    function handleCopyText(component: string) {
        return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation();

            window.navigator.clipboard.writeText(component).then();
        }
    }

    return (
        <td onClick={handleCheckbox} style={{paddingLeft: 8, paddingRight: 0, cursor: "pointer", userSelect: "none"}}>
            <Stack direction="row" alignItems="center" spacing={.5}>
                <Box sx={{opacity: checkbox.entities[props.type] ? '.5' : '1'}}>
                    <ComponentIcon type={props.type}/>
                </Box>
                <Typography fontSize={fontSize} color={color} sx={sx}>
                    {intlContext.text("COMPONENT", props.type)}
                </Typography>
                {!isSmallScreen && (
                    <IconButton size="sm"
                                title={intlContext.text("UI", 'copy')}
                                onClick={handleCopyText(intlContext.text("COMPONENT", props.type))}>
                        <CopyAll/>
                    </IconButton>
                )}
            </Stack>
        </td>
    )
}