import {Card, CardContent, Divider, Stack} from "@mui/joy";
import {TurretHeaderSkeleton} from "../turret-header/skeleton";
import {TurretOptionsSkeleton} from "../turret-options/skeleton";
import {TurretComponentsSkeleton} from "../turret-components/skeleton";

type TurretItemSkeletonProps = {
    id: string;
}

export function TurretItemSkeleton(props: TurretItemSkeletonProps) {
    return (
        <Card key={props.id} sx={{height: "100%", opacity: .75}} variant="outlined">
            <TurretHeaderSkeleton/>

            <Divider/>

            <CardContent>
                <Stack spacing={2}>
                    <TurretOptionsSkeleton/>

                    <Divider/>

                    <TurretComponentsSkeleton/>
                </Stack>
            </CardContent>
        </Card>
    )
}
