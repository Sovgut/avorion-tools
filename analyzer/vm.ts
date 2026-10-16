// Runs game scripts inside Node with the same runtime the browser uses.

import { DEFAULT_SETTINGS, type GalaxySettings } from '../src/engine/avorion/natives';
import { GameVM } from '../src/engine/galaxy/vm';
import { Compiler, runtimeImportNames } from '../src/engine/lua/compiler';
import type { ModuleFactory } from '../src/engine/lua/rt';
import type { GameFiles } from './game';
import { collectClosure, findNativeReferences } from './scripts';

export interface ScriptVM {
  vm: GameVM;
  files: string[];
  stubs: string[];
  missingIncludes: Set<string>;
}

/** Compiles `entries` with their includes and returns a VM that can run them. */
export function createScriptVM(game: GameFiles, entries: string[], settings?: Partial<GalaxySettings>): ScriptVM {
  const closure = collectClosure(game, entries);
  const modules: Record<string, ModuleFactory> = {};
  for (const f of closure.files) {
    const js = new Compiler({ chunkName: f }).compileChunk(game.readBytes(f));
    modules[f] = new Function('R', `const { ${runtimeImportNames.join(', ')} } = R; return ${js};\n//# sourceURL=${f}`) as ModuleFactory;
  }
  const stubs = findNativeReferences(game, closure.files);
  const missingIncludes = new Set<string>();
  const vm = new GameVM({
    settings: { seed: 'analyzer', ...DEFAULT_SETTINGS, ...settings },
    modules,
    stubs,
    onMissingInclude: (n) => missingIncludes.add(n),
  });
  return { vm, files: closure.files, stubs, missingIncludes };
}
