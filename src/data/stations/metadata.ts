import { Commodity } from "../commodities/enums";
import { Station } from "./enums";
import { IStationMetadata } from "./types";

export const StationMetadata: Record<Station, IStationMetadata> = {
  [Station.TravelHub]: {
    link: "https://avorion.fandom.com/wiki/Travel_Hub",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Turbine, amount: Infinity },
          { type: Commodity.NeutronAccelerator, amount: Infinity },
          { type: Commodity.ElectronAccelerator, amount: Infinity },
          { type: Commodity.ProtonAccelerator, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.ForceGenerator, amount: Infinity },
          { type: Commodity.PlasmaCell, amount: Infinity },
          { type: Commodity.EnergyCell, amount: Infinity },
          { type: Commodity.FusionCore, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.RiftResearchStation]: {
    link: "https://avorion.fandom.com/wiki/Rift_Research_Station",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.RiftResearchData, amount: Infinity },
          { type: Commodity.Turbine, amount: Infinity },
          { type: Commodity.HighCapacityLens, amount: Infinity },
          { type: Commodity.NeutronAccelerator, amount: Infinity },
          { type: Commodity.ElectronAccelerator, amount: Infinity },
          { type: Commodity.ProtonAccelerator, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.AntigravGenerator, amount: Infinity },
          { type: Commodity.ForceGenerator, amount: Infinity },
          { type: Commodity.Teleporter, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
          { type: Commodity.Satellite, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.ResearchStation]: {
    link: "https://avorion.fandom.com/wiki/Research_Station",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Turbine, amount: Infinity },
          { type: Commodity.HighCapacityLens, amount: Infinity },
          { type: Commodity.NeutronAccelerator, amount: Infinity },
          { type: Commodity.ElectronAccelerator, amount: Infinity },
          { type: Commodity.ProtonAccelerator, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.AntigravGenerator, amount: Infinity },
          { type: Commodity.ForceGenerator, amount: Infinity },
          { type: Commodity.Teleporter, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
          { type: Commodity.Satellite, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.MilitaryOutpost]: {
    link: "https://avorion.fandom.com/wiki/Military_Outpost",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.WarRobot, amount: Infinity },
          { type: Commodity.BodyArmor, amount: Infinity },
          { type: Commodity.Vehicle, amount: Infinity },
          { type: Commodity.Gun, amount: Infinity },
          { type: Commodity.Ammunition, amount: Infinity },
          { type: Commodity.AmmunitionS, amount: Infinity },
          { type: Commodity.AmmunitionM, amount: Infinity },
          { type: Commodity.AmmunitionL, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.ExplosiveCharge, amount: Infinity },
          { type: Commodity.ElectromagneticCharge, amount: Infinity },
          { type: Commodity.FoodBar, amount: Infinity },
          { type: Commodity.TargetingSystem, amount: Infinity },
          { type: Commodity.MilitaryTeslaCoil, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.RepairDock]: {
    link: "https://avorion.fandom.com/wiki/Repair_Dock",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Fuel, amount: Infinity },
          { type: Commodity.Steel, amount: Infinity },
          { type: Commodity.Wire, amount: Infinity },
          { type: Commodity.MetalPlate, amount: Infinity },
          { type: Commodity.Nanobot, amount: Infinity },
          { type: Commodity.SolarCell, amount: Infinity },
          { type: Commodity.SolarPanel, amount: Infinity },
          { type: Commodity.Oxygen, amount: Infinity },
          { type: Commodity.ForceGenerator, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.Shipyard]: {
    link: "https://avorion.fandom.com/wiki/Shipyard",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.EnergyTube, amount: Infinity },
          { type: Commodity.Aluminum, amount: Infinity },
          { type: Commodity.Display, amount: Infinity },
          { type: Commodity.MetalPlate, amount: Infinity },
          { type: Commodity.FusionCore, amount: Infinity },
          { type: Commodity.ComputationMainframe, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.IndustrialTeslaCoil, amount: Infinity },
          { type: Commodity.AntigravGenerator, amount: Infinity },
          { type: Commodity.Turbine, amount: Infinity },
          { type: Commodity.EnergyContainer, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.EquipmentDock]: {
    link: "https://avorion.fandom.com/wiki/Equipment_Dock",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Fuel, amount: Infinity },
          { type: Commodity.Rocket, amount: Infinity },
          { type: Commodity.Tools, amount: Infinity },
          { type: Commodity.LaserCompressor, amount: Infinity },
          { type: Commodity.LaserHead, amount: Infinity },
          { type: Commodity.FusionCore, amount: Infinity },
          { type: Commodity.Warhead, amount: Infinity },
          { type: Commodity.Satellite, amount: Infinity },
          { type: Commodity.Drone, amount: Infinity },
          { type: Commodity.AntigravGenerator, amount: Infinity },
          { type: Commodity.Ammunition, amount: Infinity },
          { type: Commodity.AmmunitionS, amount: Infinity },
          { type: Commodity.AmmunitionM, amount: Infinity },
          { type: Commodity.AmmunitionL, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.Habitat]: {
    link: "https://avorion.fandom.com/wiki/Habitat",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Beer, amount: Infinity },
          { type: Commodity.Wine, amount: Infinity },
          { type: Commodity.Liquor, amount: Infinity },
          { type: Commodity.Food, amount: Infinity },
          { type: Commodity.Tea, amount: Infinity },
          { type: Commodity.LuxuryFood, amount: Infinity },
          { type: Commodity.Spices, amount: Infinity },
          { type: Commodity.Vegetable, amount: Infinity },
          { type: Commodity.Fruit, amount: Infinity },
          { type: Commodity.Cocoa, amount: Infinity },
          { type: Commodity.Coffee, amount: Infinity },
          { type: Commodity.Wood, amount: Infinity },
          { type: Commodity.Meat, amount: Infinity },
          { type: Commodity.Water, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.Casino]: {
    link: "https://avorion.fandom.com/wiki/Casino",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Beer, amount: Infinity },
          { type: Commodity.Wine, amount: Infinity },
          { type: Commodity.Liquor, amount: Infinity },
          { type: Commodity.Food, amount: Infinity },
          { type: Commodity.LuxuryFood, amount: Infinity },
          { type: Commodity.Water, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.Biotope]: {
    link: "https://avorion.fandom.com/wiki/Biotope",
    variations: [
      {
        isConsumer: true,
        ingredients: [
          { type: Commodity.Food, amount: Infinity },
          { type: Commodity.FoodBar, amount: Infinity },
          { type: Commodity.Fungus, amount: Infinity },
          { type: Commodity.Wood, amount: Infinity },
          { type: Commodity.Glass, amount: Infinity },
          { type: Commodity.Sheep, amount: Infinity },
          { type: Commodity.Cattle, amount: Infinity },
          { type: Commodity.Wheat, amount: Infinity },
          { type: Commodity.Corn, amount: Infinity },
          { type: Commodity.Rice, amount: Infinity },
          { type: Commodity.Vegetable, amount: Infinity },
          { type: Commodity.Water, amount: Infinity },
          { type: Commodity.Coal, amount: Infinity },
        ],
        results: [],
      },
    ],
  },
  [Station.Sector]: {
    link: "https://avorion.fandom.com/wiki/Sector",
    variations: [],
  },
  [Station.Rift]: {
    link: "https://avorion.fandom.com/wiki/Rifts",
    variations: [],
  },
  [Station.Hideout]: {
    link: "https://avorion.fandom.com/wiki/Station",
    variations: [],
  },
  [Station.WoodFarm]: {
    link: "https://avorion.fandom.com/wiki/Wood_Farm",
    variations: [
      {
        cost: 4075000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 3, isOptional: true },
          { type: Commodity.Water, amount: 75 },
        ],
        results: [
          { type: Commodity.Wood, amount: 6 },
          { type: Commodity.Oxygen, amount: 3, isOptional: true },
        ],
        requiredPC: 156,
        profitPerCycle: 840,
        ROICycles: 4852,
      },
    ],
  },
  [Station.WineFactory]: {
    link: "https://avorion.fandom.com/wiki/Wine_Factory",
    variations: [
      {
        cost: 7015000,
        ingredients: [
          { type: Commodity.Fruit, amount: 50 },
          { type: Commodity.Fungus, amount: 10 },
        ],
        results: [{ type: Commodity.Wine, amount: 25 }],
        requiredPC: 292,
        profitPerCycle: 1290,
        ROICycles: 5438,
      },
    ],
  },
  [Station.WheatFarm]: {
    link: "https://avorion.fandom.com/wiki/Wheat_Farm",
    variations: [
      {
        cost: 2864000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 40 },
        ],
        results: [
          { type: Commodity.Wheat, amount: 48 },
          { type: Commodity.Oxygen, amount: 4, isOptional: true },
        ],
        requiredPC: 95,
        profitPerCycle: 624,
        ROICycles: 4590,
      },
    ],
  },
  [Station.WaterCollector]: {
    link: "https://avorion.fandom.com/wiki/Water_Collector",
    variations: [
      {
        cost: 7750000,
        ingredients: [],
        results: [{ type: Commodity.Water, amount: 75 }],
        requiredPC: 100,
        profitPerCycle: 1500,
        ROICycles: 5167,
      },
    ],
  },
  [Station.WarRobotFactory]: {
    link: "https://avorion.fandom.com/wiki/War_Robot_Factory",
    variations: [
      {
        cost: 94683000,
        ingredients: [
          { type: Commodity.PowerUnit, amount: 1 },
          { type: Commodity.Processor, amount: 1 },
          { type: Commodity.Display, amount: 1 },
          { type: Commodity.Nanobot, amount: 5 },
          { type: Commodity.Gun, amount: 2 },
          { type: Commodity.Teleporter, amount: 1 },
          { type: Commodity.Coolant, amount: 1 },
        ],
        results: [
          { type: Commodity.WarRobot, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 5883,
        profitPerCycle: 26363,
        ROICycles: 3592,
      },
    ],
  },
  [Station.VehicleFactory]: {
    link: "https://avorion.fandom.com/wiki/Vehicle_Factory",
    variations: [
      {
        cost: 79584000,
        ingredients: [
          { type: Commodity.Rubber, amount: 1 },
          { type: Commodity.PowerUnit, amount: 1 },
          { type: Commodity.EnergyGenerator, amount: 1 },
          { type: Commodity.MetalPlate, amount: 5 },
          { type: Commodity.AntigravUnit, amount: 1 },
          { type: Commodity.Display, amount: 1 },
        ],
        results: [
          { type: Commodity.Vehicle, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 4944,
        profitPerCycle: 22049,
        ROICycles: 3610,
      },
    ],
  },
  [Station.VegetableFarm]: {
    link: "https://avorion.fandom.com/wiki/Vegetable_Farm",
    variations: [
      {
        cost: 2920000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 40 },
        ],
        results: [
          { type: Commodity.Vegetable, amount: 35 },
          { type: Commodity.Oxygen, amount: 4 },
        ],
        requiredPC: 96,
        profitPerCycle: 640,
        ROICycles: 4563,
      },
    ],
  },
  [Station.TurbineFactory]: {
    link: "https://avorion.fandom.com/wiki/Turbine_Factory",
    variations: [
      {
        cost: 19240500,
        ingredients: [
          { type: Commodity.Servo, amount: 4 },
          { type: Commodity.Steel, amount: 10 },
          { type: Commodity.Coolant, amount: 3 },
          { type: Commodity.PowerUnit, amount: 2 },
        ],
        results: [{ type: Commodity.Turbine, amount: 1 }],
        requiredPC: 1053,
        profitPerCycle: 4783,
        ROICycles: 4023,
      },
    ],
  },
  [Station.TeleporterFactory]: {
    link: "https://avorion.fandom.com/wiki/Teleporter_Factory",
    variations: [
      {
        cost: 41861000,
        ingredients: [
          { type: Commodity.MetalPlate, amount: 1 },
          { type: Commodity.PowerUnit, amount: 1 },
          { type: Commodity.AntigravUnit, amount: 1 },
          { type: Commodity.PlasmaCell, amount: 2 },
          { type: Commodity.Conductor, amount: 1 },
          { type: Commodity.Transformator, amount: 1 },
        ],
        results: [
          { type: Commodity.Teleporter, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 2525,
        profitPerCycle: 11271,
        ROICycles: 3715,
      },
    ],
  },
  [Station.TeaFarm]: {
    link: "https://avorion.fandom.com/wiki/Tea_Farm",
    variations: [
      {
        cost: 4512500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 100 },
        ],
        results: [
          { type: Commodity.Tea, amount: 75 },
          { type: Commodity.Oxygen, amount: 4, isOptional: true },
        ],
        requiredPC: 206,
        profitPerCycle: 1095,
        ROICycles: 4122,
      },
    ],
  },
  [Station.TargetingSystemFactory]: {
    link: "https://avorion.fandom.com/wiki/Targeting_System_Factory",
    variations: [
      {
        cost: 32173000,
        ingredients: [
          { type: Commodity.TargetingCard, amount: 1 },
          { type: Commodity.Processor, amount: 1 },
          { type: Commodity.EnergyCell, amount: 3 },
          { type: Commodity.Conductor, amount: 5 },
          { type: Commodity.Wire, amount: 5 },
        ],
        results: [{ type: Commodity.TargetingSystem, amount: 1 }],
        requiredPC: 1832,
        profitPerCycle: 8478,
        ROICycles: 3795,
      },
    ],
  },
  [Station.SpicesFarm]: {
    link: "https://avorion.fandom.com/wiki/Spices_Farm",
    variations: [
      {
        cost: 5548500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Water, amount: 35 },
          { type: Commodity.Fertilizer, amount: 5 },
        ],
        results: [
          { type: Commodity.Spices, amount: 12 },
          { type: Commodity.Oxygen, amount: 1, isOptional: true },
        ],
        requiredPC: 215,
        profitPerCycle: 1001,
        ROICycles: 5543,
      },
    ],
  },
  [Station.SolarPanelFactory]: {
    link: "https://avorion.fandom.com/wiki/Solar_Panel_Factory",
    variations: [
      {
        cost: 9356500,
        ingredients: [
          { type: Commodity.SolarCell, amount: 10 },
          { type: Commodity.Transformator, amount: 1 },
        ],
        results: [{ type: Commodity.SolarPanel, amount: 1 }],
        requiredPC: 436,
        profitPerCycle: 1959,
        ROICycles: 4777,
      },
    ],
  },
  [Station.SheepRanch]: {
    link: "https://avorion.fandom.com/wiki/Sheep_Ranch",
    variations: [
      {
        cost: 4631500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 2, isOptional: true },
          { type: Commodity.Oxygen, amount: 10 },
          { type: Commodity.Wheat, amount: 18 },
          { type: Commodity.Water, amount: 12 },
        ],
        results: [
          { type: Commodity.Sheep, amount: 15 },
          { type: Commodity.BioGas, amount: 1 },
          { type: Commodity.Fabric, amount: 2, isOptional: true },
        ],
        requiredPC: 153,
        profitPerCycle: 891,
        ROICycles: 5199,
      },
      {
        cost: 4715500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Corn, amount: 10 },
          { type: Commodity.Oxygen, amount: 10 },
          { type: Commodity.Water, amount: 20 },
        ],
        results: [
          { type: Commodity.Sheep, amount: 15 },
          { type: Commodity.BioGas, amount: 1 },
          { type: Commodity.Fabric, amount: 2, isOptional: true },
        ],
        requiredPC: 153,
        profitPerCycle: 865,
        ROICycles: 5452,
      },
    ],
  },
  [Station.SatelliteFactory]: {
    link: "https://avorion.fandom.com/wiki/Satellite_Factory",
    variations: [
      {
        cost: 68212500,
        ingredients: [
          { type: Commodity.SolarPanel, amount: 2 },
          { type: Commodity.Processor, amount: 2 },
          { type: Commodity.Display, amount: 2 },
          { type: Commodity.EnergyContainer, amount: 1 },
          { type: Commodity.SteelTube, amount: 1 },
        ],
        results: [
          { type: Commodity.Satellite, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 4235,
        profitPerCycle: 18800,
        ROICycles: 3629,
      },
    ],
  },
  [Station.RiceFarm]: {
    link: "https://avorion.fandom.com/wiki/Rice_Farm",
    variations: [
      {
        cost: 2990000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 40 },
        ],
        results: [
          { type: Commodity.Rice, amount: 76 },
          { type: Commodity.Oxygen, amount: 4, isOptional: true },
        ],
        requiredPC: 97,
        profitPerCycle: 660,
        ROICycles: 4531,
      },
    ],
  },
  [Station.ProteinFactory]: {
    link: "https://avorion.fandom.com/wiki/Protein_Factory",
    variations: [
      {
        cost: 5842500,
        ingredients: [
          { type: Commodity.Meat, amount: 25 },
          { type: Commodity.Dairy, amount: 80 },
        ],
        results: [{ type: Commodity.Protein, amount: 100 }],
        requiredPC: 218,
        profitPerCycle: 955,
        ROICycles: 6118,
      },
    ],
  },
  [Station.ProcessorFactory]: {
    link: "https://avorion.fandom.com/wiki/Processor_Factory",
    variations: [
      {
        cost: 31049500,
        ingredients: [
          { type: Commodity.Microchip, amount: 7 },
          { type: Commodity.SemiConductor, amount: 5 },
          { type: Commodity.Copper, amount: 5 },
          { type: Commodity.Platinum, amount: 5 },
          { type: Commodity.Gold, amount: 5 },
        ],
        results: [{ type: Commodity.Processor, amount: 3 }],
        requiredPC: 1483,
        profitPerCycle: 8157,
        ROICycles: 3807,
      },
    ],
  },
  [Station.PotatoFarm]: {
    link: "https://avorion.fandom.com/wiki/Potato_Farm",
    variations: [
      {
        cost: 2290000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 6, isOptional: true },
          { type: Commodity.Water, amount: 30 },
        ],
        results: [
          { type: Commodity.Potato, amount: 35 },
          { type: Commodity.Oxygen, amount: 8, isOptional: true },
        ],
        requiredPC: 99,
        profitPerCycle: 880,
        ROICycles: 2603,
      },
    ],
  },
  [Station.PlantFarm]: {
    link: "https://avorion.fandom.com/wiki/Plant_Farm",
    variations: [
      {
        cost: 2290000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 6, isOptional: true },
          { type: Commodity.Water, amount: 30 },
        ],
        results: [
          { type: Commodity.Plant, amount: 60 },
          { type: Commodity.Oxygen, amount: 6, isOptional: true },
        ],
        requiredPC: 88,
        profitPerCycle: 720,
        ROICycles: 3181,
      },
    ],
  },
  [Station.PlanktonCollector]: {
    link: "https://avorion.fandom.com/wiki/Plankton_Collector",
    variations: [
      {
        cost: 8625000,
        ingredients: [],
        results: [{ type: Commodity.Plankton, amount: 35 }],
        requiredPC: 117,
        profitPerCycle: 1750,
        ROICycles: 4929,
      },
    ],
  },
  [Station.PaperFactory]: {
    link: "https://avorion.fandom.com/wiki/Paper_Factory",
    variations: [
      {
        cost: 4390000,
        ingredients: [
          { type: Commodity.Water, amount: 10 },
          { type: Commodity.Wood, amount: 2 },
        ],
        results: [{ type: Commodity.Paper, amount: 40 }],
        requiredPC: 121,
        profitPerCycle: 540,
        ROICycles: 8130,
      },
    ],
  },
  [Station.PaintManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Paint_Manufacturer",
    variations: [
      {
        cost: 4911500,
        ingredients: [
          { type: Commodity.Oil, amount: 1 },
          { type: Commodity.Water, amount: 1 },
          { type: Commodity.Chemicals, amount: 1 },
          { type: Commodity.Solvent, amount: 1 },
          { type: Commodity.Acid, amount: 1 },
        ],
        results: [
          { type: Commodity.Paint, amount: 5 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 159,
        profitPerCycle: 689,
        ROICycles: 7129,
      },
    ],
  },
  [Station.MiningRobotFactory]: {
    link: "https://avorion.fandom.com/wiki/Mining_Robot_Factory",
    variations: [
      {
        cost: 148474500,
        ingredients: [
          { type: Commodity.PowerUnit, amount: 1 },
          { type: Commodity.Processor, amount: 1 },
          { type: Commodity.Display, amount: 1 },
          { type: Commodity.Nanobot, amount: 5 },
          { type: Commodity.Drill, amount: 2 },
          { type: Commodity.Coolant, amount: 1 },
          { type: Commodity.Teleporter, amount: 1 },
        ],
        results: [
          { type: Commodity.MiningRobot, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 9315,
        profitPerCycle: 41732,
        ROICycles: 3558,
      },
    ],
  },
  [Station.MicrochipFactory]: {
    link: "https://avorion.fandom.com/wiki/Microchip_Factory",
    variations: [
      {
        cost: 4460000,
        ingredients: [
          { type: Commodity.Wire, amount: 4 },
          { type: Commodity.SemiConductor, amount: 12 },
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
        ],
        results: [{ type: Commodity.Microchip, amount: 3 }],
        requiredPC: 171,
        profitPerCycle: 760,
        ROICycles: 5869,
      },
    ],
  },
  [Station.MetalPlateFactory]: {
    link: "https://avorion.fandom.com/wiki/Metal_Plate_Factory",
    variations: [
      {
        cost: 4085500,
        ingredients: [
          { type: Commodity.Steel, amount: 3 },
          { type: Commodity.Silver, amount: 1 },
        ],
        results: [{ type: Commodity.MetalPlate, amount: 2 }],
        requiredPC: 102,
        profitPerCycle: 453,
        ROICycles: 9019,
      },
    ],
  },
  [Station.MedicalSuppliesFactory]: {
    link: "https://avorion.fandom.com/wiki/Medical_Supplies_Factory",
    variations: [
      {
        cost: 14536500,
        ingredients: [
          { type: Commodity.Water, amount: 5 },
          { type: Commodity.Chemicals, amount: 15 },
          { type: Commodity.Fabric, amount: 5 },
          { type: Commodity.Zinc, amount: 5 },
          { type: Commodity.Chlorine, amount: 5 },
        ],
        results: [{ type: Commodity.MedicalSupplies, amount: 4 }],
        requiredPC: 771,
        profitPerCycle: 3439,
        ROICycles: 4227,
      },
    ],
  },
  [Station.MeatFactory]: {
    link: "https://avorion.fandom.com/wiki/Meat_Factory",
    variations: [
      {
        cost: 5912500,
        ingredients: [{ type: Commodity.Cattle, amount: 10 }],
        results: [
          { type: Commodity.Meat, amount: 85 },
          { type: Commodity.Leather, amount: 10 },
        ],
        requiredPC: 228,
        profitPerCycle: 975,
        ROICycles: 6065,
      },
    ],
  },
  [Station.LuxuryFoodFactory]: {
    link: "https://avorion.fandom.com/wiki/Luxury_Food_Factory",
    variations: [
      {
        cost: 8835000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Wheat, amount: 50 },
          { type: Commodity.Fruit, amount: 10 },
          { type: Commodity.Spices, amount: 6 },
          { type: Commodity.Wine, amount: 7 },
        ],
        results: [{ type: Commodity.LuxuryFood, amount: 1 }],
        requiredPC: 406,
        profitPerCycle: 1860,
        ROICycles: 4750,
      },
    ],
  },
  [Station.JewelryManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Jewelry_Manufacturer",
    variations: [
      {
        cost: 7890000,
        ingredients: [
          { type: Commodity.Platinum, amount: 2 },
          { type: Commodity.Gem, amount: 5 },
        ],
        results: [{ type: Commodity.Jewelry, amount: 4 }],
        requiredPC: 333,
        profitPerCycle: 1540,
        ROICycles: 5124,
      },
      {
        cost: 7540000,
        ingredients: [
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.Diamond, amount: 4 },
        ],
        results: [{ type: Commodity.Jewelry, amount: 4 }],
        requiredPC: 333,
        profitPerCycle: 1440,
        ROICycles: 5237,
      },
    ],
  },
  [Station.GunFactory]: {
    link: "https://avorion.fandom.com/wiki/Gun_Factory",
    variations: [
      {
        cost: 8660000,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Ammunition, amount: 1 },
          { type: Commodity.Aluminum, amount: 1 },
          { type: Commodity.Plastic, amount: 1 },
        ],
        results: [{ type: Commodity.Gun, amount: 5 }],
        requiredPC: 388,
        profitPerCycle: 1760,
        ROICycles: 4921,
      },
    ],
  },
  [Station.GlassManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Glass_Manufacturer",
    variations: [
      {
        cost: 3956000,
        ingredients: [
          { type: Commodity.Ore, amount: 4 },
          { type: Commodity.Crystal, amount: 4 },
        ],
        results: [{ type: Commodity.Glass, amount: 8 }],
        requiredPC: 97,
        profitPerCycle: 416,
        ROICycles: 9510,
      },
    ],
  },
  [Station.FusionGeneratorFactory]: {
    link: "https://avorion.fandom.com/wiki/Fusion_Generator_Factory",
    variations: [
      {
        cost: 42032500,
        ingredients: [
          { type: Commodity.FusionCore, amount: 4 },
          { type: Commodity.Steel, amount: 10 },
          { type: Commodity.PlasmaCell, amount: 15 },
          { type: Commodity.PowerUnit, amount: 2 },
        ],
        results: [{ type: Commodity.FusionGenerator, amount: 1 }],
        requiredPC: 2465,
        profitPerCycle: 11295,
        ROICycles: 3722,
      },
    ],
  },
  [Station.FusionCoreFactory]: {
    link: "https://avorion.fandom.com/wiki/Fusion_Core_Factory",
    variations: [
      {
        cost: 12727000,
        ingredients: [
          { type: Commodity.Hydrogen, amount: 1 },
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.PlasmaCell, amount: 2 },
          { type: Commodity.Transformator, amount: 2 },
          { type: Commodity.EnergyTube, amount: 2 },
        ],
        results: [{ type: Commodity.FusionCore, amount: 2 }],
        requiredPC: 644,
        profitPerCycle: 2922,
        ROICycles: 4356,
      },
    ],
  },
  [Station.FungusFarm]: {
    link: "https://avorion.fandom.com/wiki/Fungus_Farm",
    variations: [
      {
        cost: 3679500,
        ingredients: [
          { type: Commodity.BioGas, amount: 1 },
          { type: Commodity.Mineral, amount: 1 },
        ],
        results: [
          { type: Commodity.Fungus, amount: 25 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 77,
        profitPerCycle: 337,
        ROICycles: 10919,
      },
    ],
  },
  [Station.FruitFarm]: {
    link: "https://avorion.fandom.com/wiki/Fruit_Farm",
    variations: [
      {
        cost: 4040000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 80 },
        ],
        results: [
          { type: Commodity.Fruit, amount: 40 },
          { type: Commodity.Oxygen, amount: 4, isOptional: true },
        ],
        requiredPC: 170,
        profitPerCycle: 960,
        ROICycles: 4209,
      },
    ],
  },
  [Station.FoodFactory]: {
    link: "https://avorion.fandom.com/wiki/Food_Factory",
    variations: [
      {
        cost: 5580000,
        ingredients: [
          { type: Commodity.Wheat, amount: 50 },
          { type: Commodity.Meat, amount: 10 },
          { type: Commodity.Corn, amount: 10 },
          { type: Commodity.Vegetable, amount: 10 },
        ],
        results: [{ type: Commodity.Food, amount: 10 }],
        requiredPC: 193,
        profitPerCycle: 880,
        ROICycles: 6341,
      },
    ],
  },
  [Station.FoodBarFactory]: {
    link: "https://avorion.fandom.com/wiki/Food_Bar_Factory",
    variations: [
      {
        cost: 4600000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Wheat, amount: 50 },
          { type: Commodity.Corn, amount: 10 },
          { type: Commodity.Rice, amount: 10 },
        ],
        results: [{ type: Commodity.FoodBar, amount: 10 }],
        requiredPC: 146,
        profitPerCycle: 650,
        ROICycles: 7077,
      },
    ],
  },
  [Station.FishFarm]: {
    link: "https://avorion.fandom.com/wiki/Fish_Farm",
    variations: [
      {
        cost: 4089000,
        ingredients: [
          { type: Commodity.Water, amount: 23 },
          { type: Commodity.Wheat, amount: 5 },
          { type: Commodity.Oxygen, amount: 5 },
        ],
        results: [
          { type: Commodity.Fish, amount: 8 },
          { type: Commodity.BioGas, amount: 1, isOptional: true },
          { type: Commodity.Plankton, amount: 1, isOptional: true },
        ],
        requiredPC: 98,
        profitPerCycle: 504,
        ROICycles: 8114,
      },
    ],
  },
  [Station.FertilizerFactory]: {
    link: "https://avorion.fandom.com/wiki/Fertilizer_Factory",
    variations: [
      {
        cost: 5135500,
        ingredients: [
          { type: Commodity.Chemicals, amount: 2 },
          { type: Commodity.Mineral, amount: 3 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Solvent, amount: 1, isOptional: true },
        ],
        results: [
          { type: Commodity.Fertilizer, amount: 11 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 234,
        profitPerCycle: 1205,
        ROICycles: 4262,
      },
      {
        cost: 5198500,
        ingredients: [
          { type: Commodity.Plankton, amount: 1 },
          { type: Commodity.Mineral, amount: 4 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [
          { type: Commodity.Fertilizer, amount: 9 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 192,
        profitPerCycle: 821,
        ROICycles: 6332,
      },
    ],
  },
  [Station.FabricFactory]: {
    link: "https://avorion.fandom.com/wiki/Fabric_Factory",
    variations: [
      {
        cost: 5230000,
        ingredients: [{ type: Commodity.Sheep, amount: 15 }],
        results: [{ type: Commodity.Fabric, amount: 30 }],
        requiredPC: 177,
        profitPerCycle: 780,
        ROICycles: 6706,
      },
    ],
  },
  [Station.EnergyGeneratorFactory]: {
    link: "https://avorion.fandom.com/wiki/Energy_Generator_Factory",
    variations: [
      {
        cost: 18484500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 15 },
          { type: Commodity.Microchip, amount: 10 },
          { type: Commodity.Conductor, amount: 10 },
        ],
        results: [{ type: Commodity.EnergyGenerator, amount: 1 }],
        requiredPC: 1004,
        profitPerCycle: 4567,
        ROICycles: 4048,
      },
    ],
  },
  [Station.DroneFactory]: {
    link: "https://avorion.fandom.com/wiki/Drone_Factory",
    variations: [
      {
        cost: 10249000,
        ingredients: [
          { type: Commodity.Fuel, amount: 1 },
          { type: Commodity.PlasmaCell, amount: 2 },
          { type: Commodity.MetalPlate, amount: 5 },
        ],
        results: [
          { type: Commodity.Drone, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 506,
        profitPerCycle: 2239,
        ROICycles: 4578,
      },
    ],
  },
  [Station.DrillFactory]: {
    link: "https://avorion.fandom.com/wiki/Drill_Factory",
    variations: [
      {
        cost: 22943500,
        ingredients: [
          { type: Commodity.LaserHead, amount: 1 },
          { type: Commodity.Processor, amount: 1 },
          { type: Commodity.Steel, amount: 2 },
          { type: Commodity.Diamond, amount: 2 },
        ],
        results: [
          { type: Commodity.Drill, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 1319,
        profitPerCycle: 5866,
        ROICycles: 3912,
      },
    ],
  },
  [Station.Distillery]: {
    link: "https://avorion.fandom.com/wiki/Distillery",
    variations: [
      {
        cost: 11897500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 10 },
          { type: Commodity.Wheat, amount: 50 },
          { type: Commodity.Water, amount: 250 },
        ],
        results: [{ type: Commodity.Liquor, amount: 5 }],
        requiredPC: 611,
        profitPerCycle: 2685,
        ROICycles: 4432,
      },
    ],
  },
  [Station.DisplayFactory]: {
    link: "https://avorion.fandom.com/wiki/Display_Factory",
    variations: [
      {
        cost: 11722500,
        ingredients: [
          { type: Commodity.Glass, amount: 1 },
          { type: Commodity.Microchip, amount: 5 },
          { type: Commodity.SemiConductor, amount: 3 },
          { type: Commodity.PlasmaCell, amount: 1 },
        ],
        results: [{ type: Commodity.Display, amount: 1 }],
        requiredPC: 495,
        profitPerCycle: 2635,
        ROICycles: 4449,
      },
    ],
  },
  [Station.DairyFarm]: {
    link: "https://avorion.fandom.com/wiki/Dairy_Farm",
    variations: [
      {
        cost: 6875000,
        ingredients: [{ type: Commodity.Cattle, amount: 10 }],
        results: [
          { type: Commodity.Dairy, amount: 180 },
          { type: Commodity.Leather, amount: 10 },
        ],
        requiredPC: 246,
        profitPerCycle: 1250,
        ROICycles: 5500,
      },
    ],
  },
  [Station.CornFarm]: {
    link: "https://avorion.fandom.com/wiki/Corn_Farm",
    variations: [
      {
        cost: 3480000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 4, isOptional: true },
          { type: Commodity.Water, amount: 60 },
        ],
        results: [
          { type: Commodity.Corn, amount: 60 },
          { type: Commodity.Oxygen, amount: 4, isOptional: true },
        ],
        requiredPC: 133,
        profitPerCycle: 800,
        ROICycles: 4350,
      },
    ],
  },
  [Station.ComputationMainframeFactory]: {
    link: "https://avorion.fandom.com/wiki/Computation_Mainframe_Factory",
    variations: [
      {
        cost: 40419000,
        ingredients: [
          { type: Commodity.Processor, amount: 2 },
          { type: Commodity.PowerUnit, amount: 1 },
          { type: Commodity.Microchip, amount: 1 },
          { type: Commodity.Display, amount: 1 },
          { type: Commodity.Wire, amount: 15 },
        ],
        results: [{ type: Commodity.ComputationMainframe, amount: 1 }],
        requiredPC: 2364,
        profitPerCycle: 10834,
        ROICycles: 3731,
      },
    ],
  },
  [Station.CoffeeFarm]: {
    link: "https://avorion.fandom.com/wiki/Coffee_Farm",
    variations: [
      {
        cost: 4187000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Water, amount: 35 },
          { type: Commodity.Fertilizer, amount: 2 },
        ],
        results: [
          { type: Commodity.Coffee, amount: 10 },
          { type: Commodity.Oxygen, amount: 1, isOptional: true },
        ],
        requiredPC: 127,
        profitPerCycle: 612,
        ROICycles: 6842,
      },
    ],
  },
  [Station.CocoaFarm]: {
    link: "https://avorion.fandom.com/wiki/Cocoa_Farm",
    variations: [
      {
        cost: 4082000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Water, amount: 30 },
          { type: Commodity.Fertilizer, amount: 2 },
        ],
        results: [
          { type: Commodity.Cocoa, amount: 20 },
          { type: Commodity.Oxygen, amount: 1, isOptional: true },
        ],
        requiredPC: 119,
        profitPerCycle: 582,
        ROICycles: 7014,
      },
      {
        cost: 4187000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Water, amount: 35 },
          { type: Commodity.Fertilizer, amount: 2 },
        ],
        results: [
          { type: Commodity.Coffee, amount: 10 },
          { type: Commodity.Oxygen, amount: 1, isOptional: true },
        ],
        requiredPC: 127,
        profitPerCycle: 612,
        ROICycles: 6842,
      },
    ],
  },
  [Station.ClothesFactory]: {
    link: "https://avorion.fandom.com/wiki/Clothes_Factory",
    variations: [
      {
        cost: 12720000,
        ingredients: [{ type: Commodity.Fabric, amount: 80 }],
        results: [{ type: Commodity.Clothes, amount: 100 }],
        requiredPC: 654,
        profitPerCycle: 2920,
        ROICycles: 4357,
      },
    ],
  },
  [Station.ChemicalFactory]: {
    link: "https://avorion.fandom.com/wiki/Chemical_Factory",
    variations: [
      {
        cost: 6112000,
        ingredients: [
          { type: Commodity.Water, amount: 5 },
          { type: Commodity.Nitrogen, amount: 5 },
          { type: Commodity.Hydrogen, amount: 5 },
          { type: Commodity.Oxygen, amount: 5 },
          { type: Commodity.BioGas, amount: 1 },
          { type: Commodity.Carbon, amount: 1 },
          { type: Commodity.EnergyCell, amount: 10 },
        ],
        results: [
          { type: Commodity.Chemicals, amount: 2 },
          { type: Commodity.Adhesive, amount: 1 },
          { type: Commodity.Coolant, amount: 2 },
          { type: Commodity.Solvent, amount: 2 },
          { type: Commodity.Acid, amount: 2 },
        ],
        requiredPC: 235,
        profitPerCycle: 1032,
        ROICycles: 5923,
      },
    ],
  },
  [Station.CattleRanch]: {
    link: "https://avorion.fandom.com/wiki/Cattle_Ranch",
    variations: [
      {
        cost: 4554500,
        ingredients: [
          { type: Commodity.Wheat, amount: 15 },
          { type: Commodity.Oxygen, amount: 10 },
          { type: Commodity.Water, amount: 15 },
        ],
        results: [
          { type: Commodity.Cattle, amount: 8 },
          { type: Commodity.BioGas, amount: 1, isOptional: true },
        ],
        requiredPC: 147,
        profitPerCycle: 800,
        ROICycles: 5694,
      },
      {
        cost: 5783000,
        ingredients: [
          { type: Commodity.Corn, amount: 15 },
          { type: Commodity.Oxygen, amount: 10 },
          { type: Commodity.Water, amount: 15 },
        ],
        results: [
          { type: Commodity.Cattle, amount: 8 },
          { type: Commodity.BioGas, amount: 2 },
        ],
        requiredPC: 161,
        profitPerCycle: 938,
        ROICycles: 6166,
      },
    ],
  },
  [Station.Brewery]: {
    link: "https://avorion.fandom.com/wiki/Brewery",
    variations: [
      {
        cost: 9045000,
        ingredients: [
          { type: Commodity.Water, amount: 150 },
          { type: Commodity.Wheat, amount: 50 },
          { type: Commodity.Fungus, amount: 10 },
        ],
        results: [{ type: Commodity.Beer, amount: 30 }],
        requiredPC: 416,
        profitPerCycle: 1870,
        ROICycles: 4837,
      },
    ],
  },
  [Station.BookFactory]: {
    link: "https://avorion.fandom.com/wiki/Book_Factory",
    variations: [
      {
        cost: 3571000,
        ingredients: [
          { type: Commodity.Paper, amount: 20 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.Book, amount: 4 }],
        requiredPC: 83,
        profitPerCycle: 356,
        ROICycles: 10031,
      },
    ],
  },
  [Station.BodyArmorFactory]: {
    link: "https://avorion.fandom.com/wiki/Body_Armor_Factory",
    variations: [
      {
        cost: 98410500,
        ingredients: [
          { type: Commodity.MetalPlate, amount: 2 },
          { type: Commodity.Coolant, amount: 1 },
          { type: Commodity.Teleporter, amount: 1 },
          { type: Commodity.AntigravUnit, amount: 1 },
          { type: Commodity.Carbon, amount: 1 },
          { type: Commodity.Nanobot, amount: 1 },
        ],
        results: [{ type: Commodity.BodyArmor, amount: 1 }],
        requiredPC: 5866,
        profitPerCycle: 27403,
        ROICycles: 3592,
      },
    ],
  },
  [Station.AntigravUnitFactory]: {
    link: "https://avorion.fandom.com/wiki/Antigrav_Unit_Factory",
    variations: [
      {
        cost: 27710500,
        ingredients: [
          { type: Commodity.PowerUnit, amount: 2 },
          { type: Commodity.Processor, amount: 2 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.AntigravUnit, amount: 1 }],
        requiredPC: 1582,
        profitPerCycle: 7253,
        ROICycles: 3821,
      },
    ],
  },
  [Station.AntigravGeneratorFactory]: {
    link: "https://avorion.fandom.com/wiki/Antigrav_Generator_Factory",
    variations: [
      {
        cost: 74134500,
        ingredients: [
          { type: Commodity.ElectroMagnet, amount: 4 },
          { type: Commodity.Servo, amount: 5 },
          { type: Commodity.Wire, amount: 10 },
          { type: Commodity.AntigravUnit, amount: 1 },
          { type: Commodity.EnergyGenerator, amount: 1 },
        ],
        results: [{ type: Commodity.AntigravGenerator, amount: 1 }],
        requiredPC: 4422,
        profitPerCycle: 20467,
        ROICycles: 3623,
      },
    ],
  },
  [Station.AcceleratorFactory]: {
    link: "https://avorion.fandom.com/wiki/Accelerator_Factory",
    variations: [
      {
        cost: 378820000,
        ingredients: [
          { type: Commodity.Turbine, amount: 3 },
          { type: Commodity.PlasmaCell, amount: 3 },
          { type: Commodity.FusionGenerator, amount: 3 },
          { type: Commodity.EnergyTube, amount: 6 },
          { type: Commodity.HighPressureTube, amount: 6 },
          { type: Commodity.Conductor, amount: 15 },
          { type: Commodity.GaussRail, amount: 9 },
        ],
        results: [
          { type: Commodity.NeutronAccelerator, amount: 1 },
          { type: Commodity.ProtonAccelerator, amount: 1 },
          { type: Commodity.ElectronAccelerator, amount: 1 },
        ],
        requiredPC: 23228,
        profitPerCycle: 107520,
        ROICycles: 3524,
      },
    ],
  },
  [Station.AmmunitionFactory]: {
    link: "https://avorion.fandom.com/wiki/Ammunition_Factory",
    variations: [
      {
        cost: 15205000,
        ingredients: [
          { type: Commodity.Lead, amount: 10 },
          { type: Commodity.Aluminum, amount: 10 },
          { type: Commodity.Steel, amount: 10 },
          { type: Commodity.Adhesive, amount: 5 },
          { type: Commodity.EnergyCell, amount: 5 },
        ],
        results: [
          { type: Commodity.AmmunitionS, amount: 15 },
          { type: Commodity.AmmunitionM, amount: 10 },
          { type: Commodity.AmmunitionL, amount: 5 },
        ],
        requiredPC: 812,
        profitPerCycle: 3630,
        ROICycles: 4189,
      },
      {
        cost: 21428000,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Chemicals, amount: 15 },
          { type: Commodity.Paint, amount: 15 },
        ],
        results: [
          { type: Commodity.Ammunition, amount: 15 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 1233,
        profitPerCycle: 5408,
        ROICycles: 3963,
      },
    ],
  },
  [Station.GasCollector]: {
    link: "https://avorion.fandom.com/wiki/Gas_Collector",
    variations: [
      {
        cost: 8275000,
        ingredients: [],
        results: [
          { type: Commodity.Helium, amount: 3 },
          { type: Commodity.Hydrogen, amount: 3 },
          { type: Commodity.Neon, amount: 3 },
          { type: Commodity.Chlorine, amount: 3 },
        ],
        requiredPC: 110,
        profitPerCycle: 1650,
        ROICycles: 5016,
      },
      {
        cost: 9745000,
        ingredients: [],
        results: [
          { type: Commodity.Helium, amount: 3 },
          { type: Commodity.Nitrogen, amount: 3 },
          { type: Commodity.Neon, amount: 3 },
          { type: Commodity.Chlorine, amount: 3 },
          { type: Commodity.Fluorine, amount: 3 },
        ],
        requiredPC: 138,
        profitPerCycle: 2070,
        ROICycles: 4708,
      },
      {
        cost: 10060000,
        ingredients: [],
        results: [
          { type: Commodity.Oxygen, amount: 8 },
          { type: Commodity.Hydrogen, amount: 8 },
          { type: Commodity.Nitrogen, amount: 8 },
        ],
        requiredPC: 144,
        profitPerCycle: 2160,
        ROICycles: 4658,
      },
      {
        cost: 8800000,
        ingredients: [],
        results: [
          { type: Commodity.Helium, amount: 3 },
          { type: Commodity.Hydrogen, amount: 3 },
          { type: Commodity.Chlorine, amount: 3 },
          { type: Commodity.Fluorine, amount: 3 },
        ],
        requiredPC: 120,
        profitPerCycle: 1800,
        ROICycles: 4889,
      },
    ],
  },
  [Station.MineralExtractor]: {
    link: "https://avorion.fandom.com/wiki/Mineral_Extractor",
    variations: [
      {
        cost: 9500000,
        ingredients: [],
        results: [{ type: Commodity.Mineral, amount: 4 }],
        requiredPC: 134,
        profitPerCycle: 2000,
        ROICycles: 4750,
      },
    ],
  },
  [Station.ScrapMetalTrader]: {
    link: "https://avorion.fandom.com/wiki/Scrap_Metal_Trader",
    variations: [
      {
        cost: 7750000,
        ingredients: [],
        results: [{ type: Commodity.ScrapMetal, amount: 60 }],
        requiredPC: 100,
        profitPerCycle: 1500,
        ROICycles: 5167,
      },
    ],
  },
  [Station.OilRefinery]: {
    link: "https://avorion.fandom.com/wiki/Oil_Refinery",
    variations: [
      {
        cost: 4950000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 5 },
          { type: Commodity.RawOil, amount: 10 },
        ],
        results: [{ type: Commodity.Oil, amount: 5 }],
        requiredPC: 162,
        profitPerCycle: 700,
        ROICycles: 7072,
      },
    ],
  },
  [Station.CarbonExtractor]: {
    link: "https://avorion.fandom.com/wiki/Carbon_Extractor",
    variations: [
      {
        cost: 4806500,
        ingredients: [{ type: Commodity.Corn, amount: 52 }],
        results: [{ type: Commodity.Carbon, amount: 5 }],
        requiredPC: 139,
        profitPerCycle: 659,
        ROICycles: 7294,
      },
      {
        cost: 4915000,
        ingredients: [{ type: Commodity.Rice, amount: 95 }],
        results: [{ type: Commodity.Carbon, amount: 5 }],
        requiredPC: 139,
        profitPerCycle: 690,
        ROICycles: 7124,
      },
      {
        cost: 4750500,
        ingredients: [{ type: Commodity.Wheat, amount: 64 }],
        results: [{ type: Commodity.Carbon, amount: 5 }],
        requiredPC: 139,
        profitPerCycle: 643,
        ROICycles: 7389,
      },
      {
        cost: 4610500,
        ingredients: [{ type: Commodity.Potato, amount: 63 }],
        results: [{ type: Commodity.Carbon, amount: 5 }],
        requiredPC: 139,
        profitPerCycle: 603,
        ROICycles: 7646,
      },
    ],
  },
  [Station.RubberFactory]: {
    link: "https://avorion.fandom.com/wiki/Rubber_Factory",
    variations: [
      {
        cost: 4383000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
          { type: Commodity.Oil, amount: 3 },
        ],
        results: [
          { type: Commodity.Rubber, amount: 3 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
          { type: Commodity.Acid, amount: 1, isOptional: true },
        ],
        requiredPC: 163,
        profitPerCycle: 990,
        ROICycles: 4428,
      },
    ],
  },
  [Station.PlasticManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Plastic_Manufacturer",
    variations: [
      {
        cost: 4022500,
        ingredients: [
          { type: Commodity.Oil, amount: 3 },
          { type: Commodity.EnergyCell, amount: 3, isOptional: true },
        ],
        results: [{ type: Commodity.Plastic, amount: 15 }],
        requiredPC: 135,
        profitPerCycle: 585,
        ROICycles: 6877,
      },
    ],
  },
  [Station.SolarCellFactory]: {
    link: "https://avorion.fandom.com/wiki/Solar_Cell_Factory",
    variations: [
      {
        cost: 7015000,
        ingredients: [
          { type: Commodity.Zinc, amount: 1 },
          { type: Commodity.Silicon, amount: 2 },
          { type: Commodity.Platinum, amount: 2 },
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.SolarCell, amount: 10 }],
        requiredPC: 310,
        profitPerCycle: 1340,
        ROICycles: 5236,
      },
    ],
  },
  [Station.ToolsFactory]: {
    link: "https://avorion.fandom.com/wiki/Tools_Factory",
    variations: [
      {
        cost: 4470500,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Platinum, amount: 1 },
          { type: Commodity.Silver, amount: 1 },
          { type: Commodity.Aluminum, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.Tools, amount: 10 }],
        requiredPC: 138,
        profitPerCycle: 613,
        ROICycles: 7293,
      },
    ],
  },
  [Station.SemiConductorManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Semi_Conductor_Manufacturer",
    variations: [
      {
        cost: 4278000,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Silicon, amount: 1 },
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.SemiConductor, amount: 15 }],
        requiredPC: 125,
        profitPerCycle: 558,
        ROICycles: 7667,
      },
    ],
  },
  [Station.IceMine]: {
    link: "https://avorion.fandom.com/wiki/Ice_Mine",
    variations: [
      {
        cost: 7750000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Water, amount: 75 }],
        requiredPC: 100,
        profitPerCycle: 1500,
        ROICycles: 5167,
      },
    ],
  },
  [Station.AluminumMine]: {
    link: "https://avorion.fandom.com/wiki/Aluminum_Mine",
    variations: [
      {
        cost: 9500000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Aluminum, amount: 10 }],
        requiredPC: 134,
        profitPerCycle: 2000,
        ROICycles: 4750,
      },
    ],
  },
  [Station.NobleMetalMine]: {
    link: "https://avorion.fandom.com/wiki/Noble_Metal_Mine",
    variations: [
      {
        cost: 7225000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.Platinum, amount: 1 },
        ],
        requiredPC: 90,
        profitPerCycle: 1350,
        ROICycles: 5352,
      },
      {
        cost: 6175000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [
          { type: Commodity.Silver, amount: 1 },
          { type: Commodity.Platinum, amount: 1 },
        ],
        requiredPC: 70,
        profitPerCycle: 1050,
        ROICycles: 5881,
      },
      {
        cost: 5650000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [
          { type: Commodity.Silver, amount: 1 },
          { type: Commodity.Gold, amount: 1 },
        ],
        requiredPC: 60,
        profitPerCycle: 900,
        ROICycles: 6278,
      },
    ],
  },
  [Station.OilRig]: {
    link: "https://avorion.fandom.com/wiki/Oil_Rig",
    variations: [
      {
        cost: 5125000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.RawOil, amount: 5 }],
        requiredPC: 50,
        profitPerCycle: 750,
        ROICycles: 6834,
      },
    ],
  },
  [Station.CoalMine]: {
    link: "https://avorion.fandom.com/wiki/Coal_Mine",
    variations: [
      {
        cost: 5300000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Coal, amount: 4 }],
        requiredPC: 54,
        profitPerCycle: 800,
        ROICycles: 6625,
      },
    ],
  },
  [Station.OreMine]: {
    link: "https://avorion.fandom.com/wiki/Ore_Mine",
    variations: [
      {
        cost: 9850000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Ore, amount: 30 }],
        requiredPC: 140,
        profitPerCycle: 2100,
        ROICycles: 4691,
      },
    ],
  },
  [Station.SiliconMine]: {
    link: "https://avorion.fandom.com/wiki/Silicon_Mine",
    variations: [
      {
        cost: 9500000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Silicon, amount: 4 }],
        requiredPC: 134,
        profitPerCycle: 2000,
        ROICycles: 4750,
      },
    ],
  },
  [Station.TurretFactorySupplier]: {
    link: "https://avorion.fandom.com/wiki/Turret_Factory_Supplier",
    variations: [
      {
        ingredients: [],
        results: [],
      },
    ],
  },
  [Station.TurretFactory]: {
    link: "https://avorion.fandom.com/wiki/Turret_Factory",
    variations: [
      {
        isConsumer: true,
        cost: 25000000,
        ingredients: [
          {
            type: Commodity.Servo,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.SteelTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.AmmunitionS,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Aluminum,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Lead,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Servo,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighPressureTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.AmmunitionM,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ExplosiveCharge,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Aluminum,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserHead,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserCompressor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighCapacityLens,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserModulator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Crystal,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.PlasmaCell,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyContainer,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Crystal,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Servo,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Warhead,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighPressureTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ExplosiveCharge,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Wire,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Servo,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Rocket,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighPressureTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Fuel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.TargetingCard,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Wire,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Servo,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ElectromagneticCharge,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ElectroMagnet,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.GaussRail,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighPressureTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Copper,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Nanobot,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Transformator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserModulator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Gold,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserCompressor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserModulator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighCapacityLens,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserCompressor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.LaserModulator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighCapacityLens,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ForceGenerator,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyInverter,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyTube,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Steel,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Zinc,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.IndustrialTeslaCoil,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ElectromagneticCharge,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyInverter,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Copper,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyCell,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.MilitaryTeslaCoil,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.HighCapacityLens,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.ElectromagneticCharge,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Conductor,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.Copper,
            amount: Infinity,
            isOptional: true,
          },
          {
            type: Commodity.EnergyCell,
            amount: Infinity,
            isOptional: true,
          },
        ],
        results: [],
      },
    ],
  },
  [Station.ConductorFactory]: {
    link: "https://avorion.fandom.com/wiki/Conductor_Factory",
    variations: [
      {
        cost: 5671000,
        ingredients: [
          { type: Commodity.Zinc, amount: 2 },
          { type: Commodity.Steel, amount: 2 },
          { type: Commodity.Platinum, amount: 1 },
          { type: Commodity.Gold, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.Conductor, amount: 20 }],
        requiredPC: 216,
        profitPerCycle: 956,
        ROICycles: 5933,
      },
    ],
  },
  [Station.CopperMine]: {
    link: "https://avorion.fandom.com/wiki/Copper_Mine",
    variations: [
      {
        cost: 8625000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Copper, amount: 5 }],
        requiredPC: 117,
        profitPerCycle: 1750,
        ROICycles: 4929,
      },
    ],
  },
  [Station.PlanetaryTradingPost]: {
    link: "https://avorion.fandom.com/wiki/Planetary_Trading_Post",
    variations: [
      {
        ingredients: [],
        results: [],
      },
    ],
  },
  [Station.CrystalFarm]: {
    link: "https://avorion.fandom.com/wiki/Crystal_Farm",
    variations: [
      {
        cost: 9150000,
        ingredients: [],
        results: [{ type: Commodity.Crystal, amount: 10 }],
        requiredPC: 127,
        profitPerCycle: 1900,
        ROICycles: 4816,
      },
    ],
  },
  [Station.ElectroMagnetFactory]: {
    link: "https://avorion.fandom.com/wiki/Electro_Magnet_Factory",
    variations: [
      {
        cost: 4428500,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Copper, amount: 1 },
          { type: Commodity.Conductor, amount: 2 },
          { type: Commodity.Transformator, amount: 2 },
        ],
        results: [{ type: Commodity.ElectroMagnet, amount: 4 }],
        requiredPC: 123,
        profitPerCycle: 551,
        ROICycles: 8038,
      },
    ],
  },
  [Station.ElectromagneticChargeFactory]: {
    link: "https://avorion.fandom.com/wiki/Electromagnetic_Charge_Factory",
    variations: [
      {
        cost: 30479000,
        ingredients: [
          { type: Commodity.EnergyContainer, amount: 10 },
          { type: Commodity.ElectroMagnet, amount: 6 },
          { type: Commodity.EnergyTube, amount: 2 },
          { type: Commodity.Transformator, amount: 2 },
        ],
        results: [{ type: Commodity.ElectromagneticCharge, amount: 2 }],
        requiredPC: 1760,
        profitPerCycle: 7994,
        ROICycles: 3813,
      },
    ],
  },
  [Station.SolarPowerPlant]: {
    link: "https://avorion.fandom.com/wiki/Solar_Power_Plant",
    variations: [
      {
        cost: 6875000,
        ingredients: [],
        results: [{ type: Commodity.EnergyCell, amount: 25 }],
        requiredPC: 84,
        profitPerCycle: 1250,
        ROICycles: 5500,
      },
    ],
  },
  [Station.EnergyContainerFactory]: {
    link: "https://avorion.fandom.com/wiki/Energy_Container_Factory",
    variations: [
      {
        cost: 5755000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 9 },
          { type: Commodity.Transformator, amount: 9 },
        ],
        results: [{ type: Commodity.EnergyContainer, amount: 3 }],
        requiredPC: 208,
        profitPerCycle: 930,
        ROICycles: 6189,
      },
    ],
  },
  [Station.EnergyInverterFactory]: {
    link: "https://avorion.fandom.com/wiki/Energy_Inverter_Factory",
    variations: [
      {
        cost: 7606500,
        ingredients: [
          { type: Commodity.EnergyTube, amount: 1 },
          { type: Commodity.Conductor, amount: 2 },
          { type: Commodity.Transformator, amount: 2 },
        ],
        results: [{ type: Commodity.EnergyInverter, amount: 4 }],
        requiredPC: 322,
        profitPerCycle: 1459,
        ROICycles: 5214,
      },
    ],
  },
  [Station.EnergyTubeFactory]: {
    link: "https://avorion.fandom.com/wiki/Energy_Tube_Factory",
    variations: [
      {
        cost: 5219500,
        ingredients: [
          { type: Commodity.Plastic, amount: 1 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Platinum, amount: 1 },
          { type: Commodity.Neon, amount: 1 },
          { type: Commodity.SteelTube, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.EnergyTube, amount: 1 }],
        requiredPC: 184,
        profitPerCycle: 827,
        ROICycles: 6312,
      },
    ],
  },
  [Station.ExplosiveChargeFactory]: {
    link: "https://avorion.fandom.com/wiki/Explosive_Charge_Factory",
    variations: [
      {
        cost: 8201500,
        ingredients: [
          { type: Commodity.Fluorine, amount: 4 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.EnergyCell, amount: 2 },
          { type: Commodity.Plastic, amount: 2 },
          { type: Commodity.Chemicals, amount: 2 },
          { type: Commodity.Acid, amount: 2 },
          { type: Commodity.Adhesive, amount: 2 },
        ],
        results: [{ type: Commodity.ExplosiveCharge, amount: 4 }],
        requiredPC: 365,
        profitPerCycle: 1629,
        ROICycles: 5035,
      },
    ],
  },
  [Station.ForceGeneratorFactory]: {
    link: "https://avorion.fandom.com/wiki/Force_Generator_Factory",
    variations: [
      {
        cost: 8201500,
        ingredients: [
          { type: Commodity.Fluorine, amount: 4 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.EnergyCell, amount: 2 },
          { type: Commodity.Plastic, amount: 2 },
          { type: Commodity.Chemicals, amount: 2 },
          { type: Commodity.Acid, amount: 2 },
          { type: Commodity.Adhesive, amount: 2 },
        ],
        results: [{ type: Commodity.ExplosiveCharge, amount: 4 }],
        requiredPC: 365,
        profitPerCycle: 1629,
        ROICycles: 5035,
      },
    ],
  },
  [Station.FuelFactory]: {
    link: "https://avorion.fandom.com/wiki/Fuel_Factory",
    variations: [
      {
        cost: 3732000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 2 },
          { type: Commodity.Oil, amount: 1 },
          { type: Commodity.Nitrogen, amount: 1 },
          { type: Commodity.Fluorine, amount: 1 },
        ],
        results: [
          { type: Commodity.Fuel, amount: 1 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 83,
        profitPerCycle: 352,
        ROICycles: 10603,
      },
    ],
  },
  [Station.GaussRailFactory]: {
    link: "https://avorion.fandom.com/wiki/Gauss_Rail_Factory",
    variations: [
      {
        cost: 17980500,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 10 },
          { type: Commodity.ElectroMagnet, amount: 6 },
          { type: Commodity.EnergyTube, amount: 2 },
          { type: Commodity.HighPressureTube, amount: 1 },
          { type: Commodity.Transformator, amount: 1 },
        ],
        results: [{ type: Commodity.GaussRail, amount: 2 }],
        requiredPC: 973,
        profitPerCycle: 4423,
        ROICycles: 4066,
      },
    ],
  },
  [Station.HighCapacityLensFactory]: {
    link: "https://avorion.fandom.com/wiki/High_Capacity_Lens_Factory",
    variations: [
      {
        cost: 7193500,
        ingredients: [
          { type: Commodity.Glass, amount: 4 },
          { type: Commodity.Carbon, amount: 2 },
          { type: Commodity.Plastic, amount: 2 },
          { type: Commodity.Diamond, amount: 2 },
        ],
        results: [{ type: Commodity.HighCapacityLens, amount: 1 }],
        requiredPC: 304,
        profitPerCycle: 1341,
        ROICycles: 5365,
      },
    ],
  },
  [Station.HighPressureTubeFactory]: {
    link: "https://avorion.fandom.com/wiki/High_Pressure_Tube_Factory",
    variations: [
      {
        cost: 7452500,
        ingredients: [
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Aluminum, amount: 1 },
          { type: Commodity.Carbon, amount: 2 },
          { type: Commodity.Adhesive, amount: 2 },
          { type: Commodity.SteelTube, amount: 2 },
        ],
        results: [{ type: Commodity.HighPressureTube, amount: 3 }],
        requiredPC: 315,
        profitPerCycle: 1415,
        ROICycles: 5267,
      },
    ],
  },
  [Station.TeslaCoilFactory]: {
    link: "https://avorion.fandom.com/wiki/Tesla_Coil_Factory",
    variations: [
      {
        cost: 23132500,
        ingredients: [
          { type: Commodity.Steel, amount: 10 },
          { type: Commodity.Copper, amount: 3 },
          { type: Commodity.FusionCore, amount: 2 },
          { type: Commodity.Plastic, amount: 5 },
        ],
        results: [
          { type: Commodity.MilitaryTeslaCoil, amount: 1 },
          { type: Commodity.IndustrialTeslaCoil, amount: 1 },
        ],
        requiredPC: 1286,
        profitPerCycle: 5895,
        ROICycles: 3925,
      },
    ],
  },
  [Station.LaserCompressorFactory]: {
    link: "https://avorion.fandom.com/wiki/Laser_Compressor_Factory",
    variations: [
      {
        cost: 9059000,
        ingredients: [
          { type: Commodity.PlasmaCell, amount: 1 },
          { type: Commodity.Transformator, amount: 1 },
          { type: Commodity.EnergyTube, amount: 1 },
          { type: Commodity.Wire, amount: 15 },
        ],
        results: [
          { type: Commodity.LaserCompressor, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 428,
        profitPerCycle: 1899,
        ROICycles: 4771,
      },
    ],
  },
  [Station.LaserHeadFactory]: {
    link: "https://avorion.fandom.com/wiki/Laser_Head_Factory",
    variations: [
      {
        cost: 7015000,
        ingredients: [
          { type: Commodity.Glass, amount: 1 },
          { type: Commodity.Conductor, amount: 1 },
          { type: Commodity.Aluminum, amount: 15 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [
          { type: Commodity.LaserHead, amount: 1 },
          { type: Commodity.ToxicWaste, amount: 1, isOptional: true },
        ],
        requiredPC: 307,
        profitPerCycle: 1340,
        ROICycles: 5236,
      },
    ],
  },
  [Station.LaserModulatorFactory]: {
    link: "https://avorion.fandom.com/wiki/Laser_Modulator_Factory",
    variations: [
      {
        cost: 19251000,
        ingredients: [
          { type: Commodity.Servo, amount: 4 },
          { type: Commodity.EnergyTube, amount: 2 },
          { type: Commodity.Transformator, amount: 2 },
          { type: Commodity.EnergyCell, amount: 4 },
        ],
        results: [{ type: Commodity.LaserModulator, amount: 1 }],
        requiredPC: 1053,
        profitPerCycle: 4786,
        ROICycles: 4023,
      },
    ],
  },
  [Station.LeadMine]: {
    link: "https://avorion.fandom.com/wiki/Lead_Mine",
    variations: [
      {
        cost: 9500000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Lead, amount: 10 }],
        requiredPC: 134,
        profitPerCycle: 2000,
        ROICycles: 4750,
      },
    ],
  },
  [Station.NanobotFactory]: {
    link: "https://avorion.fandom.com/wiki/Nanobot_Factory",
    variations: [
      {
        cost: 9167500,
        ingredients: [
          { type: Commodity.Crystal, amount: 15 },
          { type: Commodity.SemiConductor, amount: 15 },
        ],
        results: [{ type: Commodity.Nanobot, amount: 5 }],
        requiredPC: 425,
        profitPerCycle: 1905,
        ROICycles: 4813,
      },
    ],
  },
  [Station.PlasmaCellFactory]: {
    link: "https://avorion.fandom.com/wiki/Plasma_Cell_Factory",
    variations: [
      {
        cost: 4250000,
        ingredients: [
          { type: Commodity.EnergyCell, amount: 10 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.BioGas, amount: 1 },
          { type: Commodity.Neon, amount: 1 },
          { type: Commodity.Helium, amount: 1 },
        ],
        results: [{ type: Commodity.PlasmaCell, amount: 10 }],
        requiredPC: 112,
        profitPerCycle: 500,
        ROICycles: 8500,
      },
    ],
  },
  [Station.PowerUnitFactory]: {
    link: "https://avorion.fandom.com/wiki/Power_Unit_Factory",
    variations: [
      {
        cost: 3707500,
        ingredients: [
          { type: Commodity.Transformator, amount: 2 },
          { type: Commodity.EnergyCell, amount: 2 },
          { type: Commodity.PlasmaCell, amount: 2 },
        ],
        results: [{ type: Commodity.PowerUnit, amount: 1 }],
        requiredPC: 77,
        profitPerCycle: 345,
        ROICycles: 10747,
      },
    ],
  },
  [Station.RocketFactory]: {
    link: "https://avorion.fandom.com/wiki/Rocket_Factory",
    variations: [
      {
        cost: 13752500,
        ingredients: [
          { type: Commodity.Warhead, amount: 1 },
          { type: Commodity.Fuel, amount: 1 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Microchip, amount: 1 },
        ],
        results: [{ type: Commodity.Rocket, amount: 1 }],
        requiredPC: 708,
        profitPerCycle: 3215,
        ROICycles: 4278,
      },
    ],
  },
  [Station.ServoFactory]: {
    link: "https://avorion.fandom.com/wiki/Servo_Factory",
    variations: [
      {
        cost: 5275500,
        ingredients: [
          { type: Commodity.Steel, amount: 4 },
          { type: Commodity.Aluminum, amount: 2 },
          { type: Commodity.Conductor, amount: 2 },
          { type: Commodity.Plastic, amount: 1 },
        ],
        results: [{ type: Commodity.Servo, amount: 2 }],
        requiredPC: 177,
        profitPerCycle: 793,
        ROICycles: 6653,
      },
    ],
  },
  [Station.SteelFactory]: {
    link: "https://avorion.fandom.com/wiki/Steel_Factory",
    variations: [
      {
        cost: 4715500,
        ingredients: [
          { type: Commodity.Ore, amount: 8 },
          { type: Commodity.Coal, amount: 3 },
          { type: Commodity.Carbon, amount: 1 },
        ],
        results: [{ type: Commodity.Steel, amount: 8 }],
        requiredPC: 147,
        profitPerCycle: 633,
        ROICycles: 7450,
      },
      {
        cost: 4467000,
        ingredients: [
          { type: Commodity.ScrapMetal, amount: 12 },
          { type: Commodity.Coal, amount: 4 },
        ],
        results: [{ type: Commodity.Steel, amount: 6 }],
        requiredPC: 110,
        profitPerCycle: 562,
        ROICycles: 7949,
      },
    ],
  },
  [Station.SteelTubeFactory]: {
    link: "https://avorion.fandom.com/wiki/Steel_Tube_Factory",
    variations: [
      {
        cost: 4614000,
        ingredients: [
          { type: Commodity.Steel, amount: 4 },
          { type: Commodity.Aluminum, amount: 2 },
        ],
        results: [{ type: Commodity.SteelTube, amount: 3 }],
        requiredPC: 136,
        profitPerCycle: 604,
        ROICycles: 7640,
      },
    ],
  },
  [Station.ComputerComponentFactory]: {
    link: "https://avorion.fandom.com/wiki/Computer_Component_Factory",
    variations: [
      {
        cost: 40114500,
        ingredients: [
          { type: Commodity.Wire, amount: 15 },
          { type: Commodity.Microchip, amount: 7 },
          { type: Commodity.SemiConductor, amount: 5 },
          { type: Commodity.Copper, amount: 5 },
          { type: Commodity.Platinum, amount: 5 },
          { type: Commodity.Gold, amount: 5 },
        ],
        results: [
          { type: Commodity.Display, amount: 1 },
          { type: Commodity.TargetingCard, amount: 1 },
          { type: Commodity.Processor, amount: 1 },
        ],
        requiredPC: 1736,
        profitPerCycle: 10747,
        ROICycles: 3733,
      },
    ],
  },
  [Station.TargetingCardFactory]: {
    link: "https://avorion.fandom.com/wiki/Targeting_Card_Factory",
    variations: [
      {
        cost: 26244000,
        ingredients: [
          { type: Commodity.Microchip, amount: 1 },
          { type: Commodity.Copper, amount: 1 },
          { type: Commodity.Processor, amount: 2 },
        ],
        results: [{ type: Commodity.TargetingCard, amount: 2 }],
        requiredPC: 1494,
        profitPerCycle: 6784,
        ROICycles: 3869,
      },
    ],
  },
  [Station.TransformatorFactory]: {
    link: "https://avorion.fandom.com/wiki/Transformator_Factory",
    variations: [
      {
        cost: 4421500,
        ingredients: [
          { type: Commodity.Steel, amount: 2 },
          { type: Commodity.Plastic, amount: 1 },
          { type: Commodity.Silicon, amount: 1 },
          { type: Commodity.Silver, amount: 1 },
          { type: Commodity.EnergyCell, amount: 1, isOptional: true },
        ],
        results: [{ type: Commodity.Transformator, amount: 10 }],
        requiredPC: 134,
        profitPerCycle: 599,
        ROICycles: 7382,
      },
    ],
  },
  [Station.WarheadFactory]: {
    link: "https://avorion.fandom.com/wiki/Warhead_Factory",
    variations: [
      {
        cost: 8135000,
        ingredients: [
          { type: Commodity.Conductor, amount: 5 },
          { type: Commodity.Chemicals, amount: 2 },
          { type: Commodity.MetalPlate, amount: 3 },
        ],
        results: [
          { type: Commodity.Warhead, amount: 1 },
          { type: Commodity.ScrapMetal, amount: 1, isOptional: true },
        ],
        requiredPC: 368,
        profitPerCycle: 1635,
        ROICycles: 4976,
      },
    ],
  },
  [Station.WireManufacturer]: {
    link: "https://avorion.fandom.com/wiki/Wire_Manufacturer",
    variations: [
      {
        cost: 3938500,
        ingredients: [
          { type: Commodity.Plastic, amount: 1 },
          { type: Commodity.Steel, amount: 1 },
          { type: Commodity.Gold, amount: 1 },
        ],
        results: [{ type: Commodity.Wire, amount: 15 }],
        requiredPC: 92,
        profitPerCycle: 411,
        ROICycles: 9583,
      },
    ],
  },
  [Station.ZincMine]: {
    link: "https://avorion.fandom.com/wiki/Zinc_Mine",
    variations: [
      {
        cost: 11250000,
        ingredients: [
          { type: Commodity.MiningRobot, amount: Infinity },
          { type: Commodity.MedicalSupplies, amount: Infinity },
          { type: Commodity.AntigravUnit, amount: Infinity },
          { type: Commodity.FusionGenerator, amount: Infinity },
          { type: Commodity.Acid, amount: Infinity },
          { type: Commodity.Solvent, amount: Infinity },
          { type: Commodity.Drill, amount: Infinity },
        ],
        results: [{ type: Commodity.Zinc, amount: 10 }],
        requiredPC: 167,
        profitPerCycle: 2500,
        ROICycles: 4500,
      },
    ],
  },
};
