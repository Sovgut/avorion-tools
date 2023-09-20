import {useContext} from "react";
import {Stack, Typography} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {ComponentsMeta} from "~constants/meta/components";
import {IntlContext} from "~contexts/intl";
import {ComponentIcon} from "~components/component-icon";
import {useBreakpoint} from "~hooks/breakpoints";

type Props = {
    type: ComponentType;
}

export function CargoItemType({type}: Props) {
    const intlContext = useContext(IntlContext);
    const breakpoint = useBreakpoint();

    let fontSize: "md" | number = "md";
    let color: "danger" | "warning" | undefined;

    if (breakpoint.sm) {
        fontSize = 12;
    }

    if (ComponentsMeta[type].dangerous) {
        color = "danger";
    }

    if (ComponentsMeta[type].illegal) {
        color = "warning";
    }

    return (
        <td style={{paddingLeft: 16, paddingRight: 0, userSelect: "none"}}>
            <Stack direction="row" spacing={1} alignItems="center">
                <ComponentIcon type={type}/>
                <Typography fontSize={fontSize} color={color}>
                    {intlContext.text("COMPONENT", type)}
                </Typography>
            </Stack>
        </td>
    );
}