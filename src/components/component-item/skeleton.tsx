import {Skeleton, Stack, Typography} from "@mui/joy";

type ComponentItemSkeletonProps = {
    id: string;
}

export function ComponentItemSkeleton(props: ComponentItemSkeletonProps) {
    return (
        <tr key={props.id}>
            <td>
                <Stack>
                    <Skeleton width={32} height={32} animation={false} variant="inline"></Skeleton>
                </Stack>
            </td>
            <td>
                <Stack direction="row" spacing={1}>
                    <Typography level="h3"><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                </Stack>
                <Stack spacing={1} direction="row">
                    <Typography><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                    <Typography><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                </Stack>
            </td>
            <td style={{textAlign: "right"}}>
                <Typography
                    color="primary"
                    fontWeight="bold"
                >
                    <Skeleton animation={false}>Lorem</Skeleton>
                </Typography>
            </td>
            <td>
                <Stack>
                    <Skeleton animation={false} variant="inline" width={40} height={40}></Skeleton>
                </Stack>
            </td>
        </tr>
    )
}