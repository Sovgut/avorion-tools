import {Stack} from "@mui/joy";
import {FieldSkeleton} from "../field/skeleton";

export function TurretOptionsSkeleton() {
    return (
        <Stack spacing={2} direction="row" justifyContent="space-between">
            <FieldSkeleton/>
            <FieldSkeleton/>
        </Stack>
    )
}