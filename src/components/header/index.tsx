import {Container, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Stack} from "@mui/joy";
import {useContext} from "react";
import {IntlContext} from "~contexts/intl";
import {GitHub, Translate} from "@mui/icons-material";
import { GlobalSearch } from "~components/search";

export function Header() {
    const intlContext = useContext(IntlContext);

    function handleLanguageChange(value: string) {
        return function $dropdownMenuItemClick() {
            intlContext.selectLanguage(value);
        }
    }

    return (
        <Container maxWidth={false} sx={{height: 90}}>
            <Stack direction="row" spacing={2} sx={{pt: 3, pb: 3}} justifyContent="space-between">
                <Stack direction="row" spacing={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <GlobalSearch />
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Link href="https://github.com/Sovgut/avorion-tools" target="_blank">
                        <IconButton sx={{width: 32, height: 32}}>
                            <GitHub/>
                        </IconButton>
                    </Link>
                    <Dropdown>
                        <MenuButton
                            slots={{root: IconButton}}
                            slotProps={{root: {variant: 'plain', color: 'neutral', sx: {width: 32, height: 32}}}}
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