import {Skeleton, Stack, Typography} from "@mui/joy";
import {FieldSkeleton} from "../field/skeleton";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";

export function TurretComponentsSkeleton() {
    const [skeletonComponents, setSkeletonComponents] = useState<string[]>([]);

    useEffect(() => {
        const components: string[] = [];

        for (let i = 0; i < 7; i++) {
            components.push(nanoid());
        }

        setSkeletonComponents(components);
    }, []);

    return (
        <Stack spacing={2}>
            <Typography><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
            <Stack spacing={2}>
                {skeletonComponents.map((component) => <FieldSkeleton key={component} labelWidth={14}/>)}
            </Stack>
        </Stack>
    )
}