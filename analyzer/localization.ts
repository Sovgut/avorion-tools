// Reads the game's gettext catalogs (data/localization/*.po).
import type { Translations } from '../src/game/schema';
import { stripComment } from './extract';

interface PoEntry {
  ctxt?: string;
  id: string;
  plural?: string;
  str: string[];
}

function unquote(s: string): string {
  return JSON.parse(s.replace(/\t/g, '\\t'));
}

export function parsePo(text: string): PoEntry[] {
  const out: PoEntry[] = [];
  let cur: Partial<PoEntry> & { str: string[] } = { str: [] };
  let field: { key: 'ctxt' | 'id' | 'plural' | 'str'; index: number } | null = null;
  const flush = () => {
    if (cur.id !== undefined) out.push(cur as PoEntry);
    cur = { str: [] };
    field = null;
  };
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) {
      if (line === '' && cur.id !== undefined && cur.str.length > 0) flush();
      continue;
    }
    let m: RegExpExecArray | null;
    if ((m = /^msgctxt\s+(".*")$/.exec(line))) {
      if (cur.id !== undefined) flush();
      cur.ctxt = unquote(m[1]);
      field = { key: 'ctxt', index: 0 };
    } else if ((m = /^msgid\s+(".*")$/.exec(line))) {
      if (cur.id !== undefined && cur.str.length > 0) flush();
      cur.id = unquote(m[1]);
      field = { key: 'id', index: 0 };
    } else if ((m = /^msgid_plural\s+(".*")$/.exec(line))) {
      cur.plural = unquote(m[1]);
      field = { key: 'plural', index: 0 };
    } else if ((m = /^msgstr(?:\[(\d+)\])?\s+(".*")$/.exec(line))) {
      const i = m[1] ? Number(m[1]) : 0;
      cur.str[i] = unquote(m[2]);
      field = { key: 'str', index: i };
    } else if (line.startsWith('"') && field) {
      const v = unquote(line);
      if (field.key === 'str') cur.str[field.index] += v;
      else if (field.key === 'ctxt') cur.ctxt += v;
      else if (field.key === 'id') cur.id += v;
      else cur.plural += v;
    }
  }
  flush();
  return out;
}

/**
 * Translations for the given English strings, keyed by the text without translator comments.
 * A translator comment in the source string (Launcher with the comment "Weapon Type") is the
 * entry's msgctxt in the catalog. Goods also get their plural ("text\u0001plural") and "prefix" context forms.
 */
export function selectTranslations(entries: PoEntry[], wanted: Set<string>): { translations: Translations; missing: string[] } {
  const translations: Translations = {};
  const byKey = new Map<string, PoEntry>();
  for (const e of entries) {
    if (!e.id) continue;
    const key = (e.ctxt ? `${e.ctxt}\u0004` : '') + e.id;
    if (!byKey.has(key) || (!byKey.get(key)!.str[0] && e.str[0])) byKey.set(key, e);
  }
  const missing: string[] = [];
  for (const s of [...wanted].sort()) {
    const comment = /\/\*\s*(.*?)\s*\*\//.exec(s);
    const text = stripComment(s);
    const e = (comment ? byKey.get(`${comment[1]}\u0004${text}`) : undefined) ?? byKey.get(text);
    if (e?.str[0]) {
      translations[text] = e.str[0];
      if (e.plural !== undefined && e.str[1]) translations[`${text}\u0001plural`] = e.str[1];
    } else missing.push(text);
    const prefix = byKey.get(`prefix\u0004${text}`);
    if (prefix?.str[0]) translations[`prefix\u0004${text}`] = prefix.str[0];
  }
  return { translations, missing };
}
