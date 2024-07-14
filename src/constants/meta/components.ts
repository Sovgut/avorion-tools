import { ComponentMetaType } from "~types";
import { ComponentType } from "~constants/enums/components";
import { SellerType } from "~constants/enums/sellers";

export const ComponentsMeta: Record<ComponentType, ComponentMetaType> = {
  [ComponentType.Acid]: {
    icon: "/img/icon/acid.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.ChemicalFactory, SellerType.RubberFactory],
  },
  [ComponentType.AcronDrug]: {
    icon: "/img/icon/powder.png",
    price: 6000,
    volume: 0.1,
    illegal: true,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Adhesive]: {
    icon: "/img/icon/adhesive.png",
    price: 402,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.ChemicalFactory],
  },
  [ComponentType.Aluminum]: {
    icon: "/img/icon/aluminium.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AluminumMine],
  },
  [ComponentType.Ammunition]: {
    icon: "/img/icon/ammo-box.png",
    price: 3786,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AmmunitionFactory],
  },
  [ComponentType.AmmunitionL]: {
    icon: "/img/icon/ammunition-l.png",
    price: 422,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AmmunitionFactory],
  },
  [ComponentType.AmmunitionM]: {
    icon: "/img/icon/ammunition-m.png",
    price: 422,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AmmunitionFactory],
  },
  [ComponentType.AmmunitionS]: {
    icon: "/img/icon/ammunition-s.png",
    price: 422,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AmmunitionFactory],
  },
  [ComponentType.AntigravGenerator]: {
    icon: "/img/icon/anti-grav-generator.png",
    price: 71632,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AntigravGeneratorFactory],
  },
  [ComponentType.AntigravUnit]: {
    icon: "/img/icon/antigrav-unit.png",
    price: 25391,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.AntigravUnitFactory],
  },
  [ComponentType.AvorionOre]: {
    icon: "/img/icon/rock.png",
    price: 12,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.Sector],
  },
  [ComponentType.Beer]: {
    icon: "/img/icon/beer-stein.png",
    price: 216,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.Brewery],
  },
  [ComponentType.BioGas]: {
    icon: "/img/icon/bio-gas.png",
    price: 213,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [SellerType.FishFarm, SellerType.SheepRanch],
  },
  [ComponentType.BodyArmor]: {
    icon: "/img/icon/kevlar-vest.png",
    price: 95906,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Book]: {
    icon: "/img/icon/open-book.png",
    price: 319,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Carbon]: {
    icon: "/img/icon/carbon.png",
    price: 423,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Cattle]: {
    icon: "/img/icon/cattle.png",
    price: 254,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Chemicals]: {
    icon: "/img/icon/chemical.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Chlorine]: {
    icon: "/img/icon/chlorine.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Clothes]: {
    icon: "/img/icon/trousers.png",
    price: 102,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Coal]: {
    icon: "/img/icon/fossil-fuel.png",
    price: 200,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Cocoa]: {
    icon: "/img/icon/cocoa.png",
    price: 87,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Coffee]: {
    icon: "/img/icon/coffee-beans.png",
    price: 187,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ComputationMainframe]: {
    icon: "/img/icon/computation-mainframe.png",
    price: 37940,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Conductor]: {
    icon: "/img/icon/conductor.png",
    price: 168,
    volume: 0.15,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Coolant]: {
    icon: "/img/icon/snowflake-2.png",
    price: 402,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Copper]: {
    icon: "/img/icon/copper.png",
    price: 350,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Corn]: {
    icon: "/img/icon/corn.png",
    price: 28,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Crystal]: {
    icon: "/img/icon/crystal.png",
    price: 190,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Dairy]: {
    icon: "/img/icon/udder.png",
    price: 19,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Diamond]: {
    icon: "/img/icon/diamond.png",
    price: 750,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Display]: {
    icon: "/img/icon/checkbox-tree.png",
    price: 7858,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Drill]: {
    icon: "/img/icon/drill.png",
    price: 20443,
    volume: 20,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Drone]: {
    icon: "/img/icon/spoutnik.png",
    price: 7754,
    volume: 10,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ElectroMagnet]: {
    icon: "/img/icon/electro-magnet.png",
    price: 483,
    volume: 0.75,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ElectromagneticCharge]: {
    icon: "/img/icon/electromagnetic-charge.png",
    price: 13985,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ElectronAccelerator]: {
    icon: "/img/icon/electron-accelerator.png",
    price: 125431,
    volume: 12,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.EnergyCell]: {
    icon: "/img/icon/battery-pack-alt.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.EnergyContainer]: {
    icon: "/img/icon/electric.png",
    price: 1087,
    volume: 4.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.EnergyGenerator]: {
    icon: "/img/icon/energy-generator.png",
    price: 15957,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.EnergyInverter]: {
    icon: "/img/icon/energy-inverter.png",
    price: 1277,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.EnergyTube]: {
    icon: "/img/icon/energy-tube.png",
    price: 2895,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ExplosiveCharge]: {
    icon: "/img/icon/explosive-charge.png",
    price: 1423,
    volume: 1.5,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Fabric]: {
    icon: "/img/icon/fabric.png",
    price: 91,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fertilizer]: {
    icon: "/img/icon/fertilizer.png",
    price: 319,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fish]: {
    icon: "/img/icon/fish.png",
    price: 152,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fluorine]: {
    icon: "/img/icon/fluorine.png",
    price: 250,
    volume: 1,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Food]: {
    icon: "/img/icon/chicken-leg.png",
    price: 300,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.FoodBar]: {
    icon: "/img/icon/bar.png",
    price: 223,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ForceGenerator]: {
    icon: "/img/icon/force-generator.png",
    price: 49576,
    volume: 4,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fruit]: {
    icon: "/img/icon/shiny-apple.png",
    price: 56,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fuel]: {
    icon: "/img/icon/fuel.png",
    price: 1232,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Fungus]: {
    icon: "/img/icon/mushroom.png",
    price: 46,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.FusionCore]: {
    icon: "/img/icon/fusion-core.png",
    price: 5114,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.FusionGenerator]: {
    icon: "/img/icon/fusion-generator.png",
    price: 39553,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.GaussRail]: {
    icon: "/img/icon/gauss-rail.png",
    price: 7735,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Gem]: {
    icon: "/img/icon/saphir.png",
    price: 400,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Glass]: {
    icon: "/img/icon/metal-disc.png",
    price: 182,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Gold]: {
    icon: "/img/icon/metal-bar.png",
    price: 600,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Gun]: {
    icon: "/img/icon/bolter-gun.png",
    price: 1232,
    volume: 0.5,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Helium]: {
    icon: "/img/icon/helium.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.HighCapacityLens]: {
    icon: "/img/icon/high-capacity-lens.png",
    price: 4689,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.HighPressureTube]: {
    icon: "/img/icon/high-pressure-tube.png",
    price: 1650,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Hydrogen]: {
    icon: "/img/icon/hydrogen.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.IndustrialTeslaCoil]: {
    icon: "/img/icon/industrial-tesla-coil.png",
    price: 10314,
    volume: 5.5,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.IronOre]: {
    icon: "/img/icon/rock.png",
    price: 2,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Jewelry]: {
    icon: "/img/icon/gem-chain.png",
    price: 1260,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.LaserCompressor]: {
    icon: "/img/icon/laser-compressor.png",
    price: 6577,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.LaserHead]: {
    icon: "/img/icon/laser-head.png",
    price: 4690,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.LaserModulator]: {
    icon: "/img/icon/laser-modulator.png",
    price: 16742,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Lead]: {
    icon: "/img/icon/lead.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Leather]: {
    icon: "/img/icon/animal-hide.png",
    price: 37,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Liquor]: {
    icon: "/img/icon/martini.png",
    price: 1867,
    volume: 1.25,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.LuxuryFood]: {
    icon: "/img/icon/luxury-food.png",
    price: 6452,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Meat]: {
    icon: "/img/icon/meat.png",
    price: 37,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.MedicalSupplies]: {
    icon: "/img/icon/medical-supplies.png",
    price: 3006,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.MetalPlate]: {
    icon: "/img/icon/metal-scales.png",
    price: 792,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Microchip]: {
    icon: "/img/icon/microchip.png",
    price: 896,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.MilitaryTeslaCoil]: {
    icon: "/img/icon/industrial-tesla-coil.png",
    price: 10314,
    volume: 4.5,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Mineral]: {
    icon: "/img/icon/spices.png",
    price: 500,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.MiningRobot]: {
    icon: "/img/icon/robot-golem.png",
    price: 145977,
    volume: 8,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.MornDrug]: {
    icon: "/img/icon/powder.png",
    price: 5000,
    volume: 0.1,
    illegal: true,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Nanobot]: {
    icon: "/img/icon/nanobots.png",
    price: 1338,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.NaoniteOre]: {
    icon: "/img/icon/rock.png",
    price: 4,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Neon]: {
    icon: "/img/icon/neon.png",
    price: 200,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.NeutronAccelerator]: {
    icon: "/img/icon/neutron-accelerator.png",
    price: 125431,
    volume: 15,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Nitrogen]: {
    icon: "/img/icon/nitrogen.png",
    price: 40,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.OgoniteOre]: {
    icon: "/img/icon/rock.png",
    price: 9,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Oil]: {
    icon: "/img/icon/oil-drum.png",
    price: 490,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Ore]: {
    icon: "/img/icon/rock.png",
    price: 70,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Oxygen]: {
    icon: "/img/icon/oxygen.png",
    price: 80,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Paint]: {
    icon: "/img/icon/paint.png",
    price: 481,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Paper]: {
    icon: "/img/icon/papers.png",
    price: 46,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Plankton]: {
    icon: "/img/icon/turtle-shell.png",
    price: 50,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Plant]: {
    icon: "/img/icon/plant.png",
    price: 14,
    volume: 1.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.PlasmaCell]: {
    icon: "/img/icon/plasma-cell.png",
    price: 174,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Plastic]: {
    icon: "/img/icon/cargo-hold.png",
    price: 137,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Platinum]: {
    icon: "/img/icon/metal-bar.png",
    price: 750,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Potato]: {
    icon: "/img/icon/potato.png",
    price: 24,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.PowerUnit]: {
    icon: "/img/icon/power-unit.png",
    price: 1211,
    volume: 5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Processor]: {
    icon: "/img/icon/processor.png",
    price: 7858,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Protein]: {
    icon: "/img/icon/bar.png",
    price: 34,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ProtonAccelerator]: {
    icon: "/img/icon/proton-accelerator.png",
    price: 125431,
    volume: 15,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RawOil]: {
    icon: "/img/icon/oil-drum.png",
    price: 150,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Rice]: {
    icon: "/img/icon/powder.png",
    price: 15,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftAvorionOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 12,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftIronOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 2,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftNaoniteOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 4,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftOgoniteOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 9,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftResearchData]: {
    icon: "/img/icon/info-chip.png",
    price: 5000,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftTitaniumOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 3,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftTriniumOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 5,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.RiftXanionOre]: {
    icon: "/img/icon/rift-rock.png",
    price: 7,
    volume: 0.05,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Rocket]: {
    icon: "/img/icon/rocket.png",
    price: 11250,
    volume: 4,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Rubber]: {
    icon: "/img/icon/cubes.png",
    price: 686,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Satellite]: {
    icon: "/img/icon/satellite.png",
    price: 65714,
    volume: 15,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapAvorion]: {
    icon: "/img/icon/scrap-metal.png",
    price: 24,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapIron]: {
    icon: "/img/icon/scrap-metal.png",
    price: 4,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapMetal]: {
    icon: "/img/icon/scrap-metal.png",
    price: 25,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapNaonite]: {
    icon: "/img/icon/scrap-metal.png",
    price: 7,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapOgonite]: {
    icon: "/img/icon/scrap-metal.png",
    price: 18,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapTitanium]: {
    icon: "/img/icon/scrap-metal.png",
    price: 5,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapTrinium]: {
    icon: "/img/icon/scrap-metal.png",
    price: 10,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ScrapXanion]: {
    icon: "/img/icon/scrap-metal.png",
    price: 13,
    volume: 0.04,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.SemiConductor]: {
    icon: "/img/icon/semi-conductor.png",
    price: 129,
    volume: 0.1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Servo]: {
    icon: "/img/icon/servo.png",
    price: 1387,
    volume: 0.25,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Sheep]: {
    icon: "/img/icon/sheep.png",
    price: 130,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Silicon]: {
    icon: "/img/icon/silicium.png",
    price: 500,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Silver]: {
    icon: "/img/icon/metal-bar.png",
    price: 300,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Slave]: {
    icon: "/img/icon/slave.png",
    price: 15000,
    volume: 1,
    illegal: true,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.SolarCell]: {
    icon: "/img/icon/solar-cell.png",
    price: 469,
    volume: 2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.SolarPanel]: {
    icon: "/img/icon/satellite.png",
    price: 6858,
    volume: 6,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Solvent]: {
    icon: "/img/icon/solvent.png",
    price: 402,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Spices]: {
    icon: "/img/icon/spices.png",
    price: 268,
    volume: 0.3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Steel]: {
    icon: "/img/icon/i-beam.png",
    price: 277,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.SteelTube]: {
    icon: "/img/icon/steel-tube.png",
    price: 704,
    volume: 3,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.TargetingCard]: {
    icon: "/img/icon/targeting-card.png",
    price: 11873,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.TargetingSystem]: {
    icon: "/img/icon/targeting-system.png",
    price: 29674,
    volume: 0.75,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Tea]: {
    icon: "/img/icon/tea.png",
    price: 37,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Teleporter]: {
    icon: "/img/icon/teleport.png",
    price: 39365,
    volume: 12,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.TitaniumOre]: {
    icon: "/img/icon/rock.png",
    price: 3,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Tools]: {
    icon: "/img/icon/tools.png",
    price: 214,
    volume: 0.4,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.ToxicWaste]: {
    icon: "/img/icon/toxic-waste.png",
    price: 15,
    volume: 4,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Transformator]: {
    icon: "/img/icon/grenade.png",
    price: 209,
    volume: 0.2,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.TriniumOre]: {
    icon: "/img/icon/rock.png",
    price: 5,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Turbine]: {
    icon: "/img/icon/turbine.png",
    price: 16729,
    volume: 7.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Vegetable]: {
    icon: "/img/icon/vegetables.png",
    price: 32,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Vehicle]: {
    icon: "/img/icon/apc.png",
    price: 77087,
    volume: 25,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.WarRobot]: {
    icon: "/img/icon/missile-mech.png",
    price: 92186,
    volume: 8,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Warhead]: {
    icon: "/img/icon/warhead.png",
    price: 5630,
    volume: 3,
    illegal: false,
    dangerous: true,
    sellers: [],
  },
  [ComponentType.Water]: {
    icon: "/img/icon/water.png",
    price: 20,
    volume: 0.35,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Wheat]: {
    icon: "/img/icon/wheat.png",
    price: 23,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Wine]: {
    icon: "/img/icon/wine-glass.png",
    price: 182,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Wire]: {
    icon: "/img/icon/wire.png",
    price: 95,
    volume: 0.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Wood]: {
    icon: "/img/icon/log.png",
    price: 350,
    volume: 2.5,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.XanionOre]: {
    icon: "/img/icon/rock.png",
    price: 7,
    volume: 0.025,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
  [ComponentType.Zinc]: {
    icon: "/img/icon/zinc.png",
    price: 250,
    volume: 1,
    illegal: false,
    dangerous: false,
    sellers: [],
  },
};
