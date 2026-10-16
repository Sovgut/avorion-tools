// UI strings and game names in the selected language.
import { createElement, Fragment, type ReactNode, useCallback, useMemo } from 'react';
import { db, goodById, type StationType, turretById } from '@/game/database';
import type { Production } from '@/game/schema';
import { useAppSelector } from '@/store';
import { catalog, useCatalog } from './catalogs';
import type { Lang } from './languages';

export { loadLanguage } from './catalogs';
export { detectLang, htmlLang, isLang, LANGUAGES, type Lang } from './languages';

export function useLang(): Lang {
  return useAppSelector((s) => s.settings.lang);
}

/** Values for a string's {name} placeholders; word order differs between languages, so phrases are never glued. */
export type Vars = Record<string, string | number>;
export type T = (en: string, vars?: Vars) => string;

/** Translates an English UI string and fills its {name} placeholders; English shows until the catalog loads. */
export function useT(): T {
  const ui = useCatalog(useLang())?.ui;
  return useCallback(
    (en: string, vars?: Vars) => {
      const s = ui?.[en] ?? en;
      return vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : s;
    },
    [ui],
  );
}

/** Like useT, for placeholders filled with markup (a link, a highlighted value). */
export function useTx(): (en: string, parts: Record<string, ReactNode>) => ReactNode {
  const ui = useCatalog(useLang())?.ui;
  return useCallback(
    (en: string, parts: Record<string, ReactNode>) =>
      (ui?.[en] ?? en).split(/(\{\w+\})/).map((piece, i) => {
        const name = /^\{(\w+)\}$/.exec(piece)?.[1];
        return createElement(Fragment, { key: i }, name && name in parts ? parts[name] : piece);
      }),
    [ui],
  );
}

export interface GameText {
  lang: Lang;
  good(id: string): string;
  goodPlural(id: string): string;
  description(id: string): string;
  turret(id: string): string;
  /** A factory title, e.g. "Steel Factory S"; size 0 leaves the size out. */
  factory(pattern: string, good: string, size?: number): string;
  station(s: StationType): string;
  production(p: Production): string;
  /** Any English game string (station titles such as "Shipyard"). */
  text(en: string): string;
}

export function gameText(lang: Lang, tr: Record<string, string> | undefined = catalog(lang)?.game): GameText {
  const text = (en: string) => tr?.[en] || en;
  const good = (id: string) => text(goodById.get(id)?.name ?? id);
  const factory = (pattern: string, g: string, size = 0) => {
    const sizeLabel = size > 0 ? text(db.sizes[size - 1]) : '';
    const plural = goodById.get(g)?.plural ?? g;
    return text(pattern)
      .replace('${good}', good(g))
      .replace('${prefix}', tr?.[`prefix\u0004${g}`] || good(g))
      .replace('${plural}', tr?.[`${g}\u0001plural`] || plural)
      .replace('${size}', sizeLabel)
      .replace(/\s+/g, ' ')
      .trim();
  };
  return {
    lang,
    good,
    goodPlural: (id) => tr?.[`${id}\u0001plural`] || goodById.get(id)?.plural || id,
    description: (id) => text(goodById.get(id)?.description ?? ''),
    turret: (id) => text(turretById.get(id)?.name ?? id),
    factory,
    station: (s) => factory(s.pattern, s.titleGood),
    production: (p) => factory(p.factory, p.results[0]?.good ?? ''),
    text,
  };
}

export function useGameText(): GameText {
  const lang = useLang();
  const game = useCatalog(lang)?.game;
  return useMemo(() => gameText(lang, game), [lang, game]);
}

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Whole number with thousands separators. */
export function fmt(n: number): string {
  return nf.format(Math.round(n));
}

const nfShort = new Intl.NumberFormat('en-US', { notation: 'compact', maximumSignificantDigits: 3 });

/** Like `fmt` below a million, then compact (`9.99B`), so it fits a narrow column. */
export function fmtShort(n: number): string {
  return Math.abs(n) < 1_000_000 ? fmt(n) : nfShort.format(n);
}

/** Up to two decimals. */
export function fmt2(n: number): string {
  return nf2.format(n);
}
