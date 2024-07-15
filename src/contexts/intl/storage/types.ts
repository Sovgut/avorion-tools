import { Commodity } from "~data/commodities/enums";
import { Station } from "~data/stations/enums";
import { Turret } from "~data/turrets/enums";

export type LanguageType = "en-US" | "ru";

export type IntlStation = Record<Station, string>;
export type IntlCommodity = Record<Commodity, string>;
export type IntlTurret = Record<Turret, string>;

export interface IntlUI {
  "global-search": string;
  commodity: string;
  commodities: string;
  station: string;
  stations: string;
  copy: string;
  copied: string;
  "lets-add-turret": string;
  "cargo-offset": string;
  "guaranteed-in": string;
  threats: string;
  "can-be-found-in": string;
  quantity: string;
  component: string;
  components: string;
  "estimated-price": string;
  "estimated-volume": string;
  "estimated-price-info": string;
  "component-source-info": string;
  "dangerous-cargo": string;
  "illegal-cargo": string;
  "please-note": string;
  "cargo-required": string;
  cargo: string;
  "cargo-field-note": string;
  "cargo-field-label": string;
  "select-turret": string;
  "add-turret": string;
  "reset-components": string;
  "remove-turret": string;
  "clear-turrets": string;
  "clear-turrets-confirmation": string;
  "turret-price": string;
  "remove-turret-confirmation": string;
  "recipe-for-version": string;
  theme: string;
  "light-theme": string;
  "dark-theme": string;
  "system-theme": string;
  language: string;
  "english-language": string;
  "russian-language": string;
  "getting-started-0": string;
  "getting-started-1": string;
  "getting-started-2": string;
  "getting-started-3": string;
  "getting-started-4": string;
  "turret-planner": string;
}

export type IntlLabel = {
  UI: keyof IntlUI;
  TURRET: keyof IntlTurret;
  STATION: keyof IntlStation;
  COMMODITY: keyof IntlCommodity;
};

export type IntlStorage = {
  UI: Record<LanguageType, IntlUI>;
  TURRET: Record<LanguageType, IntlTurret>;
  COMMODITY: Record<LanguageType, IntlCommodity>;
  STATION: Record<LanguageType, IntlStation>;
};
