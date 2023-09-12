import {ComponentType} from "@/constants/enums/components";
import {Stack, Typography} from "@mui/joy";
import styles from "./styles.module.css";
import {ComponentsMeta} from "@/constants/meta/components";
import React, {useContext} from "react";
import {IntlContext} from "@/contexts/intl";

type Props = {
    type: ComponentType;
}

export function CargoItemType(props: Props) {
    const intlContext = useContext(IntlContext);

    let color: "danger" | "warning" | undefined;

    if (ComponentsMeta[props.type].dangerous) {
        color = "danger";
    }

    if (ComponentsMeta[props.type].illegal) {
        color = "warning";
    }

    return (
        <td style={{paddingRight: 0}}>
            <Stack direction="row" spacing={1} alignItems="center">
                <img className={styles.icon}
                     src={ComponentsMeta[props.type].icon}
                     alt={intlContext.text("COMPONENT", props.type)}/>
                <Typography key={props.type} color={color}>
                    {intlContext.text("COMPONENT", props.type)}
                </Typography>
            </Stack>
        </td>
    )
}