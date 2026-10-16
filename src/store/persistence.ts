// Saves the planner and settings to localStorage, and reads data saved by the previous app version.
import { goods, turretById } from '@/game/database';
import { type Blueprint, initialPlanner, type PlannedTurret, type PlannerState, SECTOR_MAX, SECTOR_MIN } from './planner';
import { initialSettings, type SettingsState } from './settings';

const KEY = 'avorion-tools:v2';

interface Persisted {
  planner: PlannerState;
  settings: SettingsState;
}

export function savePersisted(state: Persisted): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: 2, planner: state.planner, settings: state.settings }));
  } catch {
    // storage full or disabled: the session keeps working, it just is not saved
  }
}

export function loadPersisted(): Partial<Persisted> | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.v === 2) return sanitize(data);
    }
    return migrateLegacy();
  } catch {
    return undefined;
  }
}

function sanitize(data: any): Partial<Persisted> {
  const planner: PlannerState = { ...initialPlanner, ...data.planner };
  planner.turrets = (planner.turrets ?? []).filter((t: PlannedTurret) => turretById.has(t.type));
  planner.blueprints = (planner.blueprints ?? []).filter((b: Blueprint) => turretById.has(b.type));
  if (planner.currentTabId && !planner.tabs.some((t) => t.id === planner.currentTabId)) planner.currentTabId = planner.tabs[0]?.id ?? null;
  return { planner, settings: { ...initialSettings, ...data.settings } };
}

// ---------------------------------------------------------------- previous version (cache:v5:*)

/** Turret enum of the previous version, in declaration order. */
const LEGACY_TURRETS = [
  'AntiFighter',
  'Bolter',
  'Cannon',
  'ChainGun',
  'ForceGun',
  'Laser',
  'LightningGun',
  'MiningLaser',
  'PlasmaGun',
  'PointDefenseChainGun',
  'PointDefenseLaser',
  'PulseCannon',
  'RailGun',
  'RawMiningLaser',
  'RawSalvagingLaser',
  'RepairBeam',
  'RocketLauncher',
  'SalvagingLaser',
  'TeslaGun',
];

/** Commodity enum of the previous version, in declaration order. */
const LEGACY_COMMODITIES: string[] = [
  'Acid',
  'AcronDrug',
  'Adhesive',
  'Aluminum',
  'Ammunition',
  'AmmunitionL',
  'AmmunitionM',
  'AmmunitionS',
  'AntigravGenerator',
  'AntigravUnit',
  'AvorionOre',
  'Beer',
  'BioGas',
  'BodyArmor',
  'Book',
  'Carbon',
  'Cattle',
  'Chemicals',
  'Chlorine',
  'Clothes',
  'Coal',
  'Cocoa',
  'Coffee',
  'ComputationMainframe',
  'Conductor',
  'Coolant',
  'Copper',
  'Corn',
  'Crystal',
  'Dairy',
  'Diamond',
  'Display',
  'Drill',
  'Drone',
  'ElectroMagnet',
  'ElectromagneticCharge',
  'ElectronAccelerator',
  'EnergyCell',
  'EnergyContainer',
  'EnergyGenerator',
  'EnergyInverter',
  'EnergyTube',
  'ExplosiveCharge',
  'Fabric',
  'Fertilizer',
  'Fish',
  'Fluorine',
  'Food',
  'FoodBar',
  'ForceGenerator',
  'Fruit',
  'Fuel',
  'Fungus',
  'FusionCore',
  'FusionGenerator',
  'GaussRail',
  'Gem',
  'Glass',
  'Gold',
  'Gun',
  'Helium',
  'HighCapacityLens',
  'HighPressureTube',
  'Hydrogen',
  'IndustrialTeslaCoil',
  'IronOre',
  'Jewelry',
  'LaserCompressor',
  'LaserHead',
  'LaserModulator',
  'Lead',
  'Leather',
  'Liquor',
  'LuxuryFood',
  'Meat',
  'MedicalSupplies',
  'MetalPlate',
  'Microchip',
  'MilitaryTeslaCoil',
  'Mineral',
  'MiningRobot',
  'MornDrug',
  'Nanobot',
  'NaoniteOre',
  'Neon',
  'NeutronAccelerator',
  'Nitrogen',
  'OgoniteOre',
  'Oil',
  'Ore',
  'Oxygen',
  'Paint',
  'Paper',
  'Plankton',
  'Plant',
  'PlasmaCell',
  'Plastic',
  'Platinum',
  'Potato',
  'PowerUnit',
  'Processor',
  'Protein',
  'ProtonAccelerator',
  'RawOil',
  'Rice',
  'RiftAvorionOre',
  'RiftIronOre',
  'RiftNaoniteOre',
  'RiftOgoniteOre',
  'RiftResearchData',
  'RiftTitaniumOre',
  'RiftTriniumOre',
  'RiftXanionOre',
  'Rocket',
  'Rubber',
  'Satellite',
  'ScrapAvorion',
  'ScrapIron',
  'ScrapMetal',
  'ScrapNaonite',
  'ScrapOgonite',
  'ScrapTitanium',
  'ScrapTrinium',
  'ScrapXanion',
  'SemiConductor',
  'Servo',
  'Sheep',
  'Silicon',
  'Silver',
  'Slave',
  'SolarCell',
  'SolarPanel',
  'Solvent',
  'Spices',
  'Steel',
  'SteelTube',
  'TargetingCard',
  'TargetingSystem',
  'Tea',
  'Teleporter',
  'TitaniumOre',
  'Tools',
  'ToxicWaste',
  'Transformator',
  'TriniumOre',
  'Turbine',
  'Vegetable',
  'Vehicle',
  'WarRobot',
  'Warhead',
  'Water',
  'Wheat',
  'Wine',
  'Wire',
  'Wood',
  'XanionOre',
  'Zinc',
];

const coord = (v: unknown) => Math.max(SECTOR_MIN, Math.min(SECTOR_MAX, Math.trunc(Number(v)) || 0));
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const goodByNorm = new Map(goods.map((g) => [norm(g.id), g.id]));
const legacyGood = (n: number) => goodByNorm.get(norm(LEGACY_COMMODITIES[n] ?? ''));

/** A key saved by the previous version. Most are JSON, `lang` is a bare string such as `en-US`. */
function legacy(key: string): any {
  for (const v of ['v5', 'v4']) {
    const raw = localStorage.getItem(`cache:${v}:${key}`);
    if (!raw) continue;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return undefined;
}

function migrateLegacy(): Partial<Persisted> | undefined {
  const tabs = legacy('tabs');
  if (!tabs?.entities?.length) return undefined;
  const planner: PlannerState = structuredClone(initialPlanner);
  planner.tabs = tabs.entities.slice(0, 10).map((t: any) => ({ id: String(t.id), name: String(t.name ?? 'Tab') }));
  planner.currentTabId =
    tabs.current?.id && planner.tabs.some((t) => t.id === tabs.current.id) ? tabs.current.id : (planner.tabs[0]?.id ?? null);
  const components: any[] = legacy('components')?.entities ?? [];
  for (const t of legacy('turrets')?.entities ?? []) {
    const type = LEGACY_TURRETS[t.type];
    const def = type ? turretById.get(type) : undefined;
    if (!def || !planner.tabs.some((tab) => tab.id === String(t.tab_id))) continue;
    const counts: Record<string, number> = Object.fromEntries(def.ingredients.map((i) => [i.good, 0]));
    for (const c of components.filter((c) => c.turret_id === t.id)) {
      const good = legacyGood(c.type);
      if (good && good in counts) counts[good] = Math.max(0, Number(c.quantity) || 0);
    }
    planner.turrets.push({
      id: String(t.id),
      tabId: String(t.tab_id),
      type,
      qty: Math.max(1, Number(t.quantity) || 1),
      price: Math.max(0, Number(t.price) || 0),
      x: coord(t.location?.x),
      y: coord(t.location?.y),
      enabled: t.enabled !== false,
      counts,
    });
  }
  for (const [k, v] of Object.entries(legacy('cargo')?.entities ?? {})) {
    const good = legacyGood(Number(k));
    if (good && Number(v) > 0) planner.cargo[good] = Number(v);
  }
  for (const [k, v] of Object.entries(legacy('checkbox')?.entities ?? {})) {
    const good = legacyGood(Number(k));
    if (good && v === true) planner.bought[good] = true;
  }
  for (const b of legacy('blueprints')?.entities ?? []) {
    const type = LEGACY_TURRETS[b.turret?.type];
    const def = type ? turretById.get(type) : undefined;
    if (!def) continue;
    const counts: Record<string, number> = Object.fromEntries(def.ingredients.map((i) => [i.good, 0]));
    for (const c of b.components ?? []) {
      const good = legacyGood(c.type);
      if (good && good in counts) counts[good] = Math.max(0, Number(c.quantity) || 0);
    }
    planner.blueprints.push({
      id: String(b.id),
      type,
      name: String(b.name ?? def.name),
      rarity: b.rarity ?? 'common',
      counts,
      price: Math.max(0, Number(b.turret?.price) || 0),
      x: coord(b.turret?.location?.x),
      y: coord(b.turret?.location?.y),
    });
  }
  const lang = legacy('lang');
  const settings: SettingsState = {
    ...initialSettings,
    lang: typeof lang === 'string' && lang.toLowerCase().startsWith('ru') ? 'ru' : initialSettings.lang,
  };
  return { planner, settings };
}
