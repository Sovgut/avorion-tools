// Shape of the database `npm run analyze` extracts from the game (src/generated/database.json).

export interface GoodAmount {
  /** Good id (its English name, as the game scripts use it). */
  good: string;
  amount: number;
  optional?: boolean;
}

export interface Good {
  id: string;
  name: string;
  plural: string;
  description: string;
  /** File name in public/game-icons. */
  icon: string;
  price: number;
  /** Cargo volume of one unit. */
  volume: number;
  /** Position in the production chain; null for goods no factory produces at random. */
  level: number | null;
  importance: number;
  illegal: boolean;
  dangerous: boolean;
  suspicious: boolean;
  stolen: boolean;
  tags: string[];
  chains: string[];
  /** Factories may be generated for it. */
  spawnable: boolean;
}

export interface Production {
  /** 1-based index in the game's production list. */
  index: number;
  /** Title pattern with ${good} and ${size}, e.g. "${good} Factory ${size}". */
  factory: string;
  style: string;
  mine: boolean;
  ingredients: GoodAmount[];
  results: GoodAmount[];
  garbages: GoodAmount[];
  /** Founding cost from the game's getFactoryCost. */
  cost: number;
  /** getFactoryUpgradeCost for sizes S..XXL (1..5). */
  upgradeCosts: number[];
}

export type Armament = 'armed' | 'unarmed' | 'defensive';

export interface TurretIngredient extends GoodAmount {
  investable: number;
  minimum: number;
  rarityFactor?: number;
  weaponStat?: string;
  turretStat?: string;
  investFactor?: number;
  changeType?: 'percentage' | 'flat';
}

export interface TurretType {
  /** WeaponType key, e.g. "ChainGun". */
  id: string;
  /** WeaponType value. */
  index: number;
  name: string;
  armament: Armament;
  icon: string;
  ingredients: TurretIngredient[];
}

export interface ConsumerStation {
  /** Function name in consumergoods.lua, e.g. "Habitat". */
  id: string;
  /** English station title. */
  name: string;
  goods: string[];
}

export interface SectorTemplate {
  /** Script path, e.g. "sectors/factoryfield". */
  id: string;
  offgrid: boolean;
}

export interface GameDatabase {
  game: {
    version: string;
  };
  goods: Good[];
  productions: Production[];
  turrets: TurretType[];
  consumers: ConsumerStation[];
  templates: SectorTemplate[];
  /** Factory size labels for sizes 1..5. */
  sizes: string[];
  /** Station title per contents field (shipyards → "Shipyard"), as the galaxy map lists them. */
  stationTitles: Record<string, string>;
}

/** English source string → translation. Plural forms are keyed "msgid\u0001plural". */
export type Translations = Record<string, string>;
