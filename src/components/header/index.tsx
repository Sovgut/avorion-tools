import {
  Container,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import { useContext } from "react";
import { IntlContext } from "~contexts/intl";
import {
  AccountBalance,
  AccountTree,
  GitHub,
  Home,
  Translate,
} from "@mui/icons-material";
import { GlobalSearch } from "~components/search";
import { Link as RouterLink } from "react-router-dom";
import { useGlobalSearch } from "~components/search/hook/use-global-search";
import { LanguageType } from "~contexts/intl/storage/types";

export function Header() {
  const globalSearch = useGlobalSearch();
  const intlContext = useContext(IntlContext);

  function handleLanguageChange(value: string) {
    return function $dropdownMenuItemClick() {
      intlContext.setLanguage(value as LanguageType);
    };
  }

  return (
    <Container maxWidth={false} sx={{ height: "68px" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: 3, pb: 1 }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={4}>
          <Stack direction="row" spacing={2} alignItems="center">
            <GlobalSearch />
            <Link
              to="/turret-planner"
              color="neutral"
              component={RouterLink}
              onClick={() => globalSearch.setOpen(false)}
            >
              <IconButton>
                <Home />
              </IconButton>
            </Link>
            <Link
              to="/factories?station=0"
              color="neutral"
              component={RouterLink}
              onClick={() => globalSearch.setOpen(false)}
            >
              <IconButton>
                <AccountTree />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Link href="https://github.com/Sovgut/avorion-tools" target="_blank">
            <IconButton sx={{ width: 32, height: 32 }} variant="soft">
              <GitHub />
            </IconButton>
          </Link>
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              variant="soft"
              slotProps={{
                root: {
                  variant: "soft",
                  color: "neutral",
                  sx: { width: 32, height: 32 },
                },
              }}
            >
              <Translate />
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{ minWidth: "200px", zIndex: 9999999 }}
              variant="soft"
            >
              <MenuItem
                selected={intlContext.language === "en-US"}
                onClick={handleLanguageChange("en-US")}
              >
                {intlContext.text("UI", "english-language")}
              </MenuItem>
              <MenuItem
                selected={intlContext.language === "ru"}
                onClick={handleLanguageChange("ru")}
              >
                {intlContext.text("UI", "russian-language")}
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Stack>
    </Container>
  );
}
