import {MouseEvent, useContext} from "react";
import {Box, IconButton, Typography} from "@mui/joy";
import {IntlContext} from "~contexts/intl";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "~store";
import {SxProps} from "@mui/joy/styles/types";
import {createComponentCheckbox, deleteComponentCheckbox} from "~reducers/checkbox.ts";
import {CopyAll} from "@mui/icons-material";
import {ComponentIcon} from "~components/component-icon";
import styles from "./styles.module.css";
import {useBreakpoint} from "~hooks/breakpoints";
import { Commodity } from "src/data/commodities/enums";
import { CommodityMetadata } from "src/data/commodities/metadata";

type Props = {
    type: Commodity;
};

export function ComponentItemType({type}: Props) {
    const intlContext = useContext(IntlContext);
    const checkbox = useSelector((state: RootState) => state.checkbox);
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();

    function handleCheckbox() {
        if (checkbox.entities[type]) {
            dispatch(deleteComponentCheckbox({type: type}));
        } else {
            dispatch(createComponentCheckbox({type: type}));
        }
    }

    const sx: SxProps = {textDecoration: "none", opacity: 1};
    let fontSize: "md" | number = "md";
    let color: "danger" | "warning" | undefined;

    if (breakpoint.sm) {
        fontSize = 12;
    }

    if (CommodityMetadata[type].dangerous) {
        color = "danger";
    }

    if (CommodityMetadata[type].illegal) {
        color = "warning";
    }

    if (checkbox.entities[type]) {
        sx.textDecoration = "line-through";
        sx.opacity = 0.5;
    }

    function handleCopyText(component: string) {
        return function $handleCopyText(e: MouseEvent<HTMLButtonElement>) {
            e.stopPropagation();

            window.navigator.clipboard.writeText(component).then();
        };
    }

    return (
        <td
            onClick={handleCheckbox}
            style={{
                paddingLeft: 16,
                paddingRight: 0,
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            <Box className={styles.component} sx={sx}>
                <ComponentIcon type={type}/>

                <Typography fontSize={fontSize} color={color} sx={sx}>
                    {intlContext.text("COMMODITY", type)}
                </Typography>

                {!breakpoint.sm && (
                    <IconButton
                        disabled={!!checkbox.entities[type]}
                        size="sm"
                        title={intlContext.text("UI", "copy")}
                        onClick={handleCopyText(intlContext.text("COMMODITY", type))}
                    >
                        <CopyAll/>
                    </IconButton>
                )}
            </Box>
        </td>
    );
}
