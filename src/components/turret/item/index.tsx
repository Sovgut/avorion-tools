import {type ITurretItem} from "./types";

import {Card, CardContent, Divider, Stack} from "@mui/joy";
import {TurretHeader} from "../../turret-header";
import {TurretOptions} from "../../turret-options";
import {TurretComponents} from "../../turret-components";

export function TurretItem(props: ITurretItem) {
    return (
        <Card key={props.turret.key} sx={{height: "100%"}} variant="outlined">
            <TurretHeader turret={props.turret} onRemove={props.onRemoveTurret}/>

            <Divider/>

            <CardContent>
                <Stack spacing={2}>
                    <TurretOptions
                        turret={props.turret}
                        onQuantityChange={props.onTurretQuantityChange}
                        onPriceChange={props.onTurretPriceChange}/>

                    <Divider/>

                    <TurretComponents turret={props.turret} onComponentChange={props.onComponentChange}/>
                </Stack>
            </CardContent>
        </Card>
    )
}