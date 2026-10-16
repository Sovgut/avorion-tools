// Predicts sectors the way the game does, by running its compiled SectorSpecifics,
// sector templates and FactoryPredictor.

import type { GalaxySettings } from '../avorion/natives';
import type { ModuleFactory } from '../lua/rt';
import { call, first, index, LuaMulti, LuaTable, type LuaValue, method } from '../lua/runtime';
import { tostring } from '../lua/stdlib';
import { GameVM } from './vm';

export enum SectorKind {
  Empty = 0,
  Regular = 1,
  Offgrid = 2,
  Blocked = 3,
}

/** Station counts the templates report, keyed by the contents field name (shipyards, factories, ...). */
export type StationCounts = Record<string, number>;

export interface SectorInfo {
  x: number;
  y: number;
  kind: SectorKind;
  /** Template script, e.g. "sectors/factoryfield"; empty for empty and blocked sectors. */
  template: string;
  /** Map faction index (2000000+), or undefined in no man's space. */
  faction: number | undefined;
  central: boolean;
  /** The faction's home sector ("... Prime"). */
  home: boolean;
  dust: number;
  name: string;
  gates: boolean;
  ancientGates: boolean;
  generationSeed: string;
  /** For regular sectors with stations. */
  stations?: StationCounts;
  /** Production indices (1-based, as in the game) of the factories, then the mines. */
  factories?: number[];
  mines?: number[];
  /** Rich resource asteroids and asteroids a player can claim, as contents() reports them. */
  resourceAsteroids?: number;
  claimableAsteroids?: number;
  /** For a world boss sector, which boss it holds: 1-based, in sectors/worldboss.lua's list order. */
  boss?: number;
}

/** Template fields that are not station counts. */
const NON_STATION_FIELDS = new Set([
  'xsotan',
  'ships',
  'stations',
  'defenders',
  'asteroidEstimation',
  'seed',
  'faction',
  'neighbor',
  'resourceAsteroids',
  'claimableAsteroids',
  'pirates',
  'miners',
]);

export interface GeneratorOptions {
  settings: GalaxySettings;
  modules: Record<string, ModuleFactory>;
  stubs: string[];
  /** How many bosses sectors/worldboss.lua picks from; without it, boss sectors report no boss. */
  worldBosses?: number;
}

const WORLD_BOSS_TEMPLATE = 'sectors/worldboss';

export class GalaxyGenerator {
  readonly vm: GameVM;
  private readonly specs: LuaTable;
  private readonly seed: LuaValue;
  private readonly factoryPredictor: LuaTable;
  private readonly productionIndex = new Map<LuaValue, number>();
  private readonly memo = new Map<number, LuaValue>();
  private passableCaches: Map<number, LuaValue>[] = [];

  private readonly worldBosses: number;

  constructor(opts: GeneratorOptions) {
    this.worldBosses = opts.worldBosses ?? 0;
    this.vm = new GameVM({ settings: opts.settings, modules: opts.modules, stubs: opts.stubs });
    const SectorSpecifics = this.vm.include('sectorspecifics');
    this.factoryPredictor = this.vm.include('factorypredictor') as LuaTable;
    this.specs = first(call(SectorSpecifics)) as LuaTable;
    this.seed = first(call(this.vm.state.G.get('GameSeed')));
    method(this.specs, 'addTemplates');
    const productions = this.vm.state.G.get('productions');
    if (productions instanceof LuaTable) {
      for (let i = 1; ; i++) {
        const p = productions.getInt(i);
        if (p === undefined) break;
        this.productionIndex.set(p, (p as LuaTable).get('index') as number);
      }
    }
    this.memoizeDetermineContent();
    this.memoizePassageMap();
  }

  /**
   * PassageMap(seed) is rebuilt by rift invasion bases for every regular sector they are weighed
   * for, followed by 49 passable() checks. Both are pure, so one map per seed and cached answers
   * give the same results.
   */
  private memoizePassageMap(): void {
    const module = this.vm.include('passagemap');
    if (!(module instanceof LuaTable)) return;
    const mt = module.metatable;
    const create = mt?.getStr('__call');
    if (typeof create !== 'function') return;
    const instances = new Map<string, LuaValue>();
    const passableCache = new WeakMap<object, Map<number, LuaValue>>();
    mt!.set('__call', (self: LuaValue, seed: LuaValue, ...rest: LuaValue[]) => {
      if (rest.length > 0) return call(create, self, seed, ...rest);
      const key = tostring(seed);
      let map = instances.get(key);
      if (map === undefined) {
        map = first(call(create, self, seed));
        instances.set(key, map);
        const cls = map instanceof LuaTable ? map.metatable?.getStr('__index') : undefined;
        if (cls instanceof LuaTable && !cls.getStr('__memoized')) {
          const passable = cls.getStr('passable');
          cls.set('__memoized', true);
          cls.set('passable', (inst: LuaValue, x: LuaValue, y: LuaValue) => {
            if (typeof x !== 'number' || typeof y !== 'number' || !(inst instanceof LuaTable)) return call(passable, inst, x, y);
            let cache = passableCache.get(inst);
            if (!cache) {
              passableCache.set(inst, (cache = new Map()));
              this.passableCaches.push(cache);
            }
            const k = (x + 1024) * 4096 + (y + 1024);
            let r = cache.get(k);
            if (r === undefined) {
              r = first(call(passable, inst, x, y));
              cache.set(k, r);
            }
            return r;
          });
        }
      }
      return map;
    });
  }

  /**
   * determineContent(x, y, seed) depends on the coordinates only (for this galaxy), and naming a
   * regular sector calls it for its whole 8×8 grid cell. Caching it keeps results identical.
   */
  private memoizeDetermineContent(): void {
    const cls = this.specs.metatable?.getStr('__index');
    if (!(cls instanceof LuaTable)) return;
    const original = cls.getStr('determineContent');
    const memo = this.memo;
    cls.set('determineContent', (self: LuaValue, x: LuaValue, y: LuaValue, seed: LuaValue) => {
      if (typeof x === 'number' && typeof y === 'number' && seed === this.seed) {
        const key = (x + 1024) * 4096 + (y + 1024);
        let r = memo.get(key);
        if (r === undefined) {
          r = call(original, self, x, y, seed);
          memo.set(key, r);
        }
        return r;
      }
      return call(original, self, x, y, seed);
    });
  }

  /** Drops cached results; they are only reused within a few rows, and a whole galaxy would not fit. */
  clearCaches(): void {
    this.memo.clear();
    for (const c of this.passableCaches) c.clear();
  }

  /** Map factions (index and home sector), from the game's FactionsMap. */
  factions(): { index: number; x: number; y: number }[] {
    const FactionsMap = this.vm.include('factionsmap');
    const fm = first(call(FactionsMap, this.seed));
    const indices = first(method(fm, 'getFactionIndices'));
    const out: { index: number; x: number; y: number }[] = [];
    if (!(indices instanceof LuaTable)) return out;
    for (let i = 1; ; i++) {
      const idx = indices.getInt(i);
      if (idx === undefined) break;
      const home = first(method(fm, 'getHomeSector', idx));
      out.push({ index: idx as number, x: index(home, 'x') as number, y: index(home, 'y') as number });
    }
    return out.sort((a, b) => a.index - b.index);
  }

  sector(x: number, y: number, withStations = true): SectorInfo {
    const specs = this.specs;
    method(specs, 'initialize', x, y, this.seed);
    const regular = specs.get('regular') === true;
    const offgrid = specs.get('offgrid') === true;
    const blocked = specs.get('blocked') === true;
    const kind = regular ? SectorKind.Regular : offgrid ? SectorKind.Offgrid : blocked ? SectorKind.Blocked : SectorKind.Empty;
    const faction = specs.get('factionIndex');
    const info: SectorInfo = {
      x,
      y,
      kind,
      template: kind === SectorKind.Regular || kind === SectorKind.Offgrid ? String(first(method(specs, 'getScript'))) : '',
      faction: typeof faction === 'number' ? faction : undefined,
      central: specs.get('centralArea') === true,
      home: false,
      dust: (specs.get('dustyness') as number) ?? 0,
      name: String(specs.get('name')),
      gates: specs.get('gates') === true,
      ancientGates: specs.get('ancientGates') === true,
      generationSeed: kind === SectorKind.Regular || kind === SectorKind.Offgrid ? tostring(specs.get('generationSeed')) : '',
    };
    info.home = kind === SectorKind.Regular && info.name.endsWith(' Prime');
    // the game's map lists what any template's contents() reports, hidden sectors included
    if (withStations && (kind === SectorKind.Regular || kind === SectorKind.Offgrid)) {
      try {
        this.addStations(info);
      } catch {
        // a template whose contents() needs server state the client cannot provide
      }
    }
    return info;
  }

  private addStations(info: SectorInfo): void {
    const template = index(this.specs.get('generationTemplate'), 'contents');
    if (typeof template !== 'function') return;
    const result = call(template, info.x, info.y);
    const contents = first(result);
    if (!(contents instanceof LuaTable)) return;
    const resource = contents.get('resourceAsteroids');
    const claimable = contents.get('claimableAsteroids');
    if (typeof resource === 'number' && resource > 0) info.resourceAsteroids = resource;
    if (typeof claimable === 'number' && claimable > 0) info.claimableAsteroids = claimable;
    // generate() draws the boss from the Random that contents() returns, before anything else
    if (info.template === WORLD_BOSS_TEMPLATE && this.worldBosses > 0 && result instanceof LuaMulti) {
      const n = first(method(result.v[1], 'getInt', 1, this.worldBosses));
      if (typeof n === 'number') info.boss = n;
    }
    const stations: StationCounts = {};
    let k: LuaValue;
    for (;;) {
      const r = contents.next(k);
      if (!r) break;
      k = r[0];
      if (typeof r[0] === 'string' && typeof r[1] === 'number' && !NON_STATION_FIELDS.has(r[0]) && !r[0].endsWith('Estimation') && r[1] > 0)
        stations[r[0]] = r[1];
    }
    // The server adds a headquarters to a faction's home colony; the client cannot see it in contents().
    if (info.home && info.template === 'sectors/colony') stations.headquarters = 1;
    if (Object.keys(stations).length === 0) return;
    info.stations = stations;
    const fp = this.factoryPredictor;
    if (stations.factories)
      info.factories = this.productionList(call(fp.get('generateFactoryProductions'), info.x, info.y, stations.factories));
    if (stations.mines) info.mines = this.productionList(call(fp.get('generateMineProductions'), info.x, info.y, stations.mines));
  }

  private productionList(r: LuaValue): number[] {
    const list = r instanceof LuaMulti ? r.v[0] : r;
    const out: number[] = [];
    if (!(list instanceof LuaTable)) return out;
    for (let i = 1; ; i++) {
      const p = list.getInt(i);
      if (p === undefined) break;
      out.push(this.productionIndex.get(p) ?? 0);
    }
    return out;
  }
}
