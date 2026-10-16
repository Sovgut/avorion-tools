// Translation catalogs, loaded per language on demand so the bundle carries only the one in use.
import { useSyncExternalStore } from 'react';
import type { Lang } from './languages';

type Catalog = Record<string, string>;

/** Game text from the game's own .po files, written by the analyzer. */
const gameLoaders = import.meta.glob<Catalog>('../generated/i18n/*.json', { import: 'default' });
/** The app's own UI strings, keyed by the English text. */
const uiLoaders = import.meta.glob<Catalog>('./locales/*.ts', { import: 'default' });

const loaded = new Map<Lang, { game: Catalog; ui: Catalog }>();
const pending = new Map<Lang, Promise<void>>();
const listeners = new Set<() => void>();

/** Loads a language's catalogs once; English needs none. */
export function loadLanguage(lang: Lang): Promise<void> {
  if (lang === 'en' || loaded.has(lang)) return Promise.resolve();
  let p = pending.get(lang);
  if (!p) {
    p = Promise.all([gameLoaders[`../generated/i18n/${lang}.json`]?.() ?? {}, uiLoaders[`./locales/${lang}.ts`]?.() ?? {}])
      .then(([game, ui]) => {
        loaded.set(lang, { game, ui });
        for (const l of listeners) l();
      })
      .finally(() => pending.delete(lang));
    pending.set(lang, p);
  }
  return p;
}

/** The catalogs of a loaded language; undefined for English and for one still loading. */
export function catalog(lang: Lang): { game: Catalog; ui: Catalog } | undefined {
  return loaded.get(lang);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** A language's catalogs as a subscription, so a catalog that finishes loading re-renders its readers. */
export function useCatalog(lang: Lang): { game: Catalog; ui: Catalog } | undefined {
  return useSyncExternalStore(subscribe, () => loaded.get(lang));
}
