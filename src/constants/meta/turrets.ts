import {TurretType} from "@/constants/enums/turrets";
import {ComponentType} from "@/constants/enums/components";
import {TurretMetaType} from "@/types";

export const TurretsMeta: Record<TurretType, TurretMetaType> = {
    [TurretType.Chaingun]: {
        icon: "/assets/img/chaingun.png",
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
        icon: "/assets/img/bolter.png",
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
        icon: "/assets/img/laser-gun.png",
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
        icon: "/assets/img/plasma-gun.png",
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
        icon: "/assets/img/cannon.png",
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
        icon: "/assets/img/rocket-launcher.png",
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
        icon: "/assets/img/rail-gun.png",
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
        icon: "/assets/img/repair-beam.png",
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
        icon: "/assets/img/mining-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.RawMiningLaser]: {
        icon: "/assets/img/r-mining-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.SalvagingLaser]: {
        icon: "/assets/img/salvage-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.RawSalvagingLaser]: {
        icon: "/assets/img/r-salvaging-laser.png",
        components: [
            ComponentType.LaserCompressor,
            ComponentType.LaserModulator,
            ComponentType.HighCapacityLens,
            ComponentType.Conductor,
            ComponentType.Steel,
        ]
    },
    [TurretType.ForceGun]: {
        icon: "/assets/img/force-gun.png",
        components: [
            ComponentType.ForceGenerator,
            ComponentType.EnergyTube,
            ComponentType.Conductor,
            ComponentType.Steel,
            ComponentType.Zinc,
        ]
    },
    [TurretType.TeslaGun]: {
        icon: "/assets/img/tesla-gun.png",
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
        icon: "/assets/img/lightning-gun.png",
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
        icon: "/assets/img/pulsecannon.png",
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
        icon: "/assets/img/point-defense-chaingun.png",
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
        icon: "/assets/img/point-defense-laser.png",
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
        icon: "/assets/img/anti-fighter-gun.png",
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