import {Stack, Tooltip, Typography} from "@mui/joy";
import {IntlComponent} from "@/contexts/intl/storage/types";
import {InfoOutlined as InfoIcon} from "@mui/icons-material";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {ComponentType} from "@/constants/enums/components";
import {ComponentsMeta} from "@/constants/meta/components";

type ComponentItemTypeProps = {
    type: ComponentType;
    isChecked?: boolean;
}

export function ComponentItemType(props: ComponentItemTypeProps) {
    const intlContext = useContext(IntlContext);

    function getComponentColor() {
        if (ComponentsMeta[props.type].dangerous) return "danger";
        if (ComponentsMeta[props.type].illegal) return "warning";

        return undefined;
    }

    if (ComponentsMeta[props.type].dangerous) {
        return (
            <Stack direction="row" spacing={.5} alignItems="center">
                <Typography
                    level="title-sm"
                    color={getComponentColor()}
                    sx={{textDecoration: props.isChecked ? "line-through" : "none"}}
                >
                    {intlContext.text("COMPONENT", props.type as keyof IntlComponent)}
                </Typography>
                <Tooltip size="sm" arrow title={intlContext.text("UI", "dangerous-cargo")} variant="soft"
                         color="danger"
                         placement="top">
                    <InfoIcon fontSize="small" sx={{cursor: "pointer"}}/>
                </Tooltip>
            </Stack>
        )
    }

    if (ComponentsMeta[props.type].illegal) {
        return (
            <Stack direction="row" spacing={.5} alignItems="center">
                <Typography
                    level="title-sm"
                    color={getComponentColor()}
                    sx={{textDecoration: props.isChecked ? "line-through" : "none"}}
                >
                    {intlContext.text("COMPONENT", props.type as keyof IntlComponent)}
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
            color={getComponentColor()}
            sx={{textDecoration: props.isChecked ? "line-through" : "none"}}
        >
            {intlContext.text("COMPONENT", props.type as keyof IntlComponent)}
        </Typography>
    )
}