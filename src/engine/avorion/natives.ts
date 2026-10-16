// Avorion's native script API, as far as galaxy generation and data extraction need it.
import { call, first, getMetamethod, LuaError, LuaMulti, LuaTable, type LuaValue, method, tonum, Userdata } from '../lua/runtime';
import { tostring } from '../lua/stdlib';
import enumData from './enums.json';
import { luaToInt32, makeFastHash, sectorSeed, seedFromString } from './hashes';
import { fromBigInt, fromDouble, toBigInt, toSignedNumber, toSignedString } from './int64';
import { MT19937_64 } from './mt64';
import { QuadTree } from './quadtree';

const fr = Math.fround;

type Fn = (...a: LuaValue[]) => LuaValue;

function metatable(
  name: string,
  methods: Record<string, Fn>,
  getField?: (o: any, k: LuaValue) => LuaValue,
  extra?: Record<string, Fn>,
): LuaTable {
  const mt = new LuaTable();
  const methodTable = new Map(Object.entries(methods));
  mt.set('__index', (o: LuaValue, k: LuaValue) => {
    if (typeof k === 'string') {
      const m = methodTable.get(k);
      if (m !== undefined) return m;
    }
    return getField ? getField(o, k) : undefined;
  });
  mt.set('__name', name);
  if (extra) for (const [k, v] of Object.entries(extra)) mt.set(k, v);
  return mt;
}

function num(v: LuaValue, what: string): number {
  const n = tonum(v);
  if (n === undefined) throw new LuaError(`${what}: number expected, got ${tostring(v)}`);
  return n;
}

// ------------------------------------------------------------------ Seed

export class Seed extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'Seed';
  constructor(
    readonly hi: number,
    readonly lo: number,
  ) {
    super();
  }
  get luaMetatable(): LuaTable {
    return Seed.meta;
  }
  get int32(): number {
    return (this.hi ^ this.lo) | 0;
  }
  get value(): number {
    return toSignedNumber(this.hi, this.lo);
  }
  get big(): bigint {
    return toBigInt(this.hi, this.lo);
  }
  toString(): string {
    return toSignedString(this.hi, this.lo);
  }
  static fromBig(v: bigint): Seed {
    const [h, l] = fromBigInt(v);
    return new Seed(h, l);
  }
  static from(v: LuaValue): Seed {
    if (v instanceof Seed) return v;
    if (typeof v === 'string') return Seed.fromBig(seedFromString(v));
    if (typeof v === 'number') {
      const [h, l] = fromDouble(v);
      return new Seed(h, l);
    }
    if (v === undefined) return new Seed(0, 0);
    throw new LuaError(`Seed: bad argument ${tostring(v)}`);
  }
}

const seedArith = (op: (a: bigint, b: bigint) => bigint) => (a: LuaValue, b: LuaValue) => {
  const x = a instanceof Seed ? a.big : BigInt(Math.trunc(num(a, 'Seed')));
  const y = b instanceof Seed ? b.big : BigInt(Math.trunc(num(b, 'Seed')));
  return Seed.fromBig(op(x, y));
};

Seed.meta = metatable(
  'Seed',
  {},
  (o: Seed, k) => {
    if (k === 'int32') return o.int32;
    if (k === 'value') return o.value;
    return undefined;
  },
  {
    __tostring: (o) => (o as Seed).toString(),
    __eq: (a, b) => a instanceof Seed && b instanceof Seed && a.hi === b.hi && a.lo === b.lo,
    __lt: (a, b) => BigInt.asIntN(64, (a as Seed).big) < BigInt.asIntN(64, (b as Seed).big),
    __le: (a, b) => BigInt.asIntN(64, (a as Seed).big) <= BigInt.asIntN(64, (b as Seed).big),
    __add: seedArith((a, b) => a + b),
    __sub: seedArith((a, b) => a - b),
    __mul: seedArith((a, b) => a * b),
    __div: seedArith((a, b) => (b === 0n ? 0n : BigInt.asIntN(64, a) / BigInt.asIntN(64, b))),
    __unm: (a) => Seed.fromBig(-(a as Seed).big),
  },
);

// ------------------------------------------------------------------ Random

export class Random extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'Random';
  mt: MT19937_64;
  constructor(seed: Seed) {
    super();
    this.mt = new MT19937_64(seed.hi, seed.lo);
  }
  get luaMetatable(): LuaTable {
    return Random.meta;
  }
  /** Uniform float in [0, 1) with 10^-6 resolution, as float32. */
  unit(): number {
    return fr((this.mt.next() % 1000000) / 1000000);
  }
  getInt(min: number, max: number): number {
    min = luaToInt32(min);
    max = luaToInt32(max);
    // an empty range answers without drawing
    if (min === max) return min;
    if (min > max) {
      const t = min;
      min = max;
      max = t;
    }
    const range = (max - min + 1) >>> 0;
    const r = this.mt.next();
    if (range === 0) return (min + r) | 0;
    return (min + (r % range)) | 0;
  }
  getFloat(a?: number, b?: number): number {
    const u = this.unit();
    if (a === undefined) return u;
    if (b === undefined) {
      b = a;
      a = 0;
    }
    // bounds are floats; the span is rounded once, the multiply-add only at the end
    const fa = fr(a);
    return fr(fa + fr(fr(b) - fa) * u);
  }
  test(p: number): boolean {
    return this.unit() < p;
  }
  getBool(): boolean {
    return this.mt.next() % 2 === 0;
  }
  createSeed(): Seed {
    const lo = this.mt.next();
    return new Seed(this.mt.outHi, lo);
  }
}

Random.meta = metatable('Random', {
  getInt: (self, a, b) => (self as Random).getInt(num(a, 'getInt'), num(b, 'getInt')),
  getFloat: (self, a, b) =>
    (self as Random).getFloat(a === undefined ? undefined : num(a, 'getFloat'), b === undefined ? undefined : num(b, 'getFloat')),
  test: (self, p) => (self as Random).test(num(p, 'test')),
  getBool: (self) => (self as Random).getBool(),
  multitest: (self, tries, p) => {
    const r = self as Random;
    const n = luaToInt32(num(tries, 'multitest'));
    const prob = num(p, 'multitest');
    let hits = 0;
    for (let i = 0; i < n; i++) if (r.test(prob)) hits++;
    return hits;
  },
  createSeed: (self) => (self as Random).createSeed(),
  setSeed: (self, s) => {
    (self as Random).mt = new MT19937_64(Seed.from(s).hi, Seed.from(s).lo);
    return undefined;
  },
  getDirection: (self) => {
    const r = self as Random;
    // uniform direction on the sphere; not reverse-engineered, only plausible
    const z = r.getFloat(-1, 1);
    const t = r.getFloat(0, Math.PI * 2);
    const s = Math.sqrt(1 - z * z);
    return new Vec3(Math.cos(t) * s, Math.sin(t) * s, z);
  },
  get2DDirection: (self) => {
    const t = (self as Random).getFloat(0, Math.PI * 2);
    return new Vec2(Math.cos(t), Math.sin(t));
  },
  getVector: (self, a, b) => {
    const r = self as Random;
    const lo = num(a, 'getVector');
    const hi = num(b, 'getVector');
    return new Vec3(r.getFloat(lo, hi), r.getFloat(lo, hi), r.getFloat(lo, hi));
  },
});

// ------------------------------------------------------------------ vectors

export class Vec2 extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'vec2';
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = fr(x);
    this.y = fr(y);
  }
  get luaMetatable(): LuaTable {
    return Vec2.meta;
  }
}

export class Vec3 extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'vec3';
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    super();
    this.x = fr(x);
    this.y = fr(y);
    this.z = fr(z);
  }
  get luaMetatable(): LuaTable {
    return Vec3.meta;
  }
}

export class IVec2 extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'ivec2';
  constructor(
    public x: number,
    public y: number,
  ) {
    super();
  }
  get luaMetatable(): LuaTable {
    return IVec2.meta;
  }
}

type AnyVec = Vec2 | Vec3;
const comps = (v: AnyVec) => (v instanceof Vec3 ? [v.x, v.y, v.z] : [v.x, v.y]);
const make = (proto: AnyVec, c: number[]) => (proto instanceof Vec3 ? new Vec3(c[0], c[1], c[2]) : new Vec2(c[0], c[1]));

function vecOp(op: (a: number, b: number) => number) {
  return (a: LuaValue, b: LuaValue) => {
    if ((a instanceof Vec2 || a instanceof Vec3) && (b instanceof Vec2 || b instanceof Vec3)) {
      const ca = comps(a);
      const cb = comps(b);
      return make(
        a,
        ca.map((x, i) => fr(op(x, cb[i]))),
      );
    }
    if (a instanceof Vec2 || a instanceof Vec3) {
      const s = fr(num(b, 'vec'));
      return make(
        a,
        comps(a).map((x) => fr(op(x, s))),
      );
    }
    const v = b as AnyVec;
    const s = fr(num(a, 'vec'));
    return make(
      v,
      comps(v).map((x) => fr(op(s, x))),
    );
  };
}

function vecField(names: string[]) {
  return (o: any, k: LuaValue) => (typeof k === 'string' && names.includes(k) ? o[k] : undefined);
}

function vecMeta(name: string, fields: string[]): LuaTable {
  const mt = metatable(name, {}, vecField(fields), {
    __add: vecOp((a, b) => a + b),
    __sub: vecOp((a, b) => a - b),
    __mul: vecOp((a, b) => a * b),
    __div: vecOp((a, b) => a / b),
    __unm: (a) =>
      make(
        a as AnyVec,
        comps(a as AnyVec).map((x) => -x),
      ),
    __eq: (a, b) => {
      const ca = comps(a as AnyVec);
      const cb = comps(b as AnyVec);
      return ca.length === cb.length && ca.every((x, i) => x === cb[i]);
    },
    __tostring: (a) =>
      '(' +
      comps(a as AnyVec)
        .map((x) => tostring(x))
        .join(', ') +
      ')',
  });
  mt.set('__newindex', (o: any, k: LuaValue, v: LuaValue) => {
    if (typeof k === 'string' && fields.includes(k)) o[k] = fr(num(v, name));
    else throw new LuaError(`${name} has no field ${tostring(k)}`);
  });
  return mt;
}

Vec2.meta = vecMeta('vec2', ['x', 'y']);
Vec3.meta = vecMeta('vec3', ['x', 'y', 'z']);
IVec2.meta = metatable('ivec2', {}, (o: IVec2, k) => (k === 'x' ? o.x : k === 'y' ? o.y : undefined), {
  __eq: (a, b) => (a as IVec2).x === (b as IVec2).x && (a as IVec2).y === (b as IVec2).y,
  __tostring: (a) => `(${(a as IVec2).x}, ${(a as IVec2).y})`,
});

function dotf(a: AnyVec, b: AnyVec): number {
  const ca = comps(a);
  const cb = comps(b);
  let d = fr(ca[0] * cb[0]);
  for (let i = 1; i < ca.length; i++) d = fr(d + fr(ca[i] * cb[i]));
  return d;
}

// ------------------------------------------------------------------ QuadTree

export class LuaQuadTree extends Userdata {
  static meta: LuaTable;
  override readonly luaTypeName = 'QuadTree';
  constructor(readonly tree: QuadTree) {
    super();
  }
  get luaMetatable(): LuaTable {
    return LuaQuadTree.meta;
  }
}

LuaQuadTree.meta = metatable(
  'QuadTree',
  {
    insert: (self, p) => {
      const v = p as Vec2;
      (self as LuaQuadTree).tree.insert(v.x, v.y);
      return undefined;
    },
    nearest: (self, x, y, radius) => {
      const r = (self as LuaQuadTree).tree.nearest(
        num(x, 'nearest'),
        num(y, 'nearest'),
        radius === undefined ? undefined : num(radius, 'nearest'),
      );
      return r === undefined ? new LuaMulti([undefined, undefined]) : new LuaMulti([r[0], r[1]]);
    },
    get: (self, c, radius) => {
      const v = c as Vec2;
      const { xs, ys } = (self as LuaQuadTree).tree.get(v.x, v.y, num(radius, 'get'));
      return new LuaMulti(xs.map((x, i) => new Vec2(x, ys[i])));
    },
  },
  (o: LuaQuadTree, k) => (k === 'empty' ? o.tree.empty : undefined),
);

// ------------------------------------------------------------------ installation

export interface GalaxySettings {
  /** The server seed string, as `/seed` prints it. */
  seed: string;
  mapFactions: number;
  rifts: number;
  barrier: boolean;
}

export const DEFAULT_SETTINGS: Omit<GalaxySettings, 'seed'> = { mapFactions: 350, rifts: 200, barrier: true };

export interface NativeOptions {
  settings: GalaxySettings;
  /** Resolves an `include` name to a compiled module path, or undefined. */
  resolveInclude: (name: string) => string | undefined;
  require: (path: string) => LuaValue;
  onServer?: boolean;
  print?: (s: string) => void;
}

export function installNatives(G: LuaTable, opts: NativeOptions): void {
  const def = (name: string, f: Fn) => G.set(name, f);
  const settings = opts.settings;
  const gameSeed = Seed.from(settings.seed);

  for (const [name, members] of Object.entries(enumData.enums as Record<string, Record<string, number>>)) {
    const t = new LuaTable();
    for (const [k, v] of Object.entries(members)) t.set(k, v);
    G.set(name, t);
  }

  const pkg = new LuaTable();
  pkg.set('path', '');
  G.set('package', pkg);

  def('include', (name) => {
    const path = opts.resolveInclude(String(name));
    if (!path) throw new LuaError(`include: cannot find '${tostring(name)}'`);
    return opts.require(path);
  });
  def('Seed', (v) => Seed.from(v));
  def('Random', (s) => new Random(Seed.from(s)));
  def('GameSeed', () => gameSeed);
  def('SectorSeed', (x, y, s) => {
    const seed = s === undefined ? gameSeed : Seed.from(s);
    const [h, l] = sectorSeed(luaToInt32(num(x, 'SectorSeed')), luaToInt32(num(y, 'SectorSeed')), seed.hi, seed.lo);
    return new Seed(h, l);
  });
  def('makeFastHash', (a, b, c) => {
    if (c === undefined) return undefined;
    return makeFastHash(num(a, 'makeFastHash'), num(b, 'makeFastHash'), num(c, 'makeFastHash'));
  });
  def(
    'vec2',
    (x, y) => new Vec2(x === undefined ? 0 : num(x, 'vec2'), y === undefined ? (x === undefined ? 0 : num(x, 'vec2')) : num(y, 'vec2')),
  );
  def('vec3', (x, y, z) => {
    if (x === undefined) return new Vec3(0, 0, 0);
    if (y === undefined) return new Vec3(num(x, 'vec3'), num(x, 'vec3'), num(x, 'vec3'));
    return new Vec3(num(x, 'vec3'), num(y, 'vec3'), num(z, 'vec3'));
  });
  def('ivec2', (x, y) => new IVec2(luaToInt32(num(x ?? 0, 'ivec2')), luaToInt32(num(y ?? 0, 'ivec2'))));
  def('dot', (a, b) => dotf(a as AnyVec, b as AnyVec));
  def('length', (a) => fr(Math.sqrt(dotf(a as AnyVec, a as AnyVec))));
  def('length2', (a) => dotf(a as AnyVec, a as AnyVec));
  def('distance', (a, b) => {
    const d = make(
      a as AnyVec,
      comps(a as AnyVec).map((x, i) => fr(x - comps(b as AnyVec)[i])),
    );
    return fr(Math.sqrt(dotf(d, d)));
  });
  def('distance2', (a, b) => {
    const d = make(
      a as AnyVec,
      comps(a as AnyVec).map((x, i) => fr(x - comps(b as AnyVec)[i])),
    );
    return dotf(d, d);
  });
  def('normalize', (a) => {
    const v = a as AnyVec;
    const l = fr(Math.sqrt(dotf(v, v)));
    return make(
      v,
      comps(v).map((x) => fr(x / l)),
    );
  });
  def('QuadTree', (min, max, level) => {
    const a = min as Vec2;
    const b = max as Vec2;
    return new LuaQuadTree(new QuadTree(a.x, a.y, b.x, b.y, num(level, 'QuadTree')));
  });
  // the material count is the size of the MaterialType enum the server reported
  const materialCount = Object.keys((enumData.enums as Record<string, Record<string, number>>).MaterialType ?? {}).length;
  def('NumMaterials', () => materialCount);
  def('GameSettings', () => {
    const t = new LuaTable();
    t.set('seed', settings.seed);
    t.set('mapFactions', settings.mapFactions);
    t.set('rifts', settings.rifts);
    t.set('barrier', settings.barrier);
    // the remaining server.ini defaults; generation only reads a few of them
    const defaults: Record<string, LuaValue> = {
      difficulty: 0,
      storyline: true,
      behemothEvents: false,
      resourceAsteroidFactor: 1,
      resourceWreckageFactor: 1,
      eventsFactor: 1,
      riftMassFactor: 1,
      riftDamageFactor: 1,
      damageMultiplier: 0.6000000238418579,
      initialRelations: 0,
      relationGainFactor: 1,
      relationLossFactor: 1,
      startingResources: 0,
      collisionDamage: 1,
      devMode: false,
      infiniteResources: false,
      playTutorial: false,
      permaDestruction: false,
      reconstructionAllowed: true,
      dockingRestrictions: true,
      unlimitedProcessingPower: false,
      unlimitedShipSize: false,
      fullBuildingUnlocked: false,
      buildModeFreeTurrets: false,
      buildModeExtraBlockTypes: false,
      creativeModeCommandCenter: false,
      instantShipyardBuilding: false,
      shipyardBoundBuilding: true,
      repairingAlwaysAllowed: false,
      preciseAIAim: false,
      safePlayerInput: false,
      pvpDamage: true,
      bigWreckageDespawnTime: 1800,
      smallWreckageDespawnTime: 900,
      maximumFightersPerSectorAndPlayer: -1,
      maximumStationsPerSector: -1,
      maximumBlocksPerCraft: -1,
      maximumVolumePerShip: -1,
      maximumVolumePerStation: -1,
      maximumPlayerShips: -1,
      maximumPlayerStations: -1,
      maximumAllianceShips: -1,
      maximumAllianceStations: -1,
      maximumAllianceShipsPerMember: -1,
      maximumAllianceStationsPerMember: -1,
    };
    for (const [k, v] of Object.entries(defaults)) t.set(k, v);
    return t;
  });
  // Galaxy(): the client-side part of the native, answered by the game's own FactionsMap script.
  let factionsMap: LuaValue;
  const getFactionsMap = () => {
    if (factionsMap === undefined) {
      const FactionsMap = opts.require(opts.resolveInclude('factionsmap') ?? 'data/scripts/lib/factionsmap.lua');
      factionsMap = first(call(FactionsMap, gameSeed));
    }
    return factionsMap;
  };
  const galaxy = new LuaTable();
  galaxy.set(
    'isCentralFactionArea',
    (_self: LuaValue, x: LuaValue, y: LuaValue) => first(method(getFactionsMap(), 'isCentralFactionArea', x, y)) === true,
  );
  galaxy.set('getLocalFaction', () => undefined);
  galaxy.set('getNearestFaction', () => undefined);
  def('Galaxy', () => galaxy);

  def('PlanetSpecifics', () => {
    const t = new LuaTable();
    for (const [k, v] of Object.entries({
      type: 0,
      size: 1,
      atmosphere: false,
      clouds: false,
      habitated: false,
      ring: false,
      isPrimary: false,
    }))
      t.set(k, v);
    t.set('position', new Vec3(0, 0, 0));
    return t;
  });

  def('onServer', () => opts.onServer ?? false);
  def('onClient', () => !(opts.onServer ?? false));
  def('appTimeMs', () => 0);
  def('appTime', () => 0);
  def('eprint', (...a) => {
    opts.print?.(a.map(tostring).join('\t'));
    return undefined;
  });
  def('atype', (v) => {
    if (v instanceof Userdata) return v.luaTypeName;
    const mt = getMetamethod(v, '__avoriontype');
    return mt ?? undefined;
  });
  def('valid', (v) => v !== undefined && v !== false);

  // Translation markers: "text" % _t → text; NamedFormat keeps its pattern.
  const marker = new LuaTable();
  G.set('_t', marker);
  G.set('_T', marker);
  const strMeta = getMetamethodTable();
  strMeta.set('__mod', (a: LuaValue, b: LuaValue) => {
    if (b === marker) return a;
    if (b instanceof LuaTable && typeof a === 'string') {
      // "%s" % {x} style formatting is not used by the generation path
      return a;
    }
    return a;
  });
  def('NamedFormat', (pattern, args) => {
    const t = new LuaTable();
    t.set('pattern', pattern);
    t.set('args', args);
    return t;
  });
}

import { stringMeta } from '../lua/runtime';

function getMetamethodTable(): LuaTable {
  return stringMeta;
}

// ------------------------------------------------------------------ stubs

/**
 * Stand-in for a native the generation path references but never relies on (colors, plans,
 * entities). Calling or indexing it yields the stub again, so module-level setup code runs.
 * Every use is counted, so a stub that does leak into generated data can be found.
 */
export class NativeStub extends Userdata {
  static meta: LuaTable;
  static uses = new Map<string, number>();
  override readonly luaTypeName = 'stub';
  constructor(readonly stubName: string) {
    super();
  }
  get luaMetatable(): LuaTable {
    return NativeStub.meta;
  }
  touch(): NativeStub {
    NativeStub.uses.set(this.stubName, (NativeStub.uses.get(this.stubName) ?? 0) + 1);
    return this;
  }
}

const stubOp = (a: LuaValue, b: LuaValue) => ((a instanceof NativeStub ? a : (b as NativeStub)) as NativeStub).touch();
NativeStub.meta = (() => {
  const mt = new LuaTable();
  mt.set('__index', (o: LuaValue, k: LuaValue) => new NativeStub(`${(o as NativeStub).stubName}.${String(k)}`).touch());
  mt.set('__newindex', () => undefined);
  mt.set('__call', (o: LuaValue) => (o as NativeStub).touch());
  for (const op of ['__add', '__sub', '__mul', '__div', '__mod', '__pow', '__concat']) mt.set(op, stubOp);
  mt.set('__unm', (o: LuaValue) => (o as NativeStub).touch());
  mt.set('__len', () => 0);
  mt.set('__tostring', (o: LuaValue) => `<native ${(o as NativeStub).stubName}>`);
  return mt;
})();

/** Installs stubs for every name in `names` that is not already a global. */
export function installStubs(G: LuaTable, names: string[]): void {
  for (const n of names) if (G.get(n) === undefined) G.set(n, new NativeStub(n));
}
