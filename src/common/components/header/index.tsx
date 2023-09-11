import {Container, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Stack, Typography} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "@/contexts/intl";
import {GitHub, Translate} from "@mui/icons-material";

type HeaderProps = {
    fontColor?: "black" | "white";
    disableGutters?: boolean;
}

export function Header(props: HeaderProps) {
    const intlContext = useContext(IntlContext);

    function handleLanguageChange(value: string) {
        return function $dropdownMenuItemClick() {
            intlContext.selectLanguage(value);
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
                        {/*  navigation links...  */}
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Link href="https://github.com/Sovgut/avorion-tools" target="_blank">
                        <IconButton>
                            <GitHub/>
                        </IconButton>
                    </Link>
                    <Dropdown>
                        <MenuButton
                            slots={{root: IconButton}}
                            slotProps={{root: {variant: 'plain', color: 'neutral'}}}
                        >
                            <Translate/>
                        </MenuButton>
                        <Menu placement="bottom-end" sx={{minWidth: "200px"}}>
                            <MenuItem selected={intlContext.language === 'en-US'}
                                      onClick={handleLanguageChange("en-US")}>
                                {intlContext.text("UI", "english-language")}
                            </MenuItem>
                            <MenuItem selected={intlContext.language === 'ru'}
                                      onClick={handleLanguageChange("ru")}>
                                {intlContext.text("UI", "russian-language")}
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Stack>
            </Stack>
        </Container>
    )
}