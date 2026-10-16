// The languages the app offers: English, plus every language the game ships (src/generated/languages.json).
import gameLanguages from '@/generated/languages.json';

/** English, or a game language tag: de, es, fr, jp, pt-br, ru, zh. */
export type Lang = string;

/** Each language's name in itself; a language the game adds later shows its English name until listed here. */
const NATIVE: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  jp: '日本語',
  'pt-br': 'Português (Brasil)',
  ru: 'Русский',
  zh: '简体中文',
};

export const LANGUAGES: { tag: Lang; native: string }[] = [
  { tag: 'en', native: NATIVE.en },
  ...gameLanguages.map((l) => ({ tag: l.tag, native: NATIVE[l.tag] ?? l.name })),
];

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && LANGUAGES.some((l) => l.tag === v);

/** The game's tags are not all BCP 47; the document's lang attribute needs the standard ones. */
const BCP47: Record<string, string> = { jp: 'ja', 'pt-br': 'pt-BR', zh: 'zh-Hans' };
export const htmlLang = (tag: Lang) => BCP47[tag] ?? tag;

/** The first of the browser's languages the app has, matched by its primary subtag; English otherwise. */
export function detectLang(preferred: readonly string[]): Lang {
  for (const p of preferred) {
    const lower = p.toLowerCase();
    const exact = LANGUAGES.find((l) => htmlLang(l.tag).toLowerCase() === lower || l.tag === lower);
    if (exact) return exact.tag;
    const primary = lower.split('-')[0];
    const loose = LANGUAGES.find((l) => htmlLang(l.tag).toLowerCase().split('-')[0] === primary);
    if (loose) return loose.tag;
  }
  return 'en';
}
