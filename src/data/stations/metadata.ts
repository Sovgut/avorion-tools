import { Commodity } from "../commodities/enums";
import { Station } from "./enums";
import { IStationMetadata } from "./types";

export const StationMetadata: Record<Station, IStationMetadata> = {
    [Station.IceMine]: {
        link: "https://avorion.fandom.com/wiki/Ice_Mine",
        variations: [
            {
                cost: 7750000,
                ingredients: [],
                results: [
                    [Commodity.Water, 75]
                ],
                requiredPC: 100,
                profitPerCycle: 1500,
                ROICycles: 5167
            }
        ]
    },
    [Station.AluminumMine]: {
        link: "https://avorion.fandom.com/wiki/Aluminum_Mine",
        variations: [
            {
                cost: 9500000,
                ingredients: [],
                results: [
                    [Commodity.Aluminum, 10]
                ],
                requiredPC: 134,
                profitPerCycle: 2000,
                ROICycles: 4750
            }
        ]
    },
    [Station.NobleMetalMine]: {
        link: "https://avorion.fandom.com/wiki/Noble_Metal_Mine",
        variations: [
            {
                cost: 7225000,
                ingredients: [],
                results: [
                    [Commodity.Gold, 1],
                    [Commodity.Platinum, 1],
                ],
                requiredPC: 90,
                profitPerCycle: 1350,
                ROICycles: 5352
            },
            {
                cost: 6175000,
                ingredients: [],
                results: [
                    [Commodity.Silver, 1],
                    [Commodity.Platinum, 1],
                ],
                requiredPC: 70,
                profitPerCycle: 1050,
                ROICycles: 5881
            },
            {
                cost: 5650000,
                ingredients: [],
                results: [
                    [Commodity.Silver, 1],
                    [Commodity.Gold, 1],
                ],
                requiredPC: 60,
                profitPerCycle: 900,
                ROICycles: 6278
            },
        ]
    },
    [Station.OilRig]: {
        link: "https://avorion.fandom.com/wiki/Oil_Rig",
        variations: [
            {
                cost: 5125000,
                ingredients: [],
                results: [
                    [Commodity.RawOil, 5]
                ],
                requiredPC: 50,
                profitPerCycle: 750,
                ROICycles: 6834
            }
        ]
    },
    [Station.CoalMine]: {
        link: "https://avorion.fandom.com/wiki/Coal_Mine",
        variations: [
            {
                cost: 5300000,
                ingredients: [],
                results: [
                    [Commodity.Coal, 4]
                ],
                requiredPC: 54,
                profitPerCycle: 800,
                ROICycles: 6625
            }
        ]
    },
    [Station.OreMine]: {
        link: "https://avorion.fandom.com/wiki/Ore_Mine",
        variations: [
            {
                cost: 9850000,
                ingredients: [],
                results: [
                    [Commodity.Ore, 30]
                ],
                requiredPC: 140,
                profitPerCycle: 2100,
                ROICycles: 4691
            }
        ]
    },
    [Station.SiliconMine]: {
        link: "https://avorion.fandom.com/wiki/Silicon_Mine",
        variations: [
            {
                cost: 9500000,
                ingredients: [],
                results: [
                    [Commodity.Silicon, 4]
                ],
                requiredPC: 134,
                profitPerCycle: 2000,
                ROICycles: 4750
            }
        ]
    },
    [Station.AcceleratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Accelerator_Factory"  
    },
    [Station.TurretFactorySupplier]: {
        link: "https://avorion.fandom.com/wiki/Turret_Factory_Supplier"
    },
    [Station.TurretFactory]: {
        link: "https://avorion.fandom.com/wiki/Turret_Factory"
    },
    [Station.AmmunitionFactory]: {
        link: "https://avorion.fandom.com/wiki/Ammunition_Factory"
    },
    [Station.ConductorFactory]: {
        link: "https://avorion.fandom.com/wiki/Conductor_Factory"
    },
    [Station.CopperMine]: {
        link: "https://avorion.fandom.com/wiki/Copper_Mine",
        variations: [
            {
                cost: 8625000,
                ingredients: [],
                results: [
                    [Commodity.Copper, 5]
                ],
                requiredPC: 117,
                profitPerCycle: 1750,
                ROICycles: 4929
            }
        ]
    },
    [Station.PlanetaryTradingPost]: {
        link: "https://avorion.fandom.com/wiki/Planetary_Trading_Post"
    },
    [Station.CrystalFarm]: {
        link: "https://avorion.fandom.com/wiki/Crystal_Farm"
    },
    [Station.ElectroMagnetFactory]: {
        link: "https://avorion.fandom.com/wiki/Electro_Magnet_Factory"
    },
    [Station.ElectromagneticChargeFactory]: {
        link: "https://avorion.fandom.com/wiki/Electromagnetic_Charge_Factory"
    },
    [Station.SolarPowerPlant]: {
        link: "https://avorion.fandom.com/wiki/Solar_Power_Plant"
    },
    [Station.EnergyContainerFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Container_Factory"
    },
    [Station.EnergyInverterFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Inverter_Factory"
    },
    [Station.EnergyTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Tube_Factory"
    },
    [Station.ExplosiveChargeFactory]: {
        link: "https://avorion.fandom.com/wiki/Explosive_Charge_Factory"
    },
    [Station.ForceGeneratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Force_Generator_Factory"
    },
    [Station.FuelFactory]: {
        link: "https://avorion.fandom.com/wiki/Fuel_Factory"
    },
    [Station.GaussRailFactory]: {
        link: "https://avorion.fandom.com/wiki/Gauss_Rail_Factory"
    },
    [Station.HighCapacityLensFactory]: {
        link: "https://avorion.fandom.com/wiki/High_Capacity_Lens_Factory"
    },
    [Station.HighPressureTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/High_Pressure_Tube_Factory"
    },
    [Station.TeslaCoilFactory]: {
        link: "https://avorion.fandom.com/wiki/Tesla_Coil_Factory"
    },
    [Station.LaserCompressorFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Compressor_Factory"
    },
    [Station.LaserHeadFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Head_Factory"
    },
    [Station.LaserModulatorFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Modulator_Factory"
    },
    [Station.LeadMine]: {
        link: "https://avorion.fandom.com/wiki/Lead_Mine",
        variations: [
            {
                cost: 9500000,
                ingredients: [],
                results: [
                    [Commodity.Lead, 10]
                ],
                requiredPC: 134,
                profitPerCycle: 2000,
                ROICycles: 4750
            }
        ]
    },
    [Station.NanobotFactory]: {
        link: "https://avorion.fandom.com/wiki/Nanobot_Factory"
    },
    [Station.PlasmaCellFactory]: {
        link: "https://avorion.fandom.com/wiki/Plasma_Cell_Factory"
    },
    [Station.PowerUnitFactory]: {
        link: "https://avorion.fandom.com/wiki/Power_Unit_Factory"
    },
    [Station.RocketFactory]: {
        link: "https://avorion.fandom.com/wiki/Rocket_Factory"
    },
    [Station.ServoFactory]: {
        link: "https://avorion.fandom.com/wiki/Servo_Factory"
    },
    [Station.SteelFactory]: {
        link: "https://avorion.fandom.com/wiki/Steel_Factory"
    },
    [Station.SteelTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/Steel_Tube_Factory"
    },
    [Station.ComputerComponentFactory]: {
        link: "https://avorion.fandom.com/wiki/Computer_Component_Factory"
    },
    [Station.TargetingCardFactory]: {
        link: "https://avorion.fandom.com/wiki/Targeting_Card_Factory"
    },
    [Station.TransformatorFactory]: {
        link: "https://avorion.fandom.com/wiki/Transformator_Factory"
    },
    [Station.WarheadFactory]: {
        link: "https://avorion.fandom.com/wiki/Warhead_Factory"
    },
    [Station.WireManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Wire_Manufacturer"
    },
    [Station.ZincMine]: {
        link: "https://avorion.fandom.com/wiki/Zinc_Mine",
        variations: [
            {
                cost: 11250000,
                ingredients: [],
                results: [
                    [Commodity.Zinc, 10]
                ],
                requiredPC: 167,
                profitPerCycle: 2500,
                ROICycles: 4500
            }
        ]
    },
}