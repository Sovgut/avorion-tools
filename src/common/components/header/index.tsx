import {Container, Link, Option, Select, Stack, Typography,} from "@mui/joy";
import {SyntheticEvent, useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {Link as RouterLink} from 'react-router-dom'
import {isNull} from "@/common/utils/helpers";

type HeaderProps = {
    fontColor?: "black" | "white";
    disableGutters?: boolean;
}

export function Header(props: HeaderProps) {
    const intlContext = useContext(IntlContext);

    function onLanguageChange(event: SyntheticEvent | null, newValue: string | null) {
        if (!isNull(newValue)) {
            intlContext.selectLanguage(newValue)
        }
    }

    return (
        <Container maxWidth={false} disableGutters={props.disableGutters}>
            <Stack direction="row" spacing={2} sx={{pt: 3, pb: 3}} justifyContent="space-between">
                <Stack direction="row" spacing={4}>
                    <Stack justifyItems="center" spacing={-1}
                           sx={{opacity: .5, userSelect: "none", pointerEvents: "none"}}>
                        <Typography fontWeight="bolder" fontSize={18} textColor={props.fontColor}>Avorion</Typography>
                        <Typography letterSpacing={4.8} fontSize={16} textTransform="uppercase"
                                    textColor={props.fontColor}>Tools</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Link
                            component={RouterLink}
                            color="neutral"
                            level="title-sm"
                            fontWeight="bold"
                            underline="hover"
                            to="/turret-planner"
                            sx={{textTransform: "uppercase"}}
                            textColor={props.fontColor}
                        >
                            {intlContext.text("UI", "turret-planner")}
                        </Link>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Select placeholder={intlContext.text("UI", "language")}
                            defaultValue={intlContext.language}
                            onChange={onLanguageChange}
                            sx={{height: "2rem"}}
                    >
                        <Option value="en-US">{intlContext.text("UI", "english-language")}</Option>
                        <Option value="ru">{intlContext.text("UI", "russian-language")}</Option>
                    </Select>
                </Stack>
            </Stack>
        </Container>
    )
}