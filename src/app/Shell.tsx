import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { loadGalaxy } from '@/features/galaxy/client';
import { BlueprintDialog } from '@/features/planner/BlueprintDialog';
import { GlobalSearch } from '@/features/search/GlobalSearch';
import { htmlLang, LANGUAGES, loadLanguage, useLang, useT, useTx } from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/store';
import { settingsActions } from '@/store/settings';
import { uiActions } from '@/store/ui';
import { useIsMobile } from '@/ui/hooks';
import s from './Shell.module.css';

/** The short code shown on the language button: the standard tag's language part. */
const langCode = (tag: string) => htmlLang(tag).split('-')[0].toUpperCase();

/** Every language the app has, by its own name; the button shows the current one's code. */
function LanguageMenu({ mobile }: { mobile?: boolean }) {
  const t = useT();
  const lang = useLang();
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={mobile ? s.mIconBtn : s.langBtn} aria-label={t('Language')}>
        <span className="mono">{langCode(lang)}</span>
        {!mobile && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M1 2.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.langMenu} align="end" sideOffset={6} collisionPadding={8}>
          <DropdownMenu.RadioGroup value={lang} onValueChange={(v) => dispatch(settingsActions.setLang(v))}>
            {LANGUAGES.map((l) => (
              <DropdownMenu.RadioItem key={l.tag} value={l.tag} className={s.langItem} lang={htmlLang(l.tag)}>
                <span>{l.native}</span>
                <span className={s.langItemCode}>{langCode(l.tag)}</span>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const NAV = [
  { to: '/planner', label: 'Turret planner' },
  { to: '/galaxy', label: 'Galaxy' },
  { to: '/database', label: 'Database' },
];

export function Shell() {
  const t = useT();
  const lang = useLang();
  const dispatch = useAppDispatch();
  const mobile = useIsMobile();
  const location = useLocation();
  const galaxy = useAppSelector((st) => st.settings.galaxy);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        dispatch(uiActions.setSearchOpen(true));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    void loadLanguage(lang);
  }, [lang]);

  // the planner's buy hints need the galaxy too, so it loads on every page
  useEffect(() => {
    if (galaxy) void loadGalaxy(galaxy);
  }, [galaxy]);

  const openSearch = () => dispatch(uiActions.setSearchOpen(true));

  if (mobile) {
    return (
      <div className={s.mobile}>
        <header className={s.mHeader}>
          <Logo small />
          <button type="button" className={s.mIconBtn} aria-label={t('Search')} onClick={openSearch}>
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="7.5" cy="7.5" r="5.5" />
              <line x1="11.5" y1="11.5" x2="16" y2="16" />
            </svg>
          </button>
          <LanguageMenu mobile />
        </header>
        <main className={s.mContent} key={location.pathname.split('/')[1]}>
          <Outlet />
        </main>
        <nav className={s.mNav}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? s.mNavActive : s.mNavItem)}>
              {t(n.label)}
            </NavLink>
          ))}
        </nav>
        <GlobalSearch mobile />
        <BlueprintDialog />
      </div>
    );
  }

  return (
    <div className={s.desktop}>
      <header className={s.header}>
        <Logo />
        <nav className={s.nav}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? s.navActive : s.navItem)}>
              {t(n.label)}
            </NavLink>
          ))}
        </nav>
        <button type="button" className={s.searchTrigger} onClick={openSearch}>
          <span>{t('Stations & commodities…')}</span>
          <kbd className={s.kbd}>F2</kbd>
        </button>
        <div className={s.right}>
          <LanguageMenu />
          <a href="https://github.com/Sovgut/avorion-tools" target="_blank" rel="noreferrer" className={s.github}>
            GitHub ↗
          </a>
        </div>
      </header>
      <main className={s.main}>
        <Outlet />
      </main>
      <GlobalSearch />
      <BlueprintDialog />
    </div>
  );
}

function Logo({ small }: { small?: boolean }) {
  return (
    <NavLink to="/planner" className={small ? s.logoSmall : s.logo}>
      <span className={s.diamond} />
      <span className={s.wordmark}>AVORION TOOLS</span>
    </NavLink>
  );
}

export function Disclaimer() {
  const tx = useTx();
  return (
    <div className={s.disclaimer}>
      {tx('{brand} is a community work, and not officially created or maintained by {company}.', {
        brand: <span className={s.brand}>Avorion Tools</span>,
        company: (
          <a href="https://boxelware.de/" target="_blank" rel="noreferrer">
            Boxelware
          </a>
        ),
      })}
    </div>
  );
}
