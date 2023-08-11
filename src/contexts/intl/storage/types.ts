export type ILanguage = "en-US" | "ru"

export interface IIntlStation {
    "Turret Factory Supplier": string;
    "Turret Factory": string;
    "Aluminum Mine": string;
    "Ammunition Factory": string;
    "Conductor Factory": string;
    "Copper Mine": string;
    "Planetary Trading Post": string;
    "Crystal Farm": string;
    "Electro Magnet Factory": string;
    "Electromagnetic Charge Factory": string;
    "Solar Power Plant": string;
    "Energy Container Factory": string;
    "Energy Inverter Factory": string;
    "Energy Tube Factory": string;
    "Explosive Charge Factory": string;
    "Force Generator Factory": string;
    "Fuel Factory": string;
    "Gauss Rail Factory": string;
    "Noble Metal Mine": string;
    "High Capacity Lens Factory": string;
    "High Pressure Tube Factory": string;
    "Tesla Coil Factory": string;
    "Laser Compressor Factory": string;
    "Laser Head Factory": string;
    "Laser Modulator Factory": string;
    "Lead Mine": string;
    "Nanobot Factory": string;
    "Plasma Cell Factory": string;
    "Power Unit Factory": string;
    "Rocket Factory": string;
    "Servo Factory": string;
    "Steel Factory": string;
    "Steel Tube Factory": string;
    "Computer Component Factory": string;
    "Targeting Card Factory": string;
    "Transformator Factory": string;
    "Warhead Factory": string;
    "Wire Manufacturer": string;
    "Zinc Mine": string;
}

export interface IIntlTurret {
    "Chaingun": string;
    "Bolter": string;
    "Laser": string;
    "Plasma Gun": string;
    "Cannon": string;
    "Rocket Launcher": string;
    "Railgun": string;
    "Repair": string;
    "Mining Laser": string;
    "Raw Mining Laser": string;
    "Salvaging Laser": string;
    "Raw Salvaging Laser": string;
    "Force Gun": string;
    "Tesla Gun": string;
    "Lightning Gun": string;
    "Pulse Cannon": string;
    "Point Defense Cannon": string;
    "Point Defense Laser": string;
    "Anti Fighter": string;
}

export interface IIntlComponent {
    "Servo": string;
    "Steel Tube": string;
    "Ammunition S": string;
    "Steel": string;
    "Aluminum": string;
    "Lead": string;
    "Industrial Tesla Coil": string;
    "Electromagnetic Charge": string;
    "Energy Inverter": string;
    "Conductor": string;
    "Power Unit": string;
    "Copper": string;
    "Energy Cell": string;
    "Laser Compressor": string;
    "Laser Modulator": string;
    "High Capacity Lens": string;
    "Rocket": string;
    "High Pressure Tube": string;
    "Fuel": string;
    "Targeting Card": string;
    "Wire": string;
    "Nanobot": string;
    "Transformator": string;
    "Gold": string;
    "Electro Magnet": string;
    "Gauss Rail": string;
    "Laser Head": string;
    "Crystal": string;
    "Plasma Cell": string;
    "Energy Tube": string;
    "Energy Container": string;
    "Military Tesla Coil": string;
    "Force Generator": string;
    "Zinc": string;
    "Warhead": string;
    "Explosive Charge": string;
    "Ammunition M": string;
}

export interface IIntlUI {
    "quantity": string;
    "component": string;
    "components": string;
    "estimated-price": string;
    "estimated-volume": string;
    "estimated-price-info": string;
    "component-source-info": string;
    "dangerous-cargo": string;
    "illegal-cargo": string;
    "please-note": string;
    "cargo-required": string;
    "cargo": string;
    "cargo-field-note": string;
    "cargo-field-label": string;
    "add-turret": string;
    "remove-turret": string;
    "clear-turrets": string;
    "clear-turrets-confirmation": string;
    "turret-price": string;
    "remove-turret-confirmation": string;
    "recipe-for-version": string;
    "theme": string;
    "light-theme": string;
    "dark-theme": string;
    "system-theme": string;
    "language": string;
    "english-language": string;
    "russian-language": string;
    "getting-started-0": string;
    "getting-started-1": string;
    "getting-started-2": string;
    "getting-started-3": string;
    "getting-started-4": string;
    "turret-planner": string;
}

export interface IIntlStorage {
    UI: Record<ILanguage, IIntlUI>;
    TURRET: Record<ILanguage, IIntlTurret>;
    COMPONENT: Record<ILanguage, IIntlComponent>;
    STATION: Record<ILanguage, IIntlStation>;
}