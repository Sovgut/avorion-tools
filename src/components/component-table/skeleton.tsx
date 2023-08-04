import {Card, CardOverflow, Divider, Grid, Skeleton, Stack, Table, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {ComponentItemSkeleton} from "../component-item/skeleton";

export function ComponentTableSkeleton() {
    const [componentsSkeleton, setComponentsSkeleton] = useState<string[]>([]);

    useEffect(() => {
        const components: string[] = [];

        for (let i = 0; i < 15; i++) {
            components.push(nanoid());
        }

        setComponentsSkeleton(components);
    }, []);

    return (
        <Card variant="outlined" sx={{opacity: .75}}>
            <Typography level="h3"><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
            <Table aria-label="basic table">
                <thead>
                <tr>
                    <th style={{width: "3rem"}}/>
                    <th>
                        <Stack direction="row" spacing={.5} alignItems="center">
                            <Typography><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                        </Stack>
                    </th>
                    <th style={{width: "25%", textAlign: "right"}}>
                        <Typography>
                            <Skeleton animation={false}>Lorem ipsum</Skeleton>
                        </Typography>
                    </th>
                    <th style={{width: "4rem"}}></th>
                </tr>
                </thead>
                <tbody>
                {componentsSkeleton.map((component) => (
                    <ComponentItemSkeleton key={component} id={component}/>
                ))}
                </tbody>
            </Table>

            <CardOverflow variant="soft" color="neutral">
                <Divider inset="context"/>
                <Stack spacing={2} sx={{width: "100%", pt: 2, pb: 2}}>

                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={.5} alignItems="center" justifyContent="space-between">
                            <Typography level="body-lg"><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Stack direction="row">
                                <Typography
                                    level="body-lg"><Skeleton animation={false}>Lorem ipsum is
                                    placeholder</Skeleton></Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Divider/>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <Typography level="body-lg"><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                        <Typography
                            level="body-lg"><Skeleton animation={false}>Lorem ipsum</Skeleton></Typography>
                    </Grid>
                </Stack>
            </CardOverflow>
        </Card>
    )
}