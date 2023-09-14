import {TurretType} from "~constants/enums/turrets";
import {ComponentType} from "~constants/enums/components";
import {TurretMetaType} from "~types";

export const TurretsMeta: Record<TurretType, TurretMetaType> = {
    [TurretType.Chaingun]: {
        icon: "/img/icon/chaingun.png",
        components: [
            ComponentType.Servo,
            ComponentType.SteelTube,
            ComponentType.AmmunitionS,
            ComponentType.Steel,
            ComponentType.Aluminum,
            ComponentType.Lead,
        ]
    },
    [TurretType.Bolter]: {
        icon: "/img/icon/bolter.png",
        components: [
            ComponentType.Servo,
            ComponentType.HighPressureTube,
            ComponentType.AmmunitionM,
            ComponentType.ExplosiveCharge,
            ComponentType.Steel,
            ComponentType.Aluminum,
        ]
    },
    [TurretType.Laser]: {
        icon: "/img/icon/laser-gun.png",
        components: [
            ComponentType.LaserHead,
            ComponentType.LaserCompressor,
            ComponentType.HighCapacityLens,
            ComponentType.LaserModulator,
            ComponentType.PowerUnit,
            ComponentType.Steel,
            ComponentType.Crystal,
        ]
    },
    [TurretType.PlasmaGun]: {
        icon: "/img/icon/plasma-gun.png",
        components: [
            ComponentType.PlasmaCell,
            ComponentType.EnergyTube,
            ComponentType.Conductor,
            ComponentType.EnergyContainer,
            ComponentType.PowerUnit,
            ComponentType.Steel,
            ComponentType.Crystal,
        ]
    },
    [TurretType.Cannon]: {
        icon: "/img/icon/cannon.png",
        components: [
            ComponentType.Servo,
            ComponentType.Warhead,
            ComponentType.HighPressureTube,
            ComponentType.ExplosiveCharge,
            ComponentType.Steel,
            ComponentType.Wire,
        ]
    },
    [TurretType.RocketLauncher]: {
        icon: "/img/icon/rocket-launcher.png",
        components: [
            ComponentType.Servo,
            ComponentType.Rocket,
            ComponentType.HighPressureTube,
            ComponentType.Fuel,
            ComponentType.TargetingCard,
            ComponentType.Steel,
            ComponentType.Wire,
        ]
    },
    [TurretType.Railgun]: {
        icon: "/img/icon/rail-gun.png",
        components: [
            ComponentType.Servo,
            ComponentType.ElectromagneticCharge,
            ComponentType.ElectroMagnet,
            ComponentType.GaussRail,
            ComponentType.HighPressureTube,
            ComponentType.Steel,
            ComponentType.Copper,
        ]
    },
    [TurretType.Repair]: {
        icon: "/img/icon/repair-beam.png",
        components: [
            ComponentType.Nanobot,
            ComponentType.Transformator,
            ComponentType.LaserModulator,
            ComponentType.Conductor,
            ComponentType.Gold,
            ComponentType.Steel,
        ]
    },
    [TurretType.MiningLaser]: {
        icon: "/img/icon/mining-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.RawMiningLaser]: {
        icon: "/img/icon/r-mining-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.SalvagingLaser]: {
        icon: "/img/icon/salvage-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.RawSalvagingLaser]: {
        icon: "/img/icon/r-salvaging-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.ForceGun]: {
        icon: "/img/icon/force-gun.png",
        components: [
            ComponentType.ForceGenerator,
            ComponentType.EnergyTube,
            ComponentType.Conductor,
            ComponentType.Steel,
            ComponentType.Zinc,
        ]
    },
    [TurretType.TeslaGun]: {
        icon: "/img/icon/tesla-gun.png",
        components: [
            ComponentType.IndustrialTeslaCoil,
            ComponentType.ElectromagneticCharge,
            ComponentType.EnergyInverter,
            ComponentType.Conductor,
            ComponentType.PowerUnit,
            ComponentType.Copper,
            ComponentType.EnergyCell,
        ]
    },
    [TurretType.LightningGun]: {
        icon: "/img/icon/lightning-gun.png",
        components: [
            ComponentType.MilitaryTeslaCoil,
            ComponentType.HighCapacityLens,
            ComponentType.ElectromagneticCharge,
            ComponentType.Conductor,
            ComponentType.PowerUnit,
            ComponentType.Copper,
            ComponentType.EnergyCell,
        ]
    },
    [TurretType.PulseCannon]: {
        icon: "/img/icon/pulsecannon.png",
        components: [
            ComponentType.Servo,
            ComponentType.SteelTube,
            ComponentType.AmmunitionS,
            ComponentType.Steel,
            ComponentType.Copper,
            ComponentType.EnergyCell,
        ]
    },
    [TurretType.PointDefenseCannon]: {
        icon: "/img/icon/point-defense-chaingun.png",
        components: [
            ComponentType.Servo,
            ComponentType.SteelTube,
            ComponentType.AmmunitionS,
            ComponentType.Steel,
            ComponentType.Aluminum,
            ComponentType.Lead,
        ]
    },
    [TurretType.PointDefenseLaser]: {
        icon: "/img/icon/point-defense-laser.png",
        components: [
            ComponentType.Servo,
            ComponentType.LaserHead,
            ComponentType.LaserCompressor,
            ComponentType.HighCapacityLens,
            ComponentType.LaserModulator,
            ComponentType.Steel,
            ComponentType.Crystal,
        ]
    },
    [TurretType.AntiFighter]: {
        icon: "/img/icon/anti-fighter-gun.png",
        components: [
            ComponentType.Servo,
            ComponentType.HighPressureTube,
            ComponentType.AmmunitionM,
            ComponentType.ExplosiveCharge,
            ComponentType.Steel,
            ComponentType.Aluminum,
        ]
    }
}