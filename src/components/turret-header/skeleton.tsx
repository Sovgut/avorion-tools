import {Box, Skeleton, Stack, Typography} from "@mui/joy";

export function TurretHeaderSkeleton() {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography level="title-md">
                        <Skeleton animation={false}>
                            Lorem ipsum is placeholder text
                        </Skeleton>
                    </Typography>
                </Stack>
                <Skeleton animation={false} variant="inline" width={40} height={40}></Skeleton>
            </Stack>
        </Box>
    )
}