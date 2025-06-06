import {Card, Divider, Stack} from "@mui/joy";
import {TurretHeader} from "~components/turret-item/turret-header";
import {TurretOptions} from "~components/turret-item/turret-options";
import {TurretComponents} from "~components/turret-item/turret-components";
import { Turret as TurretEntity } from "~models/turret";

type Props = {
    entity: TurretEntity;
}

export function Turret({entity}: Props) {
    return (
        <Card sx={{height: "100%", width: '100%', flexShrink: 0, boxShadow: "sm", p: 0}}
              variant="soft">
            <TurretHeader entity={entity} />

            <Divider/>

            <Stack spacing={2}>
                <TurretOptions entity={entity} />

                <Divider/>

                <TurretComponents entity={entity} />
            </Stack>
        </Card>
    )
}