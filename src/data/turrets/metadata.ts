import { Commodity } from "../commodities/enums";
import { Turret } from "./enums";
import { ITurretMetadata } from "./types";

export const TurretMetadata: Record<Turret, ITurretMetadata> = {
    [Turret.Chaingun]: {
        icon: "/img/icon/chaingun.png",
        commodities: [
            Commodity.Servo,
            Commodity.SteelTube,
            Commodity.AmmunitionS,
            Commodity.Steel,
            Commodity.Aluminum,
            Commodity.Lead,
        ]
    },
    [Turret.Bolter]: {
        icon: "/img/icon/bolter.png",
        commodities: [
            Commodity.Servo,
            Commodity.HighPressureTube,
            Commodity.AmmunitionM,
            Commodity.ExplosiveCharge,
            Commodity.Steel,
            Commodity.Aluminum,
        ]
    },
    [Turret.Laser]: {
        icon: "/img/icon/laser-gun.png",
        commodities: [
            Commodity.LaserHead,
            Commodity.LaserCompressor,
            Commodity.HighCapacityLens,
            Commodity.LaserModulator,
            Commodity.PowerUnit,
            Commodity.Steel,
            Commodity.Crystal,
        ]
    },
    [Turret.PlasmaGun]: {
        icon: "/img/icon/plasma-gun.png",
        commodities: [
            Commodity.PlasmaCell,
            Commodity.EnergyTube,
            Commodity.Conductor,
            Commodity.EnergyContainer,
            Commodity.PowerUnit,
            Commodity.Steel,
            Commodity.Crystal,
        ]
    },
    [Turret.Cannon]: {
        icon: "/img/icon/cannon.png",
        commodities: [
            Commodity.Servo,
            Commodity.Warhead,
            Commodity.HighPressureTube,
            Commodity.ExplosiveCharge,
            Commodity.Steel,
            Commodity.Wire,
        ]
    },
    [Turret.RocketLauncher]: {
        icon: "/img/icon/rocket-launcher.png",
        commodities: [
            Commodity.Servo,
            Commodity.Rocket,
            Commodity.HighPressureTube,
            Commodity.Fuel,
            Commodity.TargetingCard,
            Commodity.Steel,
            Commodity.Wire,
        ]
    },
    [Turret.Railgun]: {
        icon: "/img/icon/rail-gun.png",
        commodities: [
            Commodity.Servo,
            Commodity.ElectromagneticCharge,
            Commodity.ElectroMagnet,
            Commodity.GaussRail,
            Commodity.HighPressureTube,
            Commodity.Steel,
            Commodity.Copper,
        ]
    },
    [Turret.Repair]: {
        icon: "/img/icon/repair-beam.png",
        commodities: [
            Commodity.Nanobot,
            Commodity.Transformator,
            Commodity.LaserModulator,
            Commodity.Conductor,
            Commodity.Gold,
            Commodity.Steel,
        ]
    },
    [Turret.MiningLaser]: {
        icon: "/img/icon/mining-laser.png",
        commodities: [
            Commodity.LaserCompressor,
            Commodity.LaserModulator,
            Commodity.HighCapacityLens,
            Commodity.Conductor,
            Commodity.Steel,
        ]
    },
    [Turret.RawMiningLaser]: {
        icon: "/img/icon/r-mining-laser.png",
        commodities: [
            Commodity.LaserCompressor,
            Commodity.LaserModulator,
            Commodity.HighCapacityLens,
            Commodity.Conductor,
            Commodity.Steel,
        ]
    },
    [Turret.SalvagingLaser]: {
        icon: "/img/icon/salvage-laser.png",
        commodities: [
            Commodity.LaserCompressor,
            Commodity.LaserModulator,
            Commodity.HighCapacityLens,
            Commodity.Conductor,
            Commodity.Steel,
        ]
    },
    [Turret.RawSalvagingLaser]: {
        icon: "/img/icon/r-salvaging-laser.png",
        commodities: [
            Commodity.LaserCompressor,
            Commodity.LaserModulator,
            Commodity.HighCapacityLens,
            Commodity.Conductor,
            Commodity.Steel,
        ]
    },
    [Turret.ForceGun]: {
        icon: "/img/icon/force-gun.png",
        commodities: [
            Commodity.ForceGenerator,
            Commodity.EnergyTube,
            Commodity.Conductor,
            Commodity.Steel,
            Commodity.Zinc,
        ]
    },
    [Turret.TeslaGun]: {
        icon: "/img/icon/tesla-gun.png",
        commodities: [
            Commodity.IndustrialTeslaCoil,
            Commodity.ElectromagneticCharge,
            Commodity.EnergyInverter,
            Commodity.Conductor,
            Commodity.PowerUnit,
            Commodity.Copper,
            Commodity.EnergyCell,
        ]
    },
    [Turret.LightningGun]: {
        icon: "/img/icon/lightning-gun.png",
        commodities: [
            Commodity.MilitaryTeslaCoil,
            Commodity.HighCapacityLens,
            Commodity.ElectromagneticCharge,
            Commodity.Conductor,
            Commodity.PowerUnit,
            Commodity.Copper,
            Commodity.EnergyCell,
        ]
    },
    [Turret.PulseCannon]: {
        icon: "/img/icon/pulsecannon.png",
        commodities: [
            Commodity.Servo,
            Commodity.SteelTube,
            Commodity.AmmunitionS,
            Commodity.Steel,
            Commodity.Copper,
            Commodity.EnergyCell,
        ]
    },
    [Turret.PointDefenseCannon]: {
        icon: "/img/icon/point-defense-chaingun.png",
        commodities: [
            Commodity.Servo,
            Commodity.SteelTube,
            Commodity.AmmunitionS,
            Commodity.Steel,
            Commodity.Aluminum,
            Commodity.Lead,
        ]
    },
    [Turret.PointDefenseLaser]: {
        icon: "/img/icon/point-defense-laser.png",
        commodities: [
            Commodity.Servo,
            Commodity.LaserHead,
            Commodity.LaserCompressor,
            Commodity.HighCapacityLens,
            Commodity.LaserModulator,
            Commodity.Steel,
            Commodity.Crystal,
        ]
    },
    [Turret.AntiFighter]: {
        icon: "/img/icon/anti-fighter-gun.png",
        commodities: [
            Commodity.Servo,
            Commodity.HighPressureTube,
            Commodity.AmmunitionM,
            Commodity.ExplosiveCharge,
            Commodity.Steel,
            Commodity.Aluminum,
        ]
    }
}