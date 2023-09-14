import {ComponentType} from "~constants/enums/components";
import {MouseEvent, useContext} from "react";
import {IconButton, Stack, Typography} from "@mui/joy";
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

export function ComponentItemType({type}: Props) {
    const theme = useTheme();
    const intlContext = useContext(IntlContext);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

    function handleCheckbox() {
        if (checkbox.entities[type]) {
            dispatch(deleteComponentCheckbox({type: type}));
        } else {
            dispatch(createComponentCheckbox({type: type}));
        }
    }

    const sx: SxProps = {textDecoration: "none", opacity: 1};
    let fontSize: 'md' | number = 'md';
    let color: "danger" | "warning" | undefined;

    if (isSmallScreen) {
        fontSize = 12;
    }

    if (ComponentsMeta[type].dangerous) {
        color = "danger";
    }

    if (ComponentsMeta[type].illegal) {
        color = "warning";
    }

    if (checkbox.entities[type]) {
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
        <td onClick={handleCheckbox} style={{paddingLeft: 16, paddingRight: 0, cursor: "pointer", userSelect: "none"}}>
            <Stack direction="row" alignItems="center" spacing={.5}>
                <ComponentIcon type={type}/>
                <Typography fontSize={fontSize} color={color} sx={sx} width="max-content">
                    {intlContext.text("COMPONENT", type)}
                </Typography>
                {!isSmallScreen && (
                    <IconButton size="sm"
                                title={intlContext.text("UI", 'copy')}
                                onClick={handleCopyText(intlContext.text("COMPONENT", type))}>
                        <CopyAll/>
                    </IconButton>
                )}
            </Stack>
        </td>
    )
}