// A Lua state that runs the game's compiled generation scripts with the native API installed.
import { LuaTable, type LuaValue } from '../lua/runtime';
import { LuaState, type ModuleFactory } from '../lua/rt';
import { installNatives, installStubs, type GalaxySettings } from '../avorion/natives';

/** Libraries the engine runs in each script context up front (they define globals like StationSubType). */
export const PRELOADED = ['data/scripts/lib/plangeneratorbase.lua'];

const INCLUDE_PATTERNS = ['data/scripts/lib/?.lua', 'data/scripts/?.lua', 'data/scripts/sectors/?.lua', '?.lua', '?'];

export interface GameVMOptions {
  settings: GalaxySettings;
  modules: Record<string, ModuleFactory>;
  /** Native names the scripts reference that get a NativeStub unless implemented. */
  stubs?: string[];
  onServer?: boolean;
  print?: (s: string) => void;
  /** Called for include() names that are not compiled in; the include yields an empty table. */
  onMissingInclude?: (name: string) => void;
}

export class GameVM {
  readonly state: LuaState;

  constructor(readonly opts: GameVMOptions) {
    this.state = new LuaState({ modules: opts.modules, print: opts.print });
    const missing = new Map<string, LuaTable>();
    installNatives(this.state.G, {
      settings: opts.settings,
      onServer: opts.onServer,
      print: opts.print,
      resolveInclude: (name) => {
        for (const p of INCLUDE_PATTERNS) {
          const rel = p.replace('?', name);
          if (rel in opts.modules) return rel;
        }
        return '\0missing:' + name;
      },
      require: (path) => {
        if (path.startsWith('\0missing:')) {
          const name = path.slice(9);
          let t = missing.get(name);
          if (!t) {
            t = new LuaTable();
            missing.set(name, t);
            opts.onMissingInclude?.(name);
          }
          return t;
        }
        return this.state.require(path);
      },
    });
    installStubs(this.state.G, opts.stubs ?? []);
    // the engine loads these into every script context before any script runs
    for (const path of PRELOADED) if (path in opts.modules) this.state.require(path);
  }

  include(name: string): LuaValue {
    const f = this.state.G.get('include') as (n: string) => LuaValue;
    return f(name);
  }
}
