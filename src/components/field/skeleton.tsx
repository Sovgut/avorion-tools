import {Divider, Input, Skeleton, Stack, Typography} from "@mui/joy";

type FieldSkeletonProps = {
    labelWidth?: number;
}

export function FieldSkeleton(props: FieldSkeletonProps) {
    const sx = {
        minWidth: "auto"
    }

    if (props.labelWidth) {
        sx.minWidth = `${props.labelWidth}rem`
    }

    const decorator = (
        <Stack direction="row" spacing={1}>
            <Typography level="body-md" sx={sx}><Skeleton animation={false}>Lorem ipsum is
                placeholder</Skeleton></Typography>
            <Divider orientation="vertical"/>
        </Stack>
    );

    return (
        <Input
            sx={{width: "100%"}}
            startDecorator={decorator}
            type="text"
            disabled={true}
        />
    )
}