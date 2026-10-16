import { describe, expect, it } from 'vitest';

const locales = import.meta.glob<Record<string, string>>('./locales/*.ts', { import: 'default', eager: true });
const entries: [string, Record<string, string>][] = Object.entries(locales).map(([path, dict]) => [/(\w[\w-]*)\.ts$/.exec(path)![1], dict]);
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('UI locales', () => {
  const [, reference] = entries.find(([tag]) => tag === 'ru')!;

  it.each(entries)('%s has the same keys as every other language', (_tag, dict) => {
    expect(Object.keys(dict).sort()).toEqual(Object.keys(reference).sort());
  });

  it.each(entries)('%s keeps every {placeholder} of its English key', (_tag, dict) => {
    for (const [en, text] of Object.entries(dict)) expect(placeholders(text), en).toEqual(placeholders(en));
  });
});
