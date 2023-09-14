import {useContext} from "react";
import {Stack, Typography} from "@mui/joy";
import {ComponentType} from "~constants/enums/components";
import {ComponentsMeta} from "~constants/meta/components";
import {IntlContext} from "~contexts/intl";
import {useTheme} from "@mui/joy/styles";
import {useMediaQuery} from 'react-responsive';
import {ComponentIcon} from "~components/component-icon";

type Props = {
    type: ComponentType;
}

export function CargoItemType(props: Props) {
    const theme = useTheme();
    const intlContext = useContext(IntlContext);
    const isSmallScreen = useMediaQuery({
        query: `(max-width: ${theme.breakpoints.values.sm}px)`
    });

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

    return (
        <td style={{paddingRight: 0, userSelect: "none"}}>
            <Stack direction="row" spacing={1} alignItems="center">
                <ComponentIcon type={props.type}/>
                <Typography fontSize={fontSize} color={color}>
                    {intlContext.text("COMPONENT", props.type)}
                </Typography>
            </Stack>
        </td>
    )
}