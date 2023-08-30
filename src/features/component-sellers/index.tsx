import {ComponentsMeta} from "@/constants/meta/components";
import {Box, Link, Stack} from "@mui/joy";
import {DescriptionOutlined as LinkIcon} from "@mui/icons-material";
import {ComponentType} from "@/constants/enums/components";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {SellersMeta} from "@/constants/meta/sellers";

type ComponentSellersProps = {
    type: ComponentType;
}

export function ComponentSellers(props: ComponentSellersProps) {
    const intlContext = useContext(IntlContext);

    return (
        <Stack spacing={1} direction="row">
            {ComponentsMeta[props.type].sellers.map(seller => (
                <Stack key={props.type + seller} direction="row" alignItems="center">
                    <Box component="span">{intlContext.text("SELLER", seller)}</Box>
                    <Link key={props.type + seller} href={SellersMeta[seller].link} target="_blank">
                        <LinkIcon fontSize="small"/>
                    </Link>
                </Stack>
            ))}
        </Stack>
    )
}