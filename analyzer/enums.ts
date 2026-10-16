// Compares the enum table the natives install with the game's API documentation.
import enumData from '../src/engine/avorion/enums.json';
import type { GameFiles } from './game';

const DOC = 'Documentation/Enums.html';

export function documentedEnums(html: string): Map<string, string[]> {
  const out = new Map<string, string[]>();
  const re = /<span class="type">enum (\w+) <\/span>(.*?)<\/div>/gs;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    const members = m[2]
      .split('<br/>')
      .map((x) => x.replace(/<[^>]+>/g, '').trim())
      .filter((x) => /^\w+$/.test(x));
    out.set(m[1], members);
  }
  return out;
}

/** Warnings for documented enum members the natives do not know. Values themselves are not documented. */
export function checkEnums(game: GameFiles): string[] {
  if (!game.exists(DOC)) return [`${DOC} is missing; enum values were not checked`];
  const known = enumData.enums as Record<string, Record<string, number>>;
  const warnings: string[] = [];
  for (const [name, members] of documentedEnums(game.readText(DOC))) {
    const have = known[name];
    if (!have) continue; // client-only enums have no values on the server and are not used by generation
    const missing = members.filter((m) => !(m in have));
    if (missing.length > 0)
      warnings.push(`enum ${name} gained ${missing.join(', ')}; refresh src/engine/avorion/enums.json from a server (tools/ground-truth)`);
  }
  return warnings;
}
