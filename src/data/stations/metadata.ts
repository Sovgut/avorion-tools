import { Commodity } from "../commodities/enums";
import { STATION_OPTIONAL_COMMODITY } from "./constants";
import { Station } from "./enums";
import { IStationMetadata } from "./types";

export const StationMetadata: Record<Station, IStationMetadata> = {
    [Station.MedicalSuppliesFactory]: {
        link: "https://avorion.fandom.com/wiki/Medical_Supplies_Factory",
        variations: [
            {
                cost: 14536500,
                ingredients: [
                    [Commodity.Water, 5],
                    [Commodity.Chemicals, 15],
                    [Commodity.Fabric, 5],
                    [Commodity.Zinc, 5],
                    [Commodity.Chlorine, 5],
                ],
                results: [
                    [Commodity.MedicalSupplies, 4],
                ],
                requiredPC: 771,
                profitPerCycle: 3439,
                ROICycles: 4227
            },
        ]
    },
    [Station.MeatFactory]: {
        link: "https://avorion.fandom.com/wiki/Meat_Factory",
        variations: [
            {
                cost: 5912500,
                ingredients: [
                    [Commodity.Cattle, 10],
                ],
                results: [
                    [Commodity.Meat, 85],
                    [Commodity.Leather, 10],
                ],
                requiredPC: 228,
                profitPerCycle: 975,
                ROICycles: 6065
            },
        ]
    },
    [Station.LuxuryFoodFactory]: {
        link: "https://avorion.fandom.com/wiki/Luxury_Food_Factory",
        variations: [
            {
                cost: 8835000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Wheat, 50],
                    [Commodity.Fruit, 10],
                    [Commodity.Spices, 6],
                    [Commodity.Wine, 7],
                ],
                results: [
                    [Commodity.LuxuryFood, 1],
                ],
                requiredPC: 406,
                profitPerCycle: 1860,
                ROICycles: 4750
            },
        ]
    },
    [Station.JewelryManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Jewelry_Manufacturer",
        variations: [
            {
                cost: 7890000,
                ingredients: [
                    [Commodity.Platinum, 2],
                    [Commodity.Gem, 5],
                ],
                results: [
                    [Commodity.Jewelry, 4],
                ],
                requiredPC: 333,
                profitPerCycle: 1540,
                ROICycles: 5124
            },
            {
                cost: 7540000,
                ingredients: [
                    [Commodity.Gold, 1],
                    [Commodity.Diamond, 4],
                ],
                results: [
                    [Commodity.Jewelry, 4],
                ],
                requiredPC: 333,
                profitPerCycle: 1440,
                ROICycles: 5237
            },
        ]
    },
    [Station.GunFactory]: {
        link: "https://avorion.fandom.com/wiki/Gun_Factory",
        variations: [
            {
                cost: 8660000,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Ammunition, 1],
                    [Commodity.Aluminum, 1],
                    [Commodity.Plastic, 1],
                ],
                results: [
                    [Commodity.Gun, 5],
                ],
                requiredPC: 388,
                profitPerCycle: 1760,
                ROICycles: 4921
            },
        ]
    },
    [Station.GlassManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Glass_Manufacturer",
        variations: [
            {
                cost: 3956000,
                ingredients: [
                    [Commodity.Ore, 4],
                    [Commodity.Crystal, 4],
                ],
                results: [
                    [Commodity.Glass, 8],
                ],
                requiredPC: 97,
                profitPerCycle: 416,
                ROICycles: 9510
            },
        ]
    },
    [Station.FusionGeneratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Fusion_Generator_Factory",
        variations: [
            {
                cost: 42032500,
                ingredients: [
                    [Commodity.FusionCore, 4],
                    [Commodity.Steel, 10],
                    [Commodity.PlasmaCell, 15],
                    [Commodity.PowerUnit, 2],
                ],
                results: [
                    [Commodity.FusionGenerator, 1],
                ],
                requiredPC: 2465,
                profitPerCycle: 11295,
                ROICycles: 3722
            },
        ]
    },
    [Station.FusionCoreFactory]: {
        link: "https://avorion.fandom.com/wiki/Fusion_Core_Factory",
        variations: [
            {
                cost: 12727000,
                ingredients: [
                    [Commodity.Hydrogen, 1],
                    [Commodity.Gold, 1],
                    [Commodity.PlasmaCell, 2],
                    [Commodity.Transformator, 2],
                    [Commodity.EnergyTube, 2],
                ],
                results: [
                    [Commodity.FusionCore, 2],
                ],
                requiredPC: 644,
                profitPerCycle: 2922,
                ROICycles: 4356
            },
        ]
    },
    [Station.FungusFarm]: {
        link: "https://avorion.fandom.com/wiki/Fungus_Farm",
        variations: [
            {
                cost: 3679500,
                ingredients: [
                    [Commodity.BioGas, 1],
                    [Commodity.Mineral, 1],
                ],
                results: [
                    [Commodity.Fungus, 25],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 77,
                profitPerCycle: 337,
                ROICycles: 10919
            },
        ]
    },
    [Station.FruitFarm]: {
        link: "https://avorion.fandom.com/wiki/Fruit_Farm",
        variations: [
            {
                cost: 4040000,
                ingredients: [
                    [Commodity.EnergyCell, 4, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Water, 80],
                ],
                results: [
                    [Commodity.Fruit, 40],
                    [Commodity.Oxygen, 4, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 170,
                profitPerCycle: 960,
                ROICycles: 4209 
            },
        ]
    },
    [Station.FoodFactory]: {
        link: "https://avorion.fandom.com/wiki/Food_Factory",
        variations: [
            {
                cost: 5580000,
                ingredients: [
                    [Commodity.Wheat, 50],
                    [Commodity.Meat, 10],
                    [Commodity.Corn, 10],
                    [Commodity.Vegetable, 10],
                ],
                results: [
                    [Commodity.Food, 10],
                ],
                requiredPC: 193,
                profitPerCycle: 880,
                ROICycles: 6341 
            },
        ]
    },
    [Station.FoodBarFactory]: {
        link: "https://avorion.fandom.com/wiki/Food_Bar_Factory",
        variations: [
            {
                cost: 4600000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Wheat, 50],
                    [Commodity.Corn, 10],
                    [Commodity.Rice, 10],
                ],
                results: [
                    [Commodity.FoodBar, 10],
                ],
                requiredPC: 146,
                profitPerCycle: 650,
                ROICycles: 7077 
            },
        ]
    },
    [Station.FishFarm]: {
        link: "https://avorion.fandom.com/wiki/Fish_Farm",
        variations: [
            {
                cost: 4089000,
                ingredients: [
                    [Commodity.Water, 23],
                    [Commodity.Wheat, 5],
                    [Commodity.Oxygen, 5],
                ],
                results: [
                    [Commodity.Fish, 8],
                    [Commodity.BioGas, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Plankton, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 98,
                profitPerCycle: 504,
                ROICycles: 8114 
            },
        ]
    },
    [Station.FertilizerFactory]: {
        link: "https://avorion.fandom.com/wiki/Fertilizer_Factory",
        variations: [
            {
                cost: 5135500,
                ingredients: [
                    [Commodity.Chemicals, 2],
                    [Commodity.Mineral, 3],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Solvent, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Fertilizer, 11],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 234,
                profitPerCycle: 1205,
                ROICycles: 4262 
            },
            {
                cost: 5198500,
                ingredients: [
                    [Commodity.Plankton, 1],
                    [Commodity.Mineral, 4],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Fertilizer, 9],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 192,
                profitPerCycle: 821,
                ROICycles: 6332 
            },
        ]
    },
    [Station.FabricFactory]: {
        link: "https://avorion.fandom.com/wiki/Fabric_Factory",
        variations: [
            {
                cost: 5230000,
                ingredients: [
                    [Commodity.Sheep, 15],
                ],
                results: [
                    [Commodity.Fabric, 30],
                ],
                requiredPC: 177,
                profitPerCycle: 780,
                ROICycles: 6706 
            },
        ]
    },
    [Station.EnergyGeneratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Generator_Factory",
        variations: [
            {
                cost: 18484500,
                ingredients: [
                    [Commodity.EnergyCell, 15],
                    [Commodity.Microchip, 10],
                    [Commodity.Conductor, 10],
                ],
                results: [
                    [Commodity.EnergyGenerator, 1],
                ],
                requiredPC: 1004,
                profitPerCycle: 4567,
                ROICycles: 4048 
            },
        ]
    },
    [Station.DroneFactory]: {
        link: "https://avorion.fandom.com/wiki/Drone_Factory",
        variations: [
            {
                cost: 10249000,
                ingredients: [
                    [Commodity.Fuel, 1],
                    [Commodity.PlasmaCell, 2],
                    [Commodity.MetalPlate, 5],
                ],
                results: [
                    [Commodity.Drone, 1],
                    [Commodity.ScrapMetal, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 506,
                profitPerCycle: 2239,
                ROICycles: 4578 
            },
        ]
    },
    [Station.DrillFactory]: {
        link: "https://avorion.fandom.com/wiki/Drill_Factory",
        variations: [
            {
                cost: 22943500,
                ingredients: [
                    [Commodity.LaserHead, 1],
                    [Commodity.Processor, 1],
                    [Commodity.Steel, 2],
                    [Commodity.Diamond, 2],
                ],
                results: [
                    [Commodity.Drill, 1],
                    [Commodity.ScrapMetal, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 1319,
                profitPerCycle: 5866,
                ROICycles: 3912 
            },
        ]
    },
    [Station.Distillery]: {
        link: "https://avorion.fandom.com/wiki/Distillery",
        variations: [
            {
                cost: 11897500,
                ingredients: [
                    [Commodity.EnergyCell, 10],
                    [Commodity.Wheat, 50],
                    [Commodity.Water, 250],
                ],
                results: [
                    [Commodity.Liquor, 5],
                ],
                requiredPC: 611,
                profitPerCycle: 2685,
                ROICycles: 4432 
            },
        ]
    },
    [Station.DisplayFactory]: {
        link: "https://avorion.fandom.com/wiki/Display_Factory",
        variations: [
            {
                cost: 11722500,
                ingredients: [
                    [Commodity.Glass, 1],
                    [Commodity.Microchip, 5],
                    [Commodity.SemiConductor, 3],
                    [Commodity.PlasmaCell, 1],
                ],
                results: [
                    [Commodity.Display, 1],
                ],
                requiredPC: 495,
                profitPerCycle: 2635,
                ROICycles: 4449 
            },
        ]
    },
    [Station.DairyFarm]: {
        link: "https://avorion.fandom.com/wiki/Dairy_Farm",
        variations: [
            {
                cost: 6875000,
                ingredients: [
                    [Commodity.Cattle, 10],
                ],
                results: [
                    [Commodity.Dairy, 180],
                    [Commodity.Leather, 10],
                ],
                requiredPC: 246,
                profitPerCycle: 1250,
                ROICycles: 5500 
            },
        ]
    },
    [Station.CornFarm]: {
        link: "https://avorion.fandom.com/wiki/Corn_Farm",
        variations: [
            {
                cost: 3480000,
                ingredients: [
                    [Commodity.EnergyCell, 4, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Water, 60],
                ],
                results: [
                    [Commodity.Corn, 60],
                    [Commodity.Oxygen, 4, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 133,
                profitPerCycle: 800,
                ROICycles: 4350 
            },
        ]
    },
    [Station.ComputationMainframeFactory]: {
        link: "https://avorion.fandom.com/wiki/Computation_Mainframe_Factory",
        variations: [
            {
                cost: 40419000,
                ingredients: [
                    [Commodity.Processor, 2],
                    [Commodity.PowerUnit, 1],
                    [Commodity.Microchip, 1],
                    [Commodity.Display, 1],
                    [Commodity.Wire, 15],
                ],
                results: [
                    [Commodity.ComputationMainframe, 1],
                ],
                requiredPC: 2364,
                profitPerCycle: 10834,
                ROICycles: 3731 
            },
        ]
    },
    [Station.CoffeeFarm]: {
        link: "https://avorion.fandom.com/wiki/Coffee_Farm",
        variations: [
            {
                cost: 4187000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Water, 35],
                    [Commodity.Fertilizer, 2],
                ],
                results: [
                    [Commodity.Coffee, 10],
                    [Commodity.Oxygen, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 127,
                profitPerCycle: 612,
                ROICycles: 6842 
            },
        ]
    },
    [Station.CocoaFarm]: {
        link: "https://avorion.fandom.com/wiki/Cocoa_Farm",
        variations: [
            {
                cost: 4082000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Water, 30],
                    [Commodity.Fertilizer, 2],
                ],
                results: [
                    [Commodity.Cocoa, 20],
                    [Commodity.Oxygen, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 119,
                profitPerCycle: 582,
                ROICycles: 7014 
            },
            {
                cost: 4187000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Water, 35],
                    [Commodity.Fertilizer, 2],
                ],
                results: [
                    [Commodity.Coffee, 10],
                    [Commodity.Oxygen, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 127,
                profitPerCycle: 612,
                ROICycles: 6842 
            },
        ]
    },
    [Station.ClothesFactory]: {
        link: "https://avorion.fandom.com/wiki/Clothes_Factory",
        variations: [
            {
                cost: 12720000,
                ingredients: [
                    [Commodity.Fabric, 80],
                ],
                results: [
                    [Commodity.Clothes, 100],
                ],
                requiredPC: 654,
                profitPerCycle: 2920,
                ROICycles: 4357 
            },
        ]
    },
    [Station.ChemicalFactory]: {
        link: "https://avorion.fandom.com/wiki/Chemical_Factory",
        variations: [
            {
                cost: 6112000,
                ingredients: [
                    [Commodity.Water, 5],
                    [Commodity.Nitrogen, 5],
                    [Commodity.Hydrogen, 5],
                    [Commodity.Oxygen, 5],
                    [Commodity.BioGas, 1],
                    [Commodity.Carbon, 1],
                    [Commodity.EnergyCell, 10],
                ],
                results: [
                    [Commodity.Chemicals, 2],
                    [Commodity.Adhesive, 1],
                    [Commodity.Coolant, 2],
                    [Commodity.Solvent, 2],
                    [Commodity.Acid, 2],
                ],
                requiredPC: 235,
                profitPerCycle: 1032,
                ROICycles: 5923 
            },
        ]
    },
    [Station.CattleRanch]: {
        link: "https://avorion.fandom.com/wiki/Cattle_Ranch",
        variations: [
            {
                cost: 4554500,
                ingredients: [
                    [Commodity.Wheat, 15],
                    [Commodity.Oxygen, 10],
                    [Commodity.Water, 15],
                ],
                results: [
                    [Commodity.Cattle, 8],
                    [Commodity.BioGas, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 147,
                profitPerCycle: 800,
                ROICycles: 5694 
            },
            {
                cost: 5783000,
                ingredients: [
                    [Commodity.Corn, 15],
                    [Commodity.Oxygen, 10],
                    [Commodity.Water, 15],
                ],
                results: [
                    [Commodity.Cattle, 8],
                    [Commodity.BioGas, 2],
                ],
                requiredPC: 161,
                profitPerCycle: 938,
                ROICycles: 6166 
            }
        ]
    },
    [Station.Brewery]: {
        link: "https://avorion.fandom.com/wiki/Brewery",
        variations: [
            {
                cost: 9045000,
                ingredients: [
                    [Commodity.Water, 150],
                    [Commodity.Wheat, 50],
                    [Commodity.Fungus, 10],
                ],
                results: [
                    [Commodity.Beer, 30],
                ],
                requiredPC: 416,
                profitPerCycle: 1870,
                ROICycles: 4837 
            }
        ]
    },
    [Station.BookFactory]: {
        link: "https://avorion.fandom.com/wiki/Book_Factory",
        variations: [
            {
                cost: 3571000,
                ingredients: [
                    [Commodity.Paper, 20],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Book, 4],
                ],
                requiredPC: 83,
                profitPerCycle: 356,
                ROICycles: 10031 
            }
        ]
    },
    [Station.BodyArmorFactory]: {
        link: "https://avorion.fandom.com/wiki/Body_Armor_Factory",
        variations: [
            {
                cost: 98410500,
                ingredients: [
                    [Commodity.MetalPlate, 2],
                    [Commodity.Coolant, 1],
                    [Commodity.Teleporter, 1],
                    [Commodity.AntigravUnit, 1],
                    [Commodity.Carbon, 1],
                    [Commodity.Nanobot, 1],
                ],
                results: [
                    [Commodity.BodyArmor, 1],
                ],
                requiredPC: 5866,
                profitPerCycle: 27403,
                ROICycles: 3592 
            }
        ]
    },
    [Station.AntigravUnitFactory]: {
        link: "https://avorion.fandom.com/wiki/Antigrav_Unit_Factory",
        variations: [
            {
                cost: 27710500,
                ingredients: [
                    [Commodity.PowerUnit, 2],
                    [Commodity.Processor, 2],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.AntigravUnit, 1],
                ],
                requiredPC: 1582,
                profitPerCycle: 7253,
                ROICycles: 3821 
            }
        ]
    },
    [Station.AntigravGeneratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Antigrav_Generator_Factory",
        variations: [
            {
                cost: 74134500,
                ingredients: [
                    [Commodity.ElectroMagnet, 4],
                    [Commodity.Servo, 5],
                    [Commodity.Wire, 10],
                    [Commodity.AntigravUnit, 1],
                    [Commodity.EnergyGenerator, 1],
                ],
                results: [
                    [Commodity.AntigravGenerator, 1],
                ],
                requiredPC: 4422,
                profitPerCycle: 20467,
                ROICycles: 3623 
            }
        ]
    },
    [Station.AcceleratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Accelerator_Factory",
        variations: [
            {
                cost: 378820000,
                ingredients: [
                    [Commodity.Turbine, 3],
                    [Commodity.PlasmaCell, 3],
                    [Commodity.FusionGenerator, 3],
                    [Commodity.EnergyTube, 6],
                    [Commodity.HighPressureTube, 6],
                    [Commodity.Conductor, 15],
                    [Commodity.GaussRail, 9],
                ],
                results: [
                    [Commodity.NeutronAccelerator, 1],
                    [Commodity.ProtonAccelerator, 1],
                    [Commodity.ElectronAccelerator, 1],
                ],
                requiredPC: 23228,
                profitPerCycle: 107520,
                ROICycles: 3524
            }
        ]
    },
    [Station.AmmunitionFactory]: {
        link: "https://avorion.fandom.com/wiki/Ammunition_Factory",
        variations: [
            {
                cost: 15205000,
                ingredients: [
                    [Commodity.Lead, 10],
                    [Commodity.Aluminum, 10],
                    [Commodity.Steel, 10],
                    [Commodity.Adhesive, 5],
                    [Commodity.EnergyCell, 5],
                ],
                results: [
                    [Commodity.AmmunitionS, 15],
                    [Commodity.AmmunitionM, 10],
                    [Commodity.AmmunitionL, 5],
                ],
                requiredPC: 812,
                profitPerCycle: 3630,
                ROICycles: 4189
            },
            {
                cost: 21428000,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Chemicals, 15],
                    [Commodity.Paint, 15],
                ],
                results: [
                    [Commodity.Ammunition, 15],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 1233,
                profitPerCycle: 5408,
                ROICycles: 3963
            }
        ]
    },
    [Station.GasCollector]: {
        link: "https://avorion.fandom.com/wiki/Gas_Collector",
        variations: [
            {
                cost: 8275000,
                ingredients: [],
                results: [
                    [Commodity.Helium, 3],
                    [Commodity.Hydrogen, 3],
                    [Commodity.Neon, 3],
                    [Commodity.Chlorine, 3],
                ],
                requiredPC: 110,
                profitPerCycle: 1650,
                ROICycles: 5016
            },
            {
                cost: 9745000,
                ingredients: [],
                results: [
                    [Commodity.Helium, 3],
                    [Commodity.Nitrogen, 3],
                    [Commodity.Neon, 3],
                    [Commodity.Chlorine, 3],
                    [Commodity.Fluorine, 3],
                ],
                requiredPC: 138,
                profitPerCycle: 2070,
                ROICycles: 4708
            },
            {
                cost: 10060000,
                ingredients: [],
                results: [
                    [Commodity.Oxygen, 8],
                    [Commodity.Hydrogen, 8],
                    [Commodity.Nitrogen, 8],
                ],
                requiredPC: 144,
                profitPerCycle: 2160,
                ROICycles: 4658
            },
            {
                cost: 8800000,
                ingredients: [],
                results: [
                    [Commodity.Helium, 3],
                    [Commodity.Hydrogen, 3],
                    [Commodity.Chlorine, 3],
                    [Commodity.Fluorine, 3],
                ],
                requiredPC: 120,
                profitPerCycle: 1800,
                ROICycles: 4889
            },
        ]
    },
    [Station.MineralExtractor]: {
        link: "https://avorion.fandom.com/wiki/Mineral_Extractor",
        variations: [
            {
                cost: 9500000,
                ingredients: [],
                results: [
                    [Commodity.Mineral, 4]
                ],
                requiredPC: 134,
                profitPerCycle: 2000,
                ROICycles: 4750
            }
        ]
    },
    [Station.ScrapMetalTrader]: {
        link: "https://avorion.fandom.com/wiki/Scrap_Metal_Trader",
        variations: [
            {
                cost: 7750000,
                ingredients: [],
                results: [
                    [Commodity.ScrapMetal, 60]
                ],
                requiredPC: 100,
                profitPerCycle: 1500,
                ROICycles: 5167
            }
        ]
    },
    [Station.OilRefinery]: {
        link: "https://avorion.fandom.com/wiki/Oil_Refinery",
        variations: [
            {
                cost: 4950000,
                ingredients: [
                    [Commodity.EnergyCell, 5],
                    [Commodity.RawOil, 10],
                ],
                results: [
                    [Commodity.Oil, 5]
                ],
                requiredPC: 162,
                profitPerCycle: 700,
                ROICycles: 7072
            }
        ]
    },
    [Station.CarbonExtractor]: {
        link: "https://avorion.fandom.com/wiki/Carbon_Extractor",
        variations: [
            {
                cost: 4806500,
                ingredients: [
                    [Commodity.Corn, 52],
                ],
                results: [
                    [Commodity.Carbon, 5]
                ],
                requiredPC: 139,
                profitPerCycle: 659,
                ROICycles: 7294
            },
            {
                cost: 4915000,
                ingredients: [
                    [Commodity.Rice, 95],
                ],
                results: [
                    [Commodity.Carbon, 5]
                ],
                requiredPC: 139,
                profitPerCycle: 690,
                ROICycles: 7124
            },
            {
                cost: 4750500,
                ingredients: [
                    [Commodity.Wheat, 64],
                ],
                results: [
                    [Commodity.Carbon, 5]
                ],
                requiredPC: 139,
                profitPerCycle: 643,
                ROICycles: 7389
            },
            {
                cost: 4610500,
                ingredients: [
                    [Commodity.Potato, 63],
                ],
                results: [
                    [Commodity.Carbon, 5]
                ],
                requiredPC: 139,
                profitPerCycle: 603,
                ROICycles: 7646
            }
        ]
    },
    [Station.RubberFactory]: {
        link: "https://avorion.fandom.com/wiki/Rubber_Factory",
        variations: [
            {
                cost: 4383000,
                ingredients: [
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Oil, 3],
                ],
                results: [
                    [Commodity.Rubber, 3],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                    [Commodity.Acid, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 163,
                profitPerCycle: 990,
                ROICycles: 4428
            }
        ]
    },
    [Station.PlasticManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Plastic_Manufacturer",
        variations: [
            {
                cost: 4022500,
                ingredients: [
                    [Commodity.Oil, 3],
                    [Commodity.EnergyCell, 3, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Plastic, 15],
                ],
                requiredPC: 135,
                profitPerCycle: 585,
                ROICycles: 6877
            }
        ]
    },
    [Station.SolarCellFactory]: {
        link: "https://avorion.fandom.com/wiki/Solar_Cell_Factory",
        variations: [
            {
                cost: 7015000,
                ingredients: [
                    [Commodity.Zinc, 1],
                    [Commodity.Silicon, 2],
                    [Commodity.Platinum, 2],
                    [Commodity.Gold, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.SolarCell, 10],
                ],
                requiredPC: 310,
                profitPerCycle: 1340,
                ROICycles: 5236
            }
        ]
    },
    [Station.ToolsFactory]: {
        link: "https://avorion.fandom.com/wiki/Tools_Factory",
        variations: [
            {
                cost: 4470500,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Platinum, 1],
                    [Commodity.Silver, 1],
                    [Commodity.Aluminum, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Tools, 10],
                ],
                requiredPC: 138,
                profitPerCycle: 613,
                ROICycles: 7293
            }
        ]
    },
    [Station.SemiConductorManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Semi_Conductor_Manufacturer",
        variations: [
            {
                cost: 4278000,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Silicon, 1],
                    [Commodity.Gold, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.SemiConductor, 15],
                ],
                requiredPC: 125,
                profitPerCycle: 558,
                ROICycles: 7667
            }
        ]
    },
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
                    [Commodity.Platinum, 1, STATION_OPTIONAL_COMMODITY],
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
    [Station.TurretFactorySupplier]: {
        link: "https://avorion.fandom.com/wiki/Turret_Factory_Supplier",
        variations: [
            {
                ingredients: [],
                results: [],
            }
        ]
    },
    [Station.TurretFactory]: {
        link: "https://avorion.fandom.com/wiki/Turret_Factory",
        variations: [
            {
                cost: 25000000,
                ingredients: [],
                results: [],
            }
        ]
    },
    [Station.ConductorFactory]: {
        link: "https://avorion.fandom.com/wiki/Conductor_Factory",
        variations: [
            {
                cost: 5671000,
                ingredients: [
                    [Commodity.Zinc, 2],
                    [Commodity.Steel, 2],
                    [Commodity.Platinum, 1],
                    [Commodity.Gold, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Conductor, 20],
                ],
                requiredPC: 216,
                profitPerCycle: 956,
                ROICycles: 5933
            }
        ]
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
        link: "https://avorion.fandom.com/wiki/Planetary_Trading_Post",
        variations: [
            {
                ingredients: [
                    [Commodity.Carbon, Infinity],
                    [Commodity.Copper, Infinity],
                    [Commodity.Gem, Infinity],
                    [Commodity.Gold, Infinity],
                    [Commodity.Lead, Infinity],
                    [Commodity.Mineral, Infinity],
                    [Commodity.Ore, Infinity],
                    [Commodity.RawOil, Infinity],
                    [Commodity.Silicon, Infinity],
                ],
                results: [
                    [Commodity.Drill, Infinity],
                    [Commodity.Drone, Infinity],
                    [Commodity.EnergyCell, Infinity],
                    [Commodity.EnergyGenerator, Infinity],
                    [Commodity.ExplosiveCharge, Infinity],
                    [Commodity.Fuel, Infinity],
                    [Commodity.MiningRobot, Infinity],
                    [Commodity.SolarPanel, Infinity],
                    [Commodity.Tools, Infinity],
                ],
            }
        ]
    },
    [Station.CrystalFarm]: {
        link: "https://avorion.fandom.com/wiki/Crystal_Farm",
        variations: [
            {
                cost: 9150000,
                ingredients: [],
                results: [
                    [Commodity.Crystal, 10]
                ],
                requiredPC: 127,
                profitPerCycle: 1900,
                ROICycles: 4816
            }
        ]
    },
    [Station.ElectroMagnetFactory]: {
        link: "https://avorion.fandom.com/wiki/Electro_Magnet_Factory",
        variations: [
            {
                cost: 4428500,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Copper, 1],
                    [Commodity.Conductor, 2],
                    [Commodity.Transformator, 2],
                ],
                results: [
                    [Commodity.ElectroMagnet, 4],
                ],
                requiredPC: 123,
                profitPerCycle: 551,
                ROICycles: 8038
            }
        ]
    },
    [Station.ElectromagneticChargeFactory]: {
        link: "https://avorion.fandom.com/wiki/Electromagnetic_Charge_Factory",
        variations: [
            {
                cost: 30479000,
                ingredients: [
                    [Commodity.EnergyContainer, 10],
                    [Commodity.ElectroMagnet, 6],
                    [Commodity.EnergyTube, 2],
                    [Commodity.Transformator, 2],
                ],
                results: [
                    [Commodity.ElectromagneticCharge, 2],
                ],
                requiredPC: 1760,
                profitPerCycle: 7994,
                ROICycles: 3813
            }
        ]
    },
    [Station.SolarPowerPlant]: {
        link: "https://avorion.fandom.com/wiki/Solar_Power_Plant",
        variations: [
            {
                cost: 6875000,
                ingredients: [],
                results: [
                    [Commodity.EnergyCell, 25],
                ],
                requiredPC: 84,
                profitPerCycle: 1250,
                ROICycles: 5500
            }
        ]
    },
    [Station.EnergyContainerFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Container_Factory",
        variations: [
            {
                cost: 5755000,
                ingredients: [
                    [Commodity.EnergyCell, 9],
                    [Commodity.Transformator, 9],
                ],
                results: [
                    [Commodity.EnergyContainer, 3],
                ],
                requiredPC: 208,
                profitPerCycle: 930,
                ROICycles: 6189
            }
        ]
    },
    [Station.EnergyInverterFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Inverter_Factory",
        variations: [
            {
                cost: 7606500,
                ingredients: [
                    [Commodity.EnergyTube, 1],
                    [Commodity.Conductor, 2],
                    [Commodity.Transformator, 2],
                ],
                results: [
                    [Commodity.EnergyInverter, 4],
                ],
                requiredPC: 322,
                profitPerCycle: 1459,
                ROICycles: 5214
            }
        ]
    },
    [Station.EnergyTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/Energy_Tube_Factory",
        variations: [
            {
                cost: 5219500,
                ingredients: [
                    [Commodity.Plastic, 1],
                    [Commodity.Steel, 1],
                    [Commodity.Platinum, 1],
                    [Commodity.Neon, 1],
                    [Commodity.SteelTube, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.EnergyTube, 1],
                ],
                requiredPC: 184,
                profitPerCycle: 827,
                ROICycles: 6312
            }
        ]
    },
    [Station.ExplosiveChargeFactory]: {
        link: "https://avorion.fandom.com/wiki/Explosive_Charge_Factory",
        variations: [
            {
                cost: 8201500,
                ingredients: [
                    [Commodity.Fluorine, 4],
                    [Commodity.Steel, 1],
                    [Commodity.EnergyCell, 2],
                    [Commodity.Plastic, 2],
                    [Commodity.Chemicals, 2],
                    [Commodity.Acid, 2],
                    [Commodity.Adhesive, 2],
                ],
                results: [
                    [Commodity.ExplosiveCharge, 4],
                ],
                requiredPC: 365,
                profitPerCycle: 1629,
                ROICycles: 5035
            }
        ]
    },
    [Station.ForceGeneratorFactory]: {
        link: "https://avorion.fandom.com/wiki/Force_Generator_Factory",
        variations: [
            {
                cost: 8201500,
                ingredients: [
                    [Commodity.Fluorine, 4],
                    [Commodity.Steel, 1],
                    [Commodity.EnergyCell, 2],
                    [Commodity.Plastic, 2],
                    [Commodity.Chemicals, 2],
                    [Commodity.Acid, 2],
                    [Commodity.Adhesive, 2],
                ],
                results: [
                    [Commodity.ExplosiveCharge, 4],
                ],
                requiredPC: 365,
                profitPerCycle: 1629,
                ROICycles: 5035
            }
        ]
    },
    [Station.FuelFactory]: {
        link: "https://avorion.fandom.com/wiki/Fuel_Factory",
        variations: [
            {
                cost: 3732000,
                ingredients: [
                    [Commodity.EnergyCell, 2],
                    [Commodity.Oil, 1],
                    [Commodity.Nitrogen, 1],
                    [Commodity.Fluorine, 1],
                ],
                results: [
                    [Commodity.Fuel, 1],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 83,
                profitPerCycle: 352,
                ROICycles: 10603
            }
        ]
    },
    [Station.GaussRailFactory]: {
        link: "https://avorion.fandom.com/wiki/Gauss_Rail_Factory",
        variations: [
            {
                cost: 17980500,
                ingredients: [
                    [Commodity.EnergyCell, 10],
                    [Commodity.ElectroMagnet, 6],
                    [Commodity.EnergyTube, 2],
                    [Commodity.HighPressureTube, 1],
                    [Commodity.Transformator, 1],
                ],
                results: [
                    [Commodity.GaussRail, 2],
                ],
                requiredPC: 973,
                profitPerCycle: 4423,
                ROICycles: 4066
            }
        ]
    },
    [Station.HighCapacityLensFactory]: {
        link: "https://avorion.fandom.com/wiki/High_Capacity_Lens_Factory",
        variations: [
            {
                cost: 7193500,
                ingredients: [
                    [Commodity.Glass, 4],
                    [Commodity.Carbon, 2],
                    [Commodity.Plastic, 2],
                    [Commodity.Diamond, 2],
                ],
                results: [
                    [Commodity.HighCapacityLens, 1],
                ],
                requiredPC: 304,
                profitPerCycle: 1341,
                ROICycles: 5365
            }
        ]
    },
    [Station.HighPressureTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/High_Pressure_Tube_Factory",
        variations: [
            {
                cost: 7452500,
                ingredients: [
                    [Commodity.Steel, 1],
                    [Commodity.Aluminum, 1],
                    [Commodity.Carbon, 2],
                    [Commodity.Adhesive, 2],
                    [Commodity.SteelTube, 2],
                ],
                results: [
                    [Commodity.HighPressureTube, 3],
                ],
                requiredPC: 315,
                profitPerCycle: 1415,
                ROICycles: 5267
            }
        ]
    },
    [Station.TeslaCoilFactory]: {
        link: "https://avorion.fandom.com/wiki/Tesla_Coil_Factory",
        variations: [
            {
                cost: 23132500,
                ingredients: [
                    [Commodity.Steel, 10],
                    [Commodity.Copper, 3],
                    [Commodity.FusionCore, 2],
                    [Commodity.Plastic, 5],
                ],
                results: [
                    [Commodity.MilitaryTeslaCoil, 1],
                    [Commodity.IndustrialTeslaCoil, 1],
                ],
                requiredPC: 1286,
                profitPerCycle: 5895,
                ROICycles: 3925
            }
        ]
    },
    [Station.LaserCompressorFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Compressor_Factory",
        variations: [
            {
                cost: 9059000,
                ingredients: [
                    [Commodity.PlasmaCell, 1],
                    [Commodity.Transformator, 1],
                    [Commodity.EnergyTube, 1],
                    [Commodity.Wire, 15],
                ],
                results: [
                    [Commodity.LaserCompressor, 1],
                    [Commodity.ScrapMetal, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 428,
                profitPerCycle: 1899,
                ROICycles: 4771
            }
        ]
    },
    [Station.LaserHeadFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Head_Factory",
        variations: [
            {
                cost: 7015000,
                ingredients: [
                    [Commodity.Glass, 1],
                    [Commodity.Conductor, 1],
                    [Commodity.Aluminum, 15],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.LaserHead, 1],
                    [Commodity.ToxicWaste, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 307,
                profitPerCycle: 1340,
                ROICycles: 5236
            }
        ]
    },
    [Station.LaserModulatorFactory]: {
        link: "https://avorion.fandom.com/wiki/Laser_Modulator_Factory",
        variations: [
            {
                cost: 19251000,
                ingredients: [
                    [Commodity.Servo, 4],
                    [Commodity.EnergyTube, 2],
                    [Commodity.Transformator, 2],
                    [Commodity.EnergyCell, 4],
                ],
                results: [
                    [Commodity.LaserModulator, 1],
                ],
                requiredPC: 1053,
                profitPerCycle: 4786,
                ROICycles: 4023
            }
        ]
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
        link: "https://avorion.fandom.com/wiki/Nanobot_Factory",
        variations: [
            {
                cost: 9167500,
                ingredients: [
                    [Commodity.Crystal, 15],
                    [Commodity.SemiConductor, 15],
                ],
                results: [
                    [Commodity.Nanobot, 5],
                ],
                requiredPC: 425,
                profitPerCycle: 1905,
                ROICycles: 4813
            }
        ]
    },
    [Station.PlasmaCellFactory]: {
        link: "https://avorion.fandom.com/wiki/Plasma_Cell_Factory",
        variations: [
            {
                cost: 4250000,
                ingredients: [
                    [Commodity.EnergyCell, 10],
                    [Commodity.Steel, 1],
                    [Commodity.BioGas, 1],
                    [Commodity.Neon, 1],
                    [Commodity.Helium, 1],
                ],
                results: [
                    [Commodity.PlasmaCell, 10],
                ],
                requiredPC: 112,
                profitPerCycle: 500,
                ROICycles: 8500
            }
        ]
    },
    [Station.PowerUnitFactory]: {
        link: "https://avorion.fandom.com/wiki/Power_Unit_Factory",
        variations: [
            {
                cost: 3707500,
                ingredients: [
                    [Commodity.Transformator, 2],
                    [Commodity.EnergyCell, 2],
                    [Commodity.PlasmaCell, 2],
                ],
                results: [
                    [Commodity.PowerUnit, 1],
                ],
                requiredPC: 77,
                profitPerCycle: 345,
                ROICycles: 10747
            }
        ]
    },
    [Station.RocketFactory]: {
        link: "https://avorion.fandom.com/wiki/Rocket_Factory",
        variations: [
            {
                cost: 13752500,
                ingredients: [
                    [Commodity.Warhead, 1],
                    [Commodity.Fuel, 1],
                    [Commodity.Steel, 1],
                    [Commodity.Microchip, 1],
                ],
                results: [
                    [Commodity.Rocket, 1],
                ],
                requiredPC: 708,
                profitPerCycle: 3215,
                ROICycles: 4278
            }
        ]
    },
    [Station.ServoFactory]: {
        link: "https://avorion.fandom.com/wiki/Servo_Factory",
        variations: [
            {
                cost: 5275500,
                ingredients: [
                    [Commodity.Steel, 4],
                    [Commodity.Aluminum, 2],
                    [Commodity.Conductor, 2],
                    [Commodity.Plastic, 1],
                ],
                results: [
                    [Commodity.Servo, 2],
                ],
                requiredPC: 177,
                profitPerCycle: 793,
                ROICycles: 6653
            }
        ]
    },
    [Station.SteelFactory]: {
        link: "https://avorion.fandom.com/wiki/Steel_Factory",
        variations: [
            {
                cost: 4715500,
                ingredients: [
                    [Commodity.Ore, 8],
                    [Commodity.Coal, 3],
                    [Commodity.Carbon, 1],
                ],
                results: [
                    [Commodity.Steel, 8],
                ],
                requiredPC: 147,
                profitPerCycle: 633,
                ROICycles: 7450
            },
            {
                cost: 4467000,
                ingredients: [
                    [Commodity.ScrapMetal, 12],
                    [Commodity.Coal, 4],
                ],
                results: [
                    [Commodity.Steel, 6],
                ],
                requiredPC: 110,
                profitPerCycle: 562,
                ROICycles: 7949
            }
        ]
    },
    [Station.SteelTubeFactory]: {
        link: "https://avorion.fandom.com/wiki/Steel_Tube_Factory",
        variations: [
            {
                cost: 4614000,
                ingredients: [
                    [Commodity.Steel, 4],
                    [Commodity.Aluminum, 2],
                ],
                results: [
                    [Commodity.SteelTube, 3],
                ],
                requiredPC: 136,
                profitPerCycle: 604,
                ROICycles: 7640
            }
        ]
    },
    [Station.ComputerComponentFactory]: {
        link: "https://avorion.fandom.com/wiki/Computer_Component_Factory",
        variations: [
            {
                cost: 40114500,
                ingredients: [
                    [Commodity.Wire, 15],
                    [Commodity.Microchip, 7],
                    [Commodity.SemiConductor, 5],
                    [Commodity.Copper, 5],
                    [Commodity.Platinum, 5],
                    [Commodity.Gold, 5],
                ],
                results: [
                    [Commodity.Display, 1],
                    [Commodity.TargetingCard, 1],
                    [Commodity.Processor, 1],
                ],
                requiredPC: 1736,
                profitPerCycle: 10747,
                ROICycles: 3733
            }
        ]
    },
    [Station.TargetingCardFactory]: {
        link: "https://avorion.fandom.com/wiki/Targeting_Card_Factory",
        variations: [
            {
                cost: 26244000,
                ingredients: [
                    [Commodity.Microchip, 1],
                    [Commodity.Copper, 1],
                    [Commodity.Processor, 2],
                ],
                results: [
                    [Commodity.TargetingCard, 2],
                ],
                requiredPC: 1494,
                profitPerCycle: 6784,
                ROICycles: 3869
            }
        ]
    },
    [Station.TransformatorFactory]: {
        link: "https://avorion.fandom.com/wiki/Transformator_Factory",
        variations: [
            {
                cost: 4421500,
                ingredients: [
                    [Commodity.Steel, 2],
                    [Commodity.Plastic, 1],
                    [Commodity.Silicon, 1],
                    [Commodity.Silver, 1],
                    [Commodity.EnergyCell, 1, STATION_OPTIONAL_COMMODITY],
                ],
                results: [
                    [Commodity.Transformator, 10],
                ],
                requiredPC: 134,
                profitPerCycle: 599,
                ROICycles: 7382
            }
        ]
    },
    [Station.WarheadFactory]: {
        link: "https://avorion.fandom.com/wiki/Warhead_Factory",
        variations: [
            {
                cost: 8135000,
                ingredients: [
                    [Commodity.Conductor, 5],
                    [Commodity.Chemicals, 2],
                    [Commodity.MetalPlate, 3],
                ],
                results: [
                    [Commodity.Warhead, 1],
                    [Commodity.ScrapMetal, 1, STATION_OPTIONAL_COMMODITY],
                ],
                requiredPC: 368,
                profitPerCycle: 1635,
                ROICycles: 4976
            }
        ]
    },
    [Station.WireManufacturer]: {
        link: "https://avorion.fandom.com/wiki/Wire_Manufacturer",
        variations: [
            {
                cost: 3938500,
                ingredients: [
                    [Commodity.Plastic, 1],
                    [Commodity.Steel, 1],
                    [Commodity.Gold, 1],
                ],
                results: [
                    [Commodity.Wire, 15],
                ],
                requiredPC: 92,
                profitPerCycle: 411,
                ROICycles: 9583
            }
        ]
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