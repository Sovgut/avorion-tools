import { Station } from "../stations/enums";
import { Commodity } from "./enums";
import { ICommodityMetadata } from "./types";

export const CommodityMetadata: Record<Commodity, ICommodityMetadata> = {
  [Commodity.Acid]: {
    icon: "/img/icon/acid.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ChemicalFactory, Station.RubberFactory],
  },
  [Commodity.AcronDrug]: {
    icon: "/img/icon/powder.png",
    price: 6000,
    volume: 0.1,
    illegal: true,
    dangerous: false,
    stations: [],
  },
  [Commodity.Adhesive]: {
    icon: "/img/icon/adhesive.png",
    price: 402,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    stations: [Station.ChemicalFactory],
  },
  [Commodity.Aluminum]: {
    icon: "/img/icon/aluminium.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.AluminumMine],
  },
  [Commodity.Ammunition]: {
    icon: "/img/icon/ammo-box.png",
    price: 3786,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [Station.AmmunitionFactory],
  },
  [Commodity.AmmunitionL]: {
    icon: "/img/icon/ammunition-l.png",
    price: 422,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.AmmunitionFactory],
  },
  [Commodity.AmmunitionM]: {
    icon: "/img/icon/ammunition-m.png",
    price: 422,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.AmmunitionFactory],
  },
  [Commodity.AmmunitionS]: {
    icon: "/img/icon/ammunition-s.png",
    price: 422,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.AmmunitionFactory],
  },
  [Commodity.AntigravGenerator]: {
    icon: "/img/icon/anti-grav-generator.png",
    price: 71632,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.AntigravGeneratorFactory],
  },
  [Commodity.AntigravUnit]: {
    icon: "/img/icon/antigrav-unit.png",
    price: 25391,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.AntigravUnitFactory],
  },
  [Commodity.AvorionOre]: {
    icon: "/img/icon/rock.png",
    price: 12,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Beer]: {
    icon: "/img/icon/beer-stein.png",
    price: 216,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.Brewery],
  },
  [Commodity.BioGas]: {
    icon: "/img/icon/bio-gas.png",
    price: 213,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.FishFarm, Station.SheepRanch, Station.CattleRanch],
  },
  [Commodity.BodyArmor]: {
    icon: "/img/icon/kevlar-vest.png",
    price: 95906,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.BodyArmorFactory],
  },
  [Commodity.Book]: {
    icon: "/img/icon/open-book.png",
    price: 319,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.BookFactory],
  },
  [Commodity.Carbon]: {
    icon: "/img/icon/carbon.png",
    price: 423,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.CarbonExtractor],
  },
  [Commodity.Cattle]: {
    icon: "/img/icon/cattle.png",
    price: 254,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.CattleRanch],
  },
  [Commodity.Chemicals]: {
    icon: "/img/icon/chemical.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ChemicalFactory],
  },
  [Commodity.Chlorine]: {
    icon: "/img/icon/chlorine.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GasCollector],
  },
  [Commodity.Clothes]: {
    icon: "/img/icon/trousers.png",
    price: 102,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ClothesFactory],
  },
  [Commodity.Coal]: {
    icon: "/img/icon/fossil-fuel.png",
    price: 200,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.CoalMine],
  },
  [Commodity.Cocoa]: {
    icon: "/img/icon/cocoa.png",
    price: 87,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.CocoaFarm],
  },
  [Commodity.Coffee]: {
    icon: "/img/icon/coffee-beans.png",
    price: 187,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.CoffeeFarm],
  },
  [Commodity.ComputationMainframe]: {
    icon: "/img/icon/computation-mainframe.png",
    price: 37940,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ComputationMainframeFactory],
  },
  [Commodity.Conductor]: {
    icon: "/img/icon/conductor.png",
    price: 168,
    volume: 0.15,
    illegal: false,
    dangerous: false,
    stations: [Station.ConductorFactory],
  },
  [Commodity.Coolant]: {
    icon: "/img/icon/snowflake-2.png",
    price: 402,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.ChemicalFactory],
  },
  [Commodity.Copper]: {
    icon: "/img/icon/copper.png",
    price: 350,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.CopperMine],
  },
  [Commodity.Corn]: {
    icon: "/img/icon/corn.png",
    price: 28,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.CornFarm],
  },
  [Commodity.Crystal]: {
    icon: "/img/icon/crystal.png",
    price: 190,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.CrystalFarm],
  },
  [Commodity.Dairy]: {
    icon: "/img/icon/udder.png",
    price: 19,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.DairyFarm],
  },
  [Commodity.Diamond]: {
    icon: "/img/icon/diamond.png",
    price: 750,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Display]: {
    icon: "/img/icon/checkbox-tree.png",
    price: 7858,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.DisplayFactory, Station.ComputerComponentFactory],
  },
  [Commodity.Drill]: {
    icon: "/img/icon/drill.png",
    price: 20443,
    volume: 20,
    illegal: false,
    dangerous: false,
    stations: [Station.DrillFactory],
  },
  [Commodity.Drone]: {
    icon: "/img/icon/spoutnik.png",
    price: 7754,
    volume: 10,
    illegal: false,
    dangerous: false,
    stations: [Station.DroneFactory],
  },
  [Commodity.ElectroMagnet]: {
    icon: "/img/icon/electro-magnet.png",
    price: 483,
    volume: 0.75,
    illegal: false,
    dangerous: false,
    stations: [Station.ElectroMagnetFactory],
  },
  [Commodity.ElectromagneticCharge]: {
    icon: "/img/icon/electromagnetic-charge.png",
    price: 13985,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ElectromagneticChargeFactory],
  },
  [Commodity.ElectronAccelerator]: {
    icon: "/img/icon/electron-accelerator.png",
    price: 125431,
    volume: 12,
    illegal: false,
    dangerous: false,
    stations: [Station.AcceleratorFactory],
  },
  [Commodity.EnergyCell]: {
    icon: "/img/icon/battery-pack-alt.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.SolarPowerPlant],
  },
  [Commodity.EnergyContainer]: {
    icon: "/img/icon/electric.png",
    price: 1087,
    volume: 4.5,
    illegal: false,
    dangerous: false,
    stations: [Station.EnergyContainerFactory],
  },
  [Commodity.EnergyGenerator]: {
    icon: "/img/icon/energy-generator.png",
    price: 15957,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.EnergyGeneratorFactory],
  },
  [Commodity.EnergyInverter]: {
    icon: "/img/icon/energy-inverter.png",
    price: 1277,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [Station.EnergyInverterFactory],
  },
  [Commodity.EnergyTube]: {
    icon: "/img/icon/energy-tube.png",
    price: 2895,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.EnergyTubeFactory],
  },
  [Commodity.ExplosiveCharge]: {
    icon: "/img/icon/explosive-charge.png",
    price: 1423,
    volume: 1.5,
    illegal: false,
    dangerous: true,
    stations: [Station.ExplosiveChargeFactory],
  },
  [Commodity.Fabric]: {
    icon: "/img/icon/fabric.png",
    price: 91,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.FabricFactory, Station.SheepRanch],
  },
  [Commodity.Fertilizer]: {
    icon: "/img/icon/fertilizer.png",
    price: 319,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.FertilizerFactory],
  },
  [Commodity.Fish]: {
    icon: "/img/icon/fish.png",
    price: 152,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FishFarm],
  },
  [Commodity.Fluorine]: {
    icon: "/img/icon/fluorine.png",
    price: 250,
    volume: 1,
    illegal: false,
    dangerous: true,
    stations: [Station.GasCollector],
  },
  [Commodity.Food]: {
    icon: "/img/icon/chicken-leg.png",
    price: 300,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FoodFactory],
  },
  [Commodity.FoodBar]: {
    icon: "/img/icon/bar.png",
    price: 223,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FoodBarFactory],
  },
  [Commodity.ForceGenerator]: {
    icon: "/img/icon/force-generator.png",
    price: 49576,
    volume: 4,
    illegal: false,
    dangerous: false,
    stations: [Station.ForceGeneratorFactory],
  },
  [Commodity.Fruit]: {
    icon: "/img/icon/shiny-apple.png",
    price: 56,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FruitFarm],
  },
  [Commodity.Fuel]: {
    icon: "/img/icon/fuel.png",
    price: 1232,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.FuelFactory],
  },
  [Commodity.Fungus]: {
    icon: "/img/icon/mushroom.png",
    price: 46,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.FungusFarm],
  },
  [Commodity.FusionCore]: {
    icon: "/img/icon/fusion-core.png",
    price: 5114,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FusionCoreFactory],
  },
  [Commodity.FusionGenerator]: {
    icon: "/img/icon/fusion-generator.png",
    price: 39553,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.FusionGeneratorFactory],
  },
  [Commodity.GaussRail]: {
    icon: "/img/icon/gauss-rail.png",
    price: 7735,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.GaussRailFactory],
  },
  [Commodity.Gem]: {
    icon: "/img/icon/saphir.png",
    price: 400,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Glass]: {
    icon: "/img/icon/metal-disc.png",
    price: 182,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GlassManufacturer],
  },
  [Commodity.Gold]: {
    icon: "/img/icon/metal-bar.png",
    price: 600,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.NobleMetalMine],
  },
  [Commodity.Gun]: {
    icon: "/img/icon/bolter-gun.png",
    price: 1232,
    volume: 0.5,
    illegal: false,
    dangerous: true,
    stations: [Station.GunFactory],
  },
  [Commodity.Helium]: {
    icon: "/img/icon/helium.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GasCollector],
  },
  [Commodity.HighCapacityLens]: {
    icon: "/img/icon/high-capacity-lens.png",
    price: 4689,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.HighCapacityLensFactory],
  },
  [Commodity.HighPressureTube]: {
    icon: "/img/icon/high-pressure-tube.png",
    price: 1650,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.HighPressureTubeFactory],
  },
  [Commodity.Hydrogen]: {
    icon: "/img/icon/hydrogen.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GasCollector],
  },
  [Commodity.IndustrialTeslaCoil]: {
    icon: "/img/icon/industrial-tesla-coil.png",
    price: 10314,
    volume: 5.5,
    illegal: false,
    dangerous: true,
    stations: [Station.TeslaCoilFactory],
  },
  [Commodity.IronOre]: {
    icon: "/img/icon/rock.png",
    price: 2,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Jewelry]: {
    icon: "/img/icon/gem-chain.png",
    price: 1260,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.JewelryManufacturer],
  },
  [Commodity.LaserCompressor]: {
    icon: "/img/icon/laser-compressor.png",
    price: 6577,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.LaserCompressorFactory],
  },
  [Commodity.LaserHead]: {
    icon: "/img/icon/laser-head.png",
    price: 4690,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.LaserHeadFactory],
  },
  [Commodity.LaserModulator]: {
    icon: "/img/icon/laser-modulator.png",
    price: 16742,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [Station.LaserModulatorFactory],
  },
  [Commodity.Lead]: {
    icon: "/img/icon/lead.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.LeadMine],
  },
  [Commodity.Leather]: {
    icon: "/img/icon/animal-hide.png",
    price: 37,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.MeatFactory, Station.DairyFarm],
  },
  [Commodity.Liquor]: {
    icon: "/img/icon/martini.png",
    price: 1867,
    volume: 1.25,
    illegal: false,
    dangerous: false,
    stations: [Station.Distillery],
  },
  [Commodity.LuxuryFood]: {
    icon: "/img/icon/luxury-food.png",
    price: 6452,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.LuxuryFoodFactory],
  },
  [Commodity.Meat]: {
    icon: "/img/icon/meat.png",
    price: 37,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.MeatFactory],
  },
  [Commodity.MedicalSupplies]: {
    icon: "/img/icon/medical-supplies.png",
    price: 3006,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.MedicalSuppliesFactory],
  },
  [Commodity.MetalPlate]: {
    icon: "/img/icon/metal-scales.png",
    price: 792,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [Station.MetalPlateFactory],
  },
  [Commodity.Microchip]: {
    icon: "/img/icon/microchip.png",
    price: 896,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    stations: [Station.MicrochipFactory],
  },
  [Commodity.MilitaryTeslaCoil]: {
    icon: "/img/icon/industrial-tesla-coil.png",
    price: 10314,
    volume: 4.5,
    illegal: false,
    dangerous: true,
    stations: [Station.TeslaCoilFactory],
  },
  [Commodity.Mineral]: {
    icon: "/img/icon/spices.png",
    price: 500,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.MineralExtractor],
  },
  [Commodity.MiningRobot]: {
    icon: "/img/icon/robot-golem.png",
    price: 145977,
    volume: 8,
    illegal: false,
    dangerous: false,
    stations: [Station.MiningRobotFactory],
  },
  [Commodity.MornDrug]: {
    icon: "/img/icon/powder.png",
    price: 5000,
    volume: 0.1,
    illegal: true,
    dangerous: false,
    stations: [],
  },
  [Commodity.Nanobot]: {
    icon: "/img/icon/nanobots.png",
    price: 1338,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.NanobotFactory],
  },
  [Commodity.NaoniteOre]: {
    icon: "/img/icon/rock.png",
    price: 4,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Neon]: {
    icon: "/img/icon/neon.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GasCollector],
  },
  [Commodity.NeutronAccelerator]: {
    icon: "/img/icon/neutron-accelerator.png",
    price: 125431,
    volume: 15,
    illegal: false,
    dangerous: false,
    stations: [Station.AcceleratorFactory],
  },
  [Commodity.Nitrogen]: {
    icon: "/img/icon/nitrogen.png",
    price: 40,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.GasCollector],
  },
  [Commodity.OgoniteOre]: {
    icon: "/img/icon/rock.png",
    price: 9,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [Station.Sector],
  },
  [Commodity.Oil]: {
    icon: "/img/icon/oil-drum.png",
    price: 490,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.OilRefinery],
  },
  [Commodity.Ore]: {
    icon: "/img/icon/rock.png",
    price: 70,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.OreMine],
  },
  [Commodity.Oxygen]: {
    icon: "/img/icon/oxygen.png",
    price: 80,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [
      Station.PlantFarm,
      Station.RiceFarm,
      Station.PotatoFarm,
      Station.WheatFarm,
      Station.CornFarm,
      Station.WoodFarm,
      Station.FruitFarm,
      Station.CoffeeFarm,
      Station.CocoaFarm,
      Station.TeaFarm,
      Station.VegetableFarm,
      Station.SpicesFarm,
      Station.GasCollector,
    ],
  },
  [Commodity.Paint]: {
    icon: "/img/icon/paint.png",
    price: 481,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.PaintManufacturer],
  },
  [Commodity.Paper]: {
    icon: "/img/icon/papers.png",
    price: 46,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.PaperFactory],
  },
  [Commodity.Plankton]: {
    icon: "/img/icon/turtle-shell.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.PlanktonCollector, Station.FishFarm],
  },
  [Commodity.Plant]: {
    icon: "/img/icon/plant.png",
    price: 14,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    stations: [Station.PlantFarm],
  },
  [Commodity.PlasmaCell]: {
    icon: "/img/icon/plasma-cell.png",
    price: 174,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    stations: [Station.PlasmaCellFactory],
  },
  [Commodity.Plastic]: {
    icon: "/img/icon/cargo-hold.png",
    price: 137,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.PlasticManufacturer],
  },
  [Commodity.Platinum]: {
    icon: "/img/icon/metal-bar.png",
    price: 750,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.NobleMetalMine],
  },
  [Commodity.Potato]: {
    icon: "/img/icon/potato.png",
    price: 24,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.PotatoFarm],
  },
  [Commodity.PowerUnit]: {
    icon: "/img/icon/power-unit.png",
    price: 1211,
    volume: 5,
    illegal: false,
    dangerous: false,
    stations: [Station.PowerUnitFactory],
  },
  [Commodity.Processor]: {
    icon: "/img/icon/processor.png",
    price: 7858,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    stations: [Station.ProcessorFactory, Station.ComputerComponentFactory],
  },
  [Commodity.Protein]: {
    icon: "/img/icon/bar.png",
    price: 34,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    stations: [Station.ProteinFactory],
  },
  [Commodity.ProtonAccelerator]: {
    icon: "/img/icon/proton-accelerator.png",
    price: 125431,
    volume: 15,
    illegal: false,
    dangerous: false,
    stations: [Station.AcceleratorFactory],
  },
  [Commodity.RawOil]: {
    icon: "/img/icon/oil-drum.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.OilRig],
  },
  [Commodity.Rice]: {
    icon: "/img/icon/powder.png",
    price: 15,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.RiceFarm],
  },
  [Commodity.RiftAvorionOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 12,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftIronOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 2,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftNaoniteOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 4,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftOgoniteOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 9,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftResearchData]: {
    icon: "/img/icon/info-chip.png",
    price: 5000,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftTitaniumOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 3,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftTriniumOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 5,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.RiftXanionOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 7,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    stations: [Station.Rift],
  },
  [Commodity.Rocket]: {
    icon: "/img/icon/rocket.png",
    price: 11250,
    volume: 4,
    illegal: false,
    dangerous: true,
    stations: [Station.RocketFactory],
  },
  [Commodity.Rubber]: {
    icon: "/img/icon/cubes.png",
    price: 686,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.RubberFactory],
  },
  [Commodity.Satellite]: {
    icon: "/img/icon/satellite.png",
    price: 65714,
    volume: 15,
    illegal: false,
    dangerous: false,
    stations: [Station.SatelliteFactory],
  },
  [Commodity.ScrapAvorion]: {
    icon: "/img/icon/scrap-metal.png",
    price: 24,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapIron]: {
    icon: "/img/icon/scrap-metal.png",
    price: 4,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapMetal]: {
    icon: "/img/icon/scrap-metal.png",
    price: 25,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [
      Station.ScrapMetalTrader,
      Station.LaserCompressorFactory,
      Station.DroneFactory,
      Station.WarheadFactory,
      Station.SatelliteFactory,
      Station.DrillFactory,
      Station.TeleporterFactory,
      Station.VehicleFactory,
      Station.MiningRobotFactory,
      Station.WarRobotFactory,
    ],
  },
  [Commodity.ScrapNaonite]: {
    icon: "/img/icon/scrap-metal.png",
    price: 7,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapOgonite]: {
    icon: "/img/icon/scrap-metal.png",
    price: 18,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapTitanium]: {
    icon: "/img/icon/scrap-metal.png",
    price: 5,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapTrinium]: {
    icon: "/img/icon/scrap-metal.png",
    price: 10,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.ScrapXanion]: {
    icon: "/img/icon/scrap-metal.png",
    price: 13,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.SemiConductor]: {
    icon: "/img/icon/semi-conductor.png",
    price: 129,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    stations: [Station.SemiConductorManufacturer],
  },
  [Commodity.Servo]: {
    icon: "/img/icon/servo.png",
    price: 1387,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    stations: [Station.ServoFactory],
  },
  [Commodity.Sheep]: {
    icon: "/img/icon/sheep.png",
    price: 130,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.SheepRanch],
  },
  [Commodity.Silicon]: {
    icon: "/img/icon/silicium.png",
    price: 500,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.SiliconMine],
  },
  [Commodity.Silver]: {
    icon: "/img/icon/metal-bar.png",
    price: 300,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.NobleMetalMine],
  },
  [Commodity.Slave]: {
    icon: "/img/icon/slave.png",
    price: 15000,
    volume: 1,
    illegal: true,
    dangerous: false,
    stations: [],
  },
  [Commodity.SolarCell]: {
    icon: "/img/icon/solar-cell.png",
    price: 469,
    volume: 2,
    illegal: false,
    dangerous: false,
    stations: [Station.SolarCellFactory],
  },
  [Commodity.SolarPanel]: {
    icon: "/img/icon/satellite.png",
    price: 6858,
    volume: 6,
    illegal: false,
    dangerous: false,
    stations: [Station.SolarPanelFactory],
  },
  [Commodity.Solvent]: {
    icon: "/img/icon/solvent.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ChemicalFactory],
  },
  [Commodity.Spices]: {
    icon: "/img/icon/spices.png",
    price: 268,
    volume: 0.3,
    illegal: false,
    dangerous: false,
    stations: [Station.SpicesFarm],
  },
  [Commodity.Steel]: {
    icon: "/img/icon/i-beam.png",
    price: 277,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.SteelFactory],
  },
  [Commodity.SteelTube]: {
    icon: "/img/icon/steel-tube.png",
    price: 704,
    volume: 3,
    illegal: false,
    dangerous: false,
    stations: [Station.SteelTubeFactory],
  },
  [Commodity.TargetingCard]: {
    icon: "/img/icon/targeting-card.png",
    price: 11873,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.TargetingCardFactory, Station.ComputerComponentFactory],
  },
  [Commodity.TargetingSystem]: {
    icon: "/img/icon/targeting-system.png",
    price: 29674,
    volume: 0.75,
    illegal: false,
    dangerous: false,
    stations: [Station.TargetingSystemFactory],
  },
  [Commodity.Tea]: {
    icon: "/img/icon/tea.png",
    price: 37,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.TeaFarm],
  },
  [Commodity.Teleporter]: {
    icon: "/img/icon/teleport.png",
    price: 39365,
    volume: 12,
    illegal: false,
    dangerous: false,
    stations: [Station.TeleporterFactory],
  },
  [Commodity.TitaniumOre]: {
    icon: "/img/icon/rock.png",
    price: 3,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.Tools]: {
    icon: "/img/icon/tools.png",
    price: 214,
    volume: 0.4,
    illegal: false,
    dangerous: false,
    stations: [Station.ToolsFactory],
  },
  [Commodity.ToxicWaste]: {
    icon: "/img/icon/toxic-waste.png",
    price: 15,
    volume: 4,
    illegal: false,
    dangerous: true,
    stations: [
      Station.RubberFactory,
      Station.FuelFactory,
      Station.PaintManufacturer,
      Station.FertilizerFactory,
      Station.LaserHeadFactory,
      Station.AmmunitionFactory,
      Station.FungusFarm,
    ],
  },
  [Commodity.Transformator]: {
    icon: "/img/icon/grenade.png",
    price: 209,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    stations: [Station.TransformatorFactory],
  },
  [Commodity.TriniumOre]: {
    icon: "/img/icon/rock.png",
    price: 5,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.Turbine]: {
    icon: "/img/icon/turbine.png",
    price: 16729,
    volume: 7.5,
    illegal: false,
    dangerous: false,
    stations: [Station.TurbineFactory],
  },
  [Commodity.Vegetable]: {
    icon: "/img/icon/vegetables.png",
    price: 32,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.VegetableFarm],
  },
  [Commodity.Vehicle]: {
    icon: "/img/icon/apc.png",
    price: 77087,
    volume: 25,
    illegal: false,
    dangerous: false,
    stations: [Station.VehicleFactory],
  },
  [Commodity.WarRobot]: {
    icon: "/img/icon/missile-mech.png",
    price: 92186,
    volume: 8,
    illegal: false,
    dangerous: true,
    stations: [Station.WarRobotFactory],
  },
  [Commodity.Warhead]: {
    icon: "/img/icon/warhead.png",
    price: 5630,
    volume: 3,
    illegal: false,
    dangerous: true,
    stations: [Station.WarheadFactory],
  },
  [Commodity.Water]: {
    icon: "/img/icon/water.png",
    price: 20,
    volume: 0.35,
    illegal: false,
    dangerous: false,
    stations: [Station.WaterCollector, Station.IceMine],
  },
  [Commodity.Wheat]: {
    icon: "/img/icon/wheat.png",
    price: 23,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.WheatFarm],
  },
  [Commodity.Wine]: {
    icon: "/img/icon/wine-glass.png",
    price: 182,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.WineFactory],
  },
  [Commodity.Wire]: {
    icon: "/img/icon/wire.png",
    price: 95,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    stations: [Station.WireManufacturer],
  },
  [Commodity.Wood]: {
    icon: "/img/icon/log.png",
    price: 350,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    stations: [Station.WoodFarm],
  },
  [Commodity.XanionOre]: {
    icon: "/img/icon/rock.png",
    price: 7,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    stations: [],
  },
  [Commodity.Zinc]: {
    icon: "/img/icon/zinc.png",
    price: 250,
    volume: 1,
    illegal: false,
    dangerous: false,
    stations: [Station.ZincMine],
  },
};
