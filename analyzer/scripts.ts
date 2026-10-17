// Follows a game script's includes and lists the natives the collected scripts expect.
import luaparse from 'luaparse';
import type { GameFiles } from './game';

const INCLUDE_RE = /\b(?:include|require)\s*\(?\s*["']([^"']+)["']/g;
const TEMPLATE_RE = /\baddTemplate\s*\(\s*["']([^"']+)["']/g;

export interface ScriptClosure {
  files: string[];
  /** include() names that point at files the game ships only in encrypted form. */
  unresolved: { name: string; from: string }[];
}

export function collectClosure(game: GameFiles, entries: string[]): ScriptClosure {
  const seen = new Set<string>();
  const unresolved: { name: string; from: string }[] = [];
  const visit = (rel: string) => {
    if (seen.has(rel)) return;
    seen.add(rel);
    const src = game.readBytes(rel);
    for (const re of [INCLUDE_RE, TEMPLATE_RE]) {
      re.lastIndex = 0;
      for (let m = re.exec(src); m; m = re.exec(src)) {
        const target = game.resolveInclude(m[1]);
        if (target) visit(target);
        else unresolved.push({ name: m[1], from: rel });
      }
    }
  };
  for (const e of entries) visit(e);
  return { files: [...seen].sort(), unresolved };
}

/** Global names the scripts read but never assign: the natives they expect the engine to provide. */
export function findNativeReferences(game: GameFiles, files: string[]): string[] {
  const reads = new Set<string>();
  const writes = new Set<string>();
  for (const f of files) {
    const ast = luaparse.parse(game.readBytes(f), { luaVersion: '5.2', scope: true, encodingMode: 'pseudo-latin1' } as any);
    const visit = (n: any, key?: string, parent?: any) => {
      if (!n || typeof n !== 'object') return;
      if (Array.isArray(n)) {
        for (const x of n) visit(x, key, parent);
        return;
      }
      if (
        n.type === 'Identifier' &&
        !n.isLocal &&
        !(parent?.type === 'MemberExpression' && key === 'identifier') &&
        !(parent?.type === 'TableKeyString' && key === 'key') &&
        parent?.type !== 'LabelStatement' &&
        parent?.type !== 'GotoStatement'
      ) {
        const isWrite =
          (parent?.type === 'AssignmentStatement' && key === 'variables') ||
          (parent?.type === 'FunctionDeclaration' && key === 'identifier');
        (isWrite ? writes : reads).add(n.name);
      }
      for (const k of Object.keys(n)) if (k !== 'loc' && k !== 'globals') visit(n[k], k, n);
    };
    visit(ast);
  }
  return [...reads].filter((n) => !writes.has(n)).sort();
}
