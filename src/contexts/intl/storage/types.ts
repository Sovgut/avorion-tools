import {SellerType} from "@/constants/enums/sellers";
import {TurretType} from "@/constants/enums/turrets";
import {ComponentType} from "@/constants/enums/components";

export type LanguageType = "en-US" | "ru";

export interface IntlSeller {
    [SellerType.TurretFactorySupplier]: string;
    [SellerType.TurretFactory]: string;
    [SellerType.AluminumMine]: string;
    [SellerType.AmmunitionFactory]: string;
    [SellerType.ConductorFactory]: string;
    [SellerType.CopperMine]: string;
    [SellerType.PlanetaryTradingPost]: string;
    [SellerType.CrystalFarm]: string;
    [SellerType.ElectroMagnetFactory]: string;
    [SellerType.ElectromagneticChargeFactory]: string;
    [SellerType.SolarPowerPlant]: string;
    [SellerType.EnergyContainerFactory]: string;
    [SellerType.EnergyInverterFactory]: string;
    [SellerType.EnergyTubeFactory]: string;
    [SellerType.ExplosiveChargeFactory]: string;
    [SellerType.ForceGeneratorFactory]: string;
    [SellerType.FuelFactory]: string;
    [SellerType.GaussRailFactory]: string;
    [SellerType.NobleMetalMine]: string;
    [SellerType.HighCapacityLensFactory]: string;
    [SellerType.HighPressureTubeFactory]: string;
    [SellerType.TeslaCoilFactory]: string;
    [SellerType.LaserCompressorFactory]: string;
    [SellerType.LaserHeadFactory]: string;
    [SellerType.LaserModulatorFactory]: string;
    [SellerType.LeadMine]: string;
    [SellerType.NanobotFactory]: string;
    [SellerType.PlasmaCellFactory]: string;
    [SellerType.PowerUnitFactory]: string;
    [SellerType.RocketFactory]: string;
    [SellerType.ServoFactory]: string;
    [SellerType.SteelFactory]: string;
    [SellerType.SteelTubeFactory]: string;
    [SellerType.ComputerComponentFactory]: string;
    [SellerType.TargetingCardFactory]: string;
    [SellerType.TransformatorFactory]: string;
    [SellerType.WarheadFactory]: string;
    [SellerType.WireManufacturer]: string;
    [SellerType.ZincMine]: string;
}

export interface IntlTurret {
    [TurretType.Chaingun]: string;
    [TurretType.Bolter]: string;
    [TurretType.Laser]: string;
    [TurretType.PlasmaGun]: string;
    [TurretType.Cannon]: string;
    [TurretType.RocketLauncher]: string;
    [TurretType.Railgun]: string;
    [TurretType.Repair]: string;
    [TurretType.MiningLaser]: string;
    [TurretType.RawMiningLaser]: string;
    [TurretType.SalvagingLaser]: string;
    [TurretType.RawSalvagingLaser]: string;
    [TurretType.ForceGun]: string;
    [TurretType.TeslaGun]: string;
    [TurretType.LightningGun]: string;
    [TurretType.PulseCannon]: string;
    [TurretType.PointDefenseCannon]: string;
    [TurretType.PointDefenseLaser]: string;
    [TurretType.AntiFighter]: string;
}

export interface IntlComponent {
    [ComponentType.Servo]: string;
    [ComponentType.SteelTube]: string;
    [ComponentType.AmmunitionS]: string;
    [ComponentType.Steel]: string;
    [ComponentType.Aluminum]: string;
    [ComponentType.Lead]: string;
    [ComponentType.IndustrialTeslaCoil]: string;
    [ComponentType.ElectromagneticCharge]: string;
    [ComponentType.EnergyInverter]: string;
    [ComponentType.Conductor]: string;
    [ComponentType.PowerUnit]: string;
    [ComponentType.Copper]: string;
    [ComponentType.EnergyCell]: string;
    [ComponentType.LaserCompressor]: string;
    [ComponentType.LaserModulator]: string;
    [ComponentType.HighCapacityLens]: string;
    [ComponentType.Rocket]: string;
    [ComponentType.HighPressureTube]: string;
    [ComponentType.Fuel]: string;
    [ComponentType.TargetingCard]: string;
    [ComponentType.Wire]: string;
    [ComponentType.Nanobot]: string;
    [ComponentType.Transformator]: string;
    [ComponentType.Gold]: string;
    [ComponentType.ElectroMagnet]: string;
    [ComponentType.GaussRail]: string;
    [ComponentType.LaserHead]: string;
    [ComponentType.Crystal]: string;
    [ComponentType.PlasmaCell]: string;
    [ComponentType.EnergyTube]: string;
    [ComponentType.EnergyContainer]: string;
    [ComponentType.MilitaryTeslaCoil]: string;
    [ComponentType.ForceGenerator]: string;
    [ComponentType.Zinc]: string;
    [ComponentType.Warhead]: string;
    [ComponentType.ExplosiveCharge]: string;
    [ComponentType.AmmunitionM]: string;
}

export interface IntlUI {
    "cargo-offset": string;
    "guaranteed-in": string;
    "can-be-found-in": string;
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

export interface IntlStorage {
    UI: Record<LanguageType, IntlUI>;
    TURRET: Record<LanguageType, IntlTurret>;
    COMPONENT: Record<LanguageType, IntlComponent>;
    SELLER: Record<LanguageType, IntlSeller>;
}

export interface IntlStorageLabel extends IntlUI, IntlTurret, IntlComponent, IntlSeller {
}