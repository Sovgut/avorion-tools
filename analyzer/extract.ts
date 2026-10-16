// Builds the game database by running the game's data scripts and reading their tables.
import path from 'node:path';
import { call, first, LuaTable, type LuaValue, method } from '../src/engine/lua/runtime';
import type {
  Armament,
  ConsumerStation,
  GameDatabase,
  Good,
  GoodAmount,
  Production,
  SectorTemplate,
  TurretIngredient,
  TurretType,
} from '../src/game/schema';
import type { GameFiles } from './game';
import { createScriptVM } from './vm';

const DATA_ENTRIES = [
  'data/scripts/lib/goods.lua',
  'data/scripts/lib/productions.lua',
  'data/scripts/lib/weapontype.lua',
  'data/scripts/lib/turretingredients.lua',
  'data/scripts/lib/consumergoods.lua',
  'data/scripts/sectorspecifics.lua',
];

/** Station titles for the ConsumerGoods lists, keyed by function name. */
const CONSUMER_TITLES: Record<string, string> = {
  Habitat: 'Habitat',
  Biotope: 'Biotope',
  Casino: 'Casino',
  EquipmentDock: 'Equipment Dock',
  MilitaryOutpost: 'Military Outpost',
  ResearchStation: 'Research Station',
  RiftResearchStation: 'Rift Research Center',
  TurretFactory: 'Turret Factory',
  Mine: 'Mine',
  Shipyard: 'Shipyard',
  RepairDock: 'Repair Dock',
  TravelHub: 'Travel Hub',
  XsotanResearchCenter: 'Xsotan Research Center',
  ResistanceOutpost: 'Resistance Outpost',
};

export const SIZE_LABELS = ['S', 'M', 'L', 'XL', 'XXL'];

function tbl(v: LuaValue, what: string): LuaTable {
  if (!(v instanceof LuaTable)) throw new Error(`analyzer: expected a table for ${what}`);
  return v;
}

function* entries(t: LuaTable): Generator<[LuaValue, LuaValue]> {
  let k: LuaValue;
  for (;;) {
    const r = t.next(k);
    if (!r) return;
    k = r[0];
    yield r;
  }
}

function* list(t: LuaTable): Generator<LuaValue> {
  for (let i = 1; ; i++) {
    const v = t.getInt(i);
    if (v === undefined) return;
    yield v;
  }
}

const str = (v: LuaValue) => (typeof v === 'string' ? v : '');
const num = (v: LuaValue) => (typeof v === 'number' ? v : 0);
const keysOf = (v: LuaValue) =>
  v instanceof LuaTable
    ? [...entries(v)]
        .filter(([, x]) => x === true)
        .map(([k]) => String(k))
        .sort()
    : [];

/** Lua strings are byte strings; game text files are UTF-8. */
export function decodeUtf8(bytes: string): string {
  return Buffer.from(bytes, 'latin1').toString('utf8');
}

function amounts(v: LuaValue): GoodAmount[] {
  if (!(v instanceof LuaTable)) return [];
  return [...list(v)].map((x) => {
    const t = x as LuaTable;
    const a: GoodAmount = { good: decodeUtf8(str(t.get('name'))), amount: num(t.get('amount')) };
    const opt = t.get('optional');
    if (opt === 1 || opt === true) a.optional = true;
    return a;
  });
}

export interface ExtractResult {
  db: GameDatabase;
  /** Every English string the database shows to people (for translations). */
  strings: Set<string>;
  icons: Set<string>;
  warnings: string[];
}

export function extractDatabase(game: GameFiles): ExtractResult {
  const warnings: string[] = [];
  const { vm, missingIncludes } = createScriptVM(game, DATA_ENTRIES);
  const G = vm.state.G;
  const include = (name: string) => vm.include(name);
  include('goods');
  include('productions');
  include('weapontype');
  include('randomext');
  const TurretIngredients = tbl(include('turretingredients'), 'TurretIngredients');
  const ConsumerGoods = tbl(include('consumergoods'), 'ConsumerGoods');
  const strings = new Set<string>();
  const icons = new Set<string>();
  const iconName = (p: string) => {
    if (!p) return '';
    icons.add(p);
    return path.posix.basename(p);
  };

  // goods
  const goodsTable = tbl(G.get('goods'), 'goods');
  const spawnable = new Set([...list(tbl(G.get('spawnableGoods'), 'spawnableGoods'))].map((g) => str((g as LuaTable).get('name'))));
  const goods: Good[] = [];
  const seen = new Set<LuaValue>();
  for (const g of list(tbl(G.get('goodsArray'), 'goodsArray'))) {
    const t = g as LuaTable;
    if (seen.has(t)) continue;
    seen.add(t);
    const level = t.get('level');
    const good: Good = {
      id: decodeUtf8(str(t.get('name'))),
      name: decodeUtf8(str(t.get('name'))),
      plural: decodeUtf8(str(t.get('plural'))),
      description: decodeUtf8(str(t.get('description'))),
      icon: iconName(str(t.get('icon'))),
      price: num(t.get('price')),
      volume: num(t.get('size')),
      level: typeof level === 'number' ? level : null,
      importance: num(t.get('importance')),
      illegal: t.get('illegal') === true,
      dangerous: t.get('dangerous') === true,
      suspicious: t.get('suspicious') === true,
      stolen: t.get('stolen') === true,
      tags: keysOf(t.get('tags')),
      chains: keysOf(t.get('chains')),
      spawnable: spawnable.has(str(t.get('name'))),
    };
    goods.push(good);
    strings.add(good.name);
    if (good.description) strings.add(good.description);
  }
  goods.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  void goodsTable;

  // productions, with costs computed by the game's own functions
  const getFactoryCost = G.get('getFactoryCost');
  const getFactoryUpgradeCost = G.get('getFactoryUpgradeCost');
  const productions: Production[] = [];
  for (const p of list(tbl(G.get('productions'), 'productions'))) {
    const t = p as LuaTable;
    const prod: Production = {
      index: num(t.get('index')),
      factory: decodeUtf8(str(t.get('factory'))),
      style: str(t.get('factoryStyle')),
      mine: t.get('mine') === true,
      ingredients: amounts(t.get('ingredients')),
      results: amounts(t.get('results')),
      garbages: amounts(t.get('garbages')),
      cost: num(first(call(getFactoryCost, t))),
      upgradeCosts: SIZE_LABELS.map((_, i) => num(first(call(getFactoryUpgradeCost, t, i + 1)))),
    };
    productions.push(prod);
    strings.add(prod.factory);
  }

  // turret types and their factory ingredients
  const WeaponType = tbl(G.get('WeaponType'), 'WeaponType');
  const WeaponTypes = tbl(G.get('WeaponTypes'), 'WeaponTypes');
  const nameByType = tbl(WeaponTypes.get('nameByType'), 'WeaponTypes.nameByType');
  const armamentOf = new Map<number, Armament>();
  for (const [key, arm] of [
    ['armedTypes', 'armed'],
    ['unarmedTypes', 'unarmed'],
    ['defensiveTypes', 'defensive'],
  ] as const) {
    for (const v of list(tbl(WeaponTypes.get(key), key))) armamentOf.set(v as number, arm);
  }
  const weaponIcons = weaponIconsFromScripts(game);
  const StatChanges = tbl(TurretIngredients.get('StatChanges'), 'StatChanges');
  const changeTypeName = new Map<number, 'percentage' | 'flat'>([
    [num(StatChanges.get('Percentage')), 'percentage'],
    [num(StatChanges.get('Flat')), 'flat'],
  ]);
  const turrets: TurretType[] = [];
  for (const [id, index] of entries(WeaponType)) {
    const ingredientsTable = TurretIngredients.get(index);
    const ingredients: TurretIngredient[] = [];
    if (ingredientsTable instanceof LuaTable) {
      for (const x of list(ingredientsTable)) {
        const t = x as LuaTable;
        const ing: TurretIngredient = {
          good: decodeUtf8(str(t.get('name'))),
          amount: num(t.get('amount')),
          investable: num(t.get('investable')),
          minimum: num(t.get('minimum')),
        };
        const rf = t.get('rarityFactor');
        if (typeof rf === 'number') ing.rarityFactor = rf;
        if (typeof t.get('weaponStat') === 'string') ing.weaponStat = str(t.get('weaponStat'));
        if (typeof t.get('turretStat') === 'string') ing.turretStat = str(t.get('turretStat'));
        if (typeof t.get('investFactor') === 'number') ing.investFactor = num(t.get('investFactor'));
        const ct = t.get('changeType');
        if (typeof ct === 'number' && changeTypeName.has(ct)) ing.changeType = changeTypeName.get(ct);
        ingredients.push(ing);
      }
    } else {
      warnings.push(`turret ${String(id)} has no factory ingredients`);
    }
    const rawName = decodeUtf8(str(nameByType.get(index)));
    const name = stripComment(rawName);
    const icon = weaponIcons.get(String(id));
    if (!icon) warnings.push(`turret ${String(id)} has no icon`);
    turrets.push({
      id: String(id),
      index: index as number,
      name,
      armament: armamentOf.get(index as number) ?? 'unarmed',
      icon: icon ? iconName(icon) : '',
      ingredients,
    });
    strings.add(rawName);
  }
  turrets.sort((a, b) => a.index - b.index);

  // consumer stations
  const consumers: ConsumerStation[] = [];
  const consumerSource = game.readBytes('data/scripts/lib/consumergoods.lua');
  for (const [fname, fn] of entries(ConsumerGoods)) {
    if (typeof fn !== 'function') continue;
    // a list the station samples from at random is read from its source instead of called
    const sampled = randomCandidates(consumerSource, String(fname));
    let goodsList: string[];
    if (sampled) goodsList = sampled.map(decodeUtf8);
    else {
      const result = first(call(fn));
      if (!(result instanceof LuaTable)) continue;
      goodsList = [...list(result)].map((g) => decodeUtf8(str(g)));
    }
    const id = String(fname);
    const name = CONSUMER_TITLES[id] ?? id.replace(/([a-z])([A-Z])/g, '$1 $2');
    // the sampled lists repeat goods (a repeat weights the draw); a station buys each good once
    consumers.push({ id, name, goods: [...new Set(goodsList)] });
    strings.add(name);
  }
  consumers.sort((a, b) => (a.id < b.id ? -1 : 1));

  // sector templates in the order SectorSpecifics registers them
  const SectorSpecifics = include('sectorspecifics');
  const specs = first(call(SectorSpecifics)) as LuaTable;
  method(specs, 'addTemplates');
  const templates: SectorTemplate[] = [];
  for (const t of list(tbl(specs.get('templates'), 'templates'))) {
    const tt = t as LuaTable;
    templates.push({ id: str(tt.get('path')), offgrid: first(call(tt.get('offgrid'), 0, 0)) === true });
  }

  for (const s of SIZE_LABELS) strings.add(`${s} /* Size, as in S, M, L, XL etc.*/`);

  // station titles the galaxy map shows for each contents field
  const stationTitles: Record<string, string> = {};
  const specSource = game.readBytes('data/scripts/sectorspecifics.lua');
  const titleRe = /contents\.(\w+)\s+or\s+0\)\s+do\s+table\.insert\(titles,\s*NamedFormat\("([^"]+)"/g;
  for (let m = titleRe.exec(specSource); m; m = titleRe.exec(specSource)) {
    stationTitles[m[1]] = stripComment(decodeUtf8(m[2]));
    strings.add(decodeUtf8(m[2]));
  }
  if (Object.keys(stationTitles).length === 0) warnings.push('no station titles found in sectorspecifics.lua fillSectorView');

  void missingIncludes;

  return {
    db: { game: { version: game.version() }, goods, productions, turrets, consumers, templates, sizes: SIZE_LABELS, stationTitles },
    strings,
    icons,
    warnings,
  };
}

/** Translator comments such as "Chaingun /* Weapon Type *\/" are not part of the text. */
export function stripComment(s: string): string {
  return s.replace(/\s*\/\*.*?\*\/\s*/g, ' ').trim();
}

/** String literals of a `local goods = {...}` list in a function that picks from it with randomEntry. */
function randomCandidates(src: string, fname: string): string[] | undefined {
  const start = src.indexOf(`function ConsumerGoods.${fname}(`);
  if (start === -1) return undefined;
  const end = src.indexOf('\nend', start);
  const body = src.slice(start, end === -1 ? undefined : end);
  if (!/randomEntry\s*\(/.test(body)) return undefined;
  const m = /local\s+goods\s*=\s*\{([^}]*)\}/.exec(body);
  if (!m) return undefined;
  return [...m[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
}

/** WeaponType key → icon path, from weapongenerator.lua's generatorFunction table. */
function weaponIconsFromScripts(game: GameFiles): Map<string, string> {
  const src = game.readBytes('data/scripts/lib/weapongenerator.lua');
  const iconByFn = new Map<string, string>();
  const fnRe = /function\s+WeaponGenerator\.(\w+)\s*\(/g;
  const fns: { name: string; start: number }[] = [];
  for (let m = fnRe.exec(src); m; m = fnRe.exec(src)) fns.push({ name: m[1], start: m.index });
  fns.forEach((f, i) => {
    const body = src.slice(f.start, i + 1 < fns.length ? fns[i + 1].start : src.length);
    const icon = /weapon\.icon\s*=\s*"([^"]+)"/.exec(body);
    if (icon) iconByFn.set(f.name, icon[1]);
  });
  const result = new Map<string, string>();
  const mapRe = /generatorFunction\[WeaponType\.(\w+)\s*\]\s*=\s*WeaponGenerator\.(\w+)/g;
  for (let m = mapRe.exec(src); m; m = mapRe.exec(src)) {
    const icon = iconByFn.get(m[2]);
    if (icon) result.set(m[1], icon);
  }
  return result;
}
