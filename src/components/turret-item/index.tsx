import {Card, Divider, Stack} from "@mui/joy";
import {TurretHeader} from "~components/turret-item/turret-header";
import {TurretOptions} from "~components/turret-item/turret-options";
import {TurretComponents} from "~components/turret-item/turret-components";
import {TurretEntity} from "~types/store/entity.ts";

type Props = {
    id: string;
    entity: TurretEntity;
}

export function Turret({id, entity}: Props) {
    return (
        <Card sx={{height: "100%", width: '100%', flexShrink: 0, boxShadow: "sm", p: 0}} variant="outlined">
            <TurretHeader entity={entity} id={id}/>

            <Divider/>

            <Stack spacing={2}>
                <TurretOptions entity={entity} id={id}/>

                <Divider/>

                <TurretComponents id={id}/>
            </Stack>
        </Card>
    )
}