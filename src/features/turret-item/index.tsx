import {Card, CardContent, Divider, Stack} from "@mui/joy";
import {Turret} from "@/types";
import {TurretHeader} from "@/features/turret-header";
import {TurretOptions} from "@/features/turret-options";
import {TurretComponents} from "@/features/turret-components";

type TurretItemProps = {
    id: string;
    turret: Turret;
}

export function TurretItem(props: TurretItemProps) {
    return (
        <Card sx={{height: "100%", width: '100%', flexShrink: 0, boxShadow: "sm"}} variant="outlined">
            <TurretHeader turret={props.turret} id={props.id}/>

            <Divider/>

            <CardContent>
                <Stack spacing={2}>
                    <TurretOptions turret={props.turret} id={props.id}/>

                    <Divider/>

                    <TurretComponents turret={props.turret} id={props.id}/>
                </Stack>
            </CardContent>
        </Card>
    )
}