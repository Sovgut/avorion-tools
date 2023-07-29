export enum Component {
    "Aluminum" = "Aluminum",
    "Ammunition M" = "Ammunition M",
    "Ammunition S" = "Ammunition S",
    "Conductor" = "Conductor",
    "Copper" = "Copper",
    "Crystal" = "Crystal",
    "Electro Magnet" = "Electro Magnet",
    "Electromagnetic Charge" = "Electromagnetic Charge",
    "Energy Cell" = "Energy Cell",
    "Energy Container" = "Energy Container",
    "Energy Inverter" = "Energy Inverter",
    "Energy Tube" = "Energy Tube",
    "Explosive Charge" = "Explosive Charge",
    "Force Generator" = "Force Generator",
    "Fuel" = "Fuel",
    "Gauss Rail" = "Gauss Rail",
    "Gold" = "Gold",
    "High Capacity Lens" = "High Capacity Lens",
    "High Pressure Tube" = "High Pressure Tube",
    "Industrial Tesla Coil" = "Industrial Tesla Coil",
    "Laser Compressor" = "Laser Compressor",
    "Laser Head" = "Laser Head",
    "Laser Modulator" = "Laser Modulator",
    "Lead" = "Lead",
    "Military Tesla Coil" = "Military Tesla Coil",
    "Nanobot" = "Nanobot",
    "Plasma Cell" = "Plasma Cell",
    "Power Unit" = "Power Unit",
    "Rocket" = "Rocket",
    "Servo" = "Servo",
    "Steel" = "Steel",
    "Steel Tube" = "Steel Tube",
    "Targeting Card" = "Targeting Card",
    "Transformator" = "Transformator",
    "Warhead" = "Warhead",
    "Wire" = "Wire",
    "Zinc" = "Zinc"
}

export enum ComponentSeller {
    "Turret Factory Supplier" = "Turret Factory Supplier",
    "Turret Factory" = "Turret Factory",
    "Aluminum Mine" = "Aluminum Mine",
    "Ammunition Factory" = "Ammunition Factory",
    "Conductor Factory" = "Conductor Factory",
    "Copper Mine" = "Copper Mine",
    "Planetary Trading Post" = "Planetary Trading Post",
    "Crystal Farm" = "Crystal Farm",
    "Electro Magnet Factory" = "Electro Magnet Factory",
    "Electromagnetic Charge Factory" = "Electromagnetic Charge Factory",
    "Solar Power Plant" = "Solar Power Plant",
    "Energy Container Factory" = "Energy Container Factory",
    "Energy Inverter Factory" = "Energy Inverter Factory",
    "Energy Tube Factory" = "Energy Tube Factory",
    "Explosive Charge Factory" = "Explosive Charge Factory",
    "Force Generator Factory" = "Force Generator Factory",
    "Fuel Factory" = "Fuel Factory",
    "Gauss Rail Factory" = "Gauss Rail Factory",
    "Noble Metal Mine" = "Noble Metal Mine",
    "High Capacity Lens Factory" = "High Capacity Lens Factory",
    "High Pressure Tube Factory" = "High Pressure Tube Factory",
    "Tesla Coil Factory" = "Tesla Coil Factory",
    "Laser Compressor Factory" = "Laser Compressor Factory",
    "Laser Head Factory" = "Laser Head Factory",
    "Laser Modulator Factory" = "Laser Modulator Factory",
    "Lead Mine" = "Lead Mine",
    "Nanobot Factory" = "Nanobot Factory",
    "Plasma Cell Factory" = "Plasma Cell Factory",
    "Power Unit Factory" = "Power Unit Factory",
    "Rocket Factory" = "Rocket Factory",
    "Servo Factory" = "Servo Factory",
    "Steel Factory" = "Steel Factory",
    "Steel Tube Factory" = "Steel Tube Factory",
    "Computer Component Factory" = "Computer Component Factory",
    "Targeting Card Factory" = "Targeting Card Factory",
    "Transformator Factory" = "Transformator Factory",
    "Warhead Factory" = "Warhead Factory",
    "Wire Manufacturer" = "Wire Manufacturer",
    "Zinc Mine" = "Zinc Mine",
}

type ISellerInfo = {
    [key in ComponentSeller]: {
        link: string;
    }
}

export const SellerInfo: ISellerInfo = {
    "Turret Factory Supplier": {
        link: "https://avorion.fandom.com/wiki/Turret_Factory_Supplier"
    },
    "Turret Factory": {
        link: "https://avorion.fandom.com/wiki/Turret_Factory"
    },
    "Aluminum Mine": {
        link: "https://avorion.fandom.com/wiki/Aluminum_Mine"
    },
    "Ammunition Factory": {
        link: "https://avorion.fandom.com/wiki/Ammunition_Factory"
    },
    "Conductor Factory": {
        link: "https://avorion.fandom.com/wiki/Conductor_Factory"
    },
    "Copper Mine": {
        link: "https://avorion.fandom.com/wiki/Copper_Mine"
    },
    "Planetary Trading Post": {
        link: "https://avorion.fandom.com/wiki/Planetary_Trading_Post"
    },
    "Crystal Farm": {
        link: "https://avorion.fandom.com/wiki/Crystal_Farm"
    },
    "Electro Magnet Factory": {
        link: "https://avorion.fandom.com/wiki/Electro_Magnet_Factory"
    },
    "Electromagnetic Charge Factory": {
        link: "https://avorion.fandom.com/wiki/Electromagnetic_Charge_Factory"
    },
    "Solar Power Plant": {
        link: "https://avorion.fandom.com/wiki/Solar_Power_Plant"
    },
    "Energy Container Factory": {
        link: "https://avorion.fandom.com/wiki/Energy_Container_Factory"
    },
    "Energy Inverter Factory": {
        link: "https://avorion.fandom.com/wiki/Energy_Inverter_Factory"
    },
    "Energy Tube Factory": {
        link: "https://avorion.fandom.com/wiki/Energy_Tube_Factory"
    },
    "Explosive Charge Factory": {
        link: "https://avorion.fandom.com/wiki/Explosive_Charge_Factory"
    },
    "Force Generator Factory": {
        link: "https://avorion.fandom.com/wiki/Force_Generator_Factory"
    },
    "Fuel Factory": {
        link: "https://avorion.fandom.com/wiki/Fuel_Factory"
    },
    "Gauss Rail Factory": {
        link: "https://avorion.fandom.com/wiki/Gauss_Rail_Factory"
    },
    "Noble Metal Mine": {
        link: "https://avorion.fandom.com/wiki/Noble_Metal_Mine"
    },
    "High Capacity Lens Factory": {
        link: "https://avorion.fandom.com/wiki/High_Capacity_Lens_Factory"
    },
    "High Pressure Tube Factory": {
        link: "https://avorion.fandom.com/wiki/High_Pressure_Tube_Factory"
    },
    "Tesla Coil Factory": {
        link: "https://avorion.fandom.com/wiki/Tesla_Coil_Factory"
    },
    "Laser Compressor Factory": {
        link: "https://avorion.fandom.com/wiki/Laser_Compressor_Factory"
    },
    "Laser Head Factory": {
        link: "https://avorion.fandom.com/wiki/Laser_Head_Factory"
    },
    "Laser Modulator Factory": {
        link: "https://avorion.fandom.com/wiki/Laser_Modulator_Factory"
    },
    "Lead Mine": {
        link: "https://avorion.fandom.com/wiki/Lead_Mine"
    },
    "Nanobot Factory": {
        link: "https://avorion.fandom.com/wiki/Nanobot_Factory"
    },
    "Plasma Cell Factory": {
        link: "https://avorion.fandom.com/wiki/Plasma_Cell_Factory"
    },
    "Power Unit Factory": {
        link: "https://avorion.fandom.com/wiki/Power_Unit_Factory"
    },
    "Rocket Factory": {
        link: "https://avorion.fandom.com/wiki/Rocket_Factory"
    },
    "Servo Factory": {
        link: "https://avorion.fandom.com/wiki/Servo_Factory"
    },
    "Steel Factory": {
        link: "https://avorion.fandom.com/wiki/Steel_Factory"
    },
    "Steel Tube Factory": {
        link: "https://avorion.fandom.com/wiki/Steel_Tube_Factory"
    },
    "Computer Component Factory": {
        link: "https://avorion.fandom.com/wiki/Computer_Component_Factory"
    },
    "Targeting Card Factory": {
        link: "https://avorion.fandom.com/wiki/Targeting_Card_Factory"
    },
    "Transformator Factory": {
        link: "https://avorion.fandom.com/wiki/Transformator_Factory"
    },
    "Warhead Factory": {
        link: "https://avorion.fandom.com/wiki/Warhead_Factory"
    },
    "Wire Manufacturer": {
        link: "https://avorion.fandom.com/wiki/Wire_Manufacturer"
    },
    "Zinc Mine": {
        link: "https://avorion.fandom.com/wiki/Zinc_Mine"
    },
}

type IComponentInfo = {
    [key in Component]: {
        price: number;
        volume: number;
        illegal: boolean;
        dangerous: boolean;
        icon: string,
        soldBy: ComponentSeller[];
    }
}

export const ComponentInfo: IComponentInfo = {
    "Aluminum": {
        price: 200,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/aluminium.png",
        soldBy: [ComponentSeller["Aluminum Mine"]]
    },
    "Ammunition M": {
        price: 422,
        volume: 1.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/ammunition-m.png",
        soldBy: [ComponentSeller["Ammunition Factory"]]
    },
    "Ammunition S": {
        price: 422,
        volume: 0.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/ammunition-s.png",
        soldBy: [ComponentSeller["Ammunition Factory"]]
    },
    "Conductor": {
        price: 168,
        volume: 0.15,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/conductor.png",
        soldBy: [ComponentSeller["Conductor Factory"]]
    },
    "Copper": {
        price: 350,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/copper.png",
        soldBy: [ComponentSeller["Copper Mine"], ComponentSeller["Planetary Trading Post"]]
    },
    "Crystal": {
        price: 190,
        volume: 1.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/crystal.png",
        soldBy: [ComponentSeller["Crystal Farm"]]
    },
    "Electro Magnet": {
        price: 483,
        volume: 0.75,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/electro-magnet.png",
        soldBy: [ComponentSeller["Electro Magnet Factory"]]
    },
    "Electromagnetic Charge": {
        price: 13985,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/electromagnetic-charge.png",
        soldBy: [ComponentSeller["Electromagnetic Charge Factory"]]
    },
    "Energy Cell": {
        price: 50,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/battery-pack-alt.png",
        soldBy: [ComponentSeller["Solar Power Plant"]]
    },
    "Energy Container": {
        price: 1087,
        volume: 4.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/electric.png",
        soldBy: [ComponentSeller["Energy Container Factory"]]
    },
    "Energy Inverter": {
        price: 1277,
        volume: 3,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/energy-inverter.png",
        soldBy: [ComponentSeller["Energy Inverter Factory"]]
    },
    "Energy Tube": {
        price: 2895,
        volume: 1.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/energy-tube.png",
        soldBy: [ComponentSeller["Energy Tube Factory"]]
    },
    "Explosive Charge": {
        price: 1423,
        volume: 1.5,
        illegal: false,
        dangerous: true,
        icon: "/assets/img/explosive-charge.png",
        soldBy: [ComponentSeller["Explosive Charge Factory"]]
    },
    "Force Generator": {
        price: 49576,
        volume: 4,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/force-generator.png",
        soldBy: [ComponentSeller["Force Generator Factory"]]
    },
    "Fuel": {
        price: 1232,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/fuel.png",
        soldBy: [ComponentSeller["Fuel Factory"]]
    },
    "Gauss Rail": {
        price: 7735,
        volume: 2,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/gauss-rail.png",
        soldBy: [ComponentSeller["Gauss Rail Factory"]]
    },
    "Gold": {
        price: 600,
        volume: 0.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/metal-bar.png",
        soldBy: [ComponentSeller["Noble Metal Mine"], ComponentSeller["Planetary Trading Post"]]
    },
    "High Capacity Lens": {
        price: 4689,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/high-capacity-lens.png",
        soldBy: [ComponentSeller["High Capacity Lens Factory"]]
    },
    "High Pressure Tube": {
        price: 1650,
        volume: 2,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/high-pressure-tube.png",
        soldBy: [ComponentSeller["High Pressure Tube Factory"]]
    },
    "Industrial Tesla Coil": {
        price: 10314,
        volume: 5.5,
        illegal: false,
        dangerous: true,
        icon: "/assets/img/industrial-tesla-coil.png",
        soldBy: [ComponentSeller["Tesla Coil Factory"]]
    },
    "Laser Compressor": {
        price: 6577,
        volume: 1.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/laser-compressor.png",
        soldBy: [ComponentSeller["Laser Compressor Factory"]]
    },
    "Laser Head": {
        price: 4690,
        volume: 2,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/laser-head.png",
        soldBy: [ComponentSeller["Laser Head Factory"]]
    },
    "Laser Modulator": {
        price: 16742,
        volume: 3,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/laser-modulator.png",
        soldBy: [ComponentSeller["Laser Modulator Factory"]]
    },
    "Lead": {
        price: 200,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/lead.png",
        soldBy: [ComponentSeller["Lead Mine"], ComponentSeller["Planetary Trading Post"]]
    },
    "Military Tesla Coil": {
        price: 10314,
        volume: 4.5,
        illegal: false,
        dangerous: true,
        icon: "/assets/img/industrial-tesla-coil.png",
        soldBy: [ComponentSeller["Tesla Coil Factory"]]
    },
    "Nanobot": {
        price: 1338,
        volume: 0.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/nanobots.png",
        soldBy: [ComponentSeller["Nanobot Factory"]]
    },
    "Plasma Cell": {
        price: 174,
        volume: 0.25,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/plasma-cell.png",
        soldBy: [ComponentSeller["Plasma Cell Factory"]]
    },
    "Power Unit": {
        price: 1211,
        volume: 5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/power-unit.png",
        soldBy: [ComponentSeller["Power Unit Factory"]]
    },
    "Rocket": {
        price: 11250,
        volume: 4,
        illegal: false,
        dangerous: true,
        icon: "/assets/img/rocket.png",
        soldBy: [ComponentSeller["Rocket Factory"]]
    },
    "Servo": {
        price: 1387,
        volume: 0.25,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/servo.png",
        soldBy: [ComponentSeller["Servo Factory"]]
    },
    "Steel": {
        price: 277,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/i-beam.png",
        soldBy: [ComponentSeller["Steel Factory"]]
    },
    "Steel Tube": {
        price: 704,
        volume: 3,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/steel-tube.png",
        soldBy: [ComponentSeller["Steel Tube Factory"]]
    },
    "Targeting Card": {
        price: 11873,
        volume: 0.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/targeting-card.png",
        soldBy: [ComponentSeller["Computer Component Factory"], ComponentSeller["Targeting Card Factory"]]
    },
    "Transformator": {
        price: 209,
        volume: 0.2,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/grenade.png",
        soldBy: [ComponentSeller["Transformator Factory"]]
    },
    "Warhead": {
        price: 5630,
        volume: 3,
        illegal: false,
        dangerous: true,
        icon: "/assets/img/warhead.png",
        soldBy: [ComponentSeller["Warhead Factory"]]
    },
    "Wire": {
        price: 95,
        volume: 0.5,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/wire.png",
        soldBy: [ComponentSeller["Wire Manufacturer"]]
    },
    "Zinc": {
        price: 250,
        volume: 1,
        illegal: false,
        dangerous: false,
        icon: "/assets/img/zinc.png",
        soldBy: [ComponentSeller["Zinc Mine"]]
    },
}

export const Turret = {
    "Chaingun": {
        version: "2.3.1",
        icon: "/assets/img/chaingun.png",
        components: [
            Component["Servo"],
            Component["Steel Tube"],
            Component["Ammunition S"],
            Component["Steel"],
            Component["Aluminum"],
            Component["Lead"],
        ]
    },
    "Bolter": {
        version: "2.3.1",
        icon: "/assets/img/bolter.png",
        components: [
            Component["Servo"],
            Component["High Pressure Tube"],
            Component["Ammunition M"],
            Component["Explosive Charge"],
            Component["Steel"],
            Component["Aluminum"],
        ]
    },
    "Laser": {
        version: "2.3.1",
        icon: "/assets/img/laser-gun.png",
        components: [
            Component["Laser Head"],
            Component["Laser Compressor"],
            Component["High Capacity Lens"],
            Component["Laser Modulator"],
            Component["Power Unit"],
            Component["Steel"],
            Component["Crystal"],
        ]
    },
    "Plasma Gun": {
        version: "2.3.1",
        icon: "/assets/img/plasma-gun.png",
        components: [
            Component["Plasma Cell"],
            Component["Energy Tube"],
            Component["Conductor"],
            Component["Energy Container"],
            Component["Power Unit"],
            Component["Steel"],
            Component["Crystal"],
        ]
    },
    "Cannon": {
        version: "2.3.1",
        icon: "/assets/img/cannon.png",
        components: [
            Component["Servo"],
            Component["Warhead"],
            Component["High Pressure Tube"],
            Component["Explosive Charge"],
            Component["Steel"],
            Component["Wire"],
        ]
    },
    "Rocket Launcher": {
        version: "2.3.1",
        icon: "/assets/img/rocket-launcher.png",
        components: [
            Component["Servo"],
            Component["Rocket"],
            Component["High Pressure Tube"],
            Component["Fuel"],
            Component["Targeting Card"],
            Component["Steel"],
            Component["Wire"],
        ]
    },
    "Railgun": {
        version: "2.3.1",
        icon: "/assets/img/rail-gun.png",
        components: [
            Component["Servo"],
            Component["Electromagnetic Charge"],
            Component["Electro Magnet"],
            Component["Gauss Rail"],
            Component["High Pressure Tube"],
            Component["Steel"],
            Component["Copper"],
        ]
    },
    "Repair": {
        version: "2.3.1",
        icon: "/assets/img/repair-beam.png",
        components: [
            Component["Nanobot"],
            Component["Transformator"],
            Component["Laser Modulator"],
            Component["Conductor"],
            Component["Gold"],
            Component["Steel"],
        ]
    },
    "Mining Laser": {
        version: "2.3.1",
        icon: "/assets/img/mining-laser.png",
        components: [
            Component["Laser Compressor"],
            Component["Laser Modulator"],
            Component["High Capacity Lens"],
            Component["Conductor"],
            Component["Steel"],
        ]
    },
    "Raw Mining Laser": {
        version: "2.3.1",
        icon: "/assets/img/r-mining-laser.png",
        components: [
            Component["Laser Compressor"],
            Component["Laser Modulator"],
            Component["High Capacity Lens"],
            Component["Conductor"],
            Component["Steel"],
        ]
    },
    "Salvaging Laser": {
        version: "2.3.1",
        icon: "/assets/img/salvage-laser.png",
        components: [
            Component["Laser Compressor"],
            Component["Laser Modulator"],
            Component["High Capacity Lens"],
            Component["Conductor"],
            Component["Steel"]
        ]
    },
    "Raw Salvaging Laser": {
        version: "2.3.1",
        icon: "/assets/img/r-salvaging-laser.png",
        components: [
            Component["Laser Compressor"],
            Component["Laser Modulator"],
            Component["High Capacity Lens"],
            Component["Conductor"],
            Component["Steel"]
        ]
    },
    "Force Gun": {
        version: "2.3.1",
        icon: "/assets/img/force-gun.png",
        components: [
            Component["Force Generator"],
            Component["Energy Tube"],
            Component["Conductor"],
            Component["Steel"],
            Component["Zinc"],
        ]
    },
    "Tesla Gun": {
        version: "2.3.1",
        icon: "/assets/img/tesla-gun.png",
        components: [
            Component["Industrial Tesla Coil"],
            Component["Electromagnetic Charge"],
            Component["Energy Inverter"],
            Component["Conductor"],
            Component["Power Unit"],
            Component["Copper"],
            Component["Energy Cell"],
        ]
    },
    "Lightning Gun": {
        version: "2.3.1",
        icon: "/assets/img/lightning-gun.png",
        components: [
            Component["Military Tesla Coil"],
            Component["High Capacity Lens"],
            Component["Electromagnetic Charge"],
            Component["Conductor"],
            Component["Power Unit"],
            Component["Copper"],
            Component["Energy Cell"],
        ]
    },
    "Pulse Cannon": {
        version: "2.3.1",
        icon: "/assets/img/pulsecannon.png",
        components: [
            Component["Servo"],
            Component["Steel Tube"],
            Component["Ammunition S"],
            Component["Steel"],
            Component["Copper"],
            Component["Energy Cell"],
        ]
    },
    "Point Defense Cannon": {
        version: "2.3.1",
        icon: "/assets/img/point-defense-chaingun.png",
        components: [
            Component["Servo"],
            Component["Steel Tube"],
            Component["Ammunition S"],
            Component["Steel"],
            Component["Aluminum"],
            Component["Lead"]
        ]
    },
    "Point Defense Laser": {
        version: "2.3.1",
        icon: "/assets/img/point-defense-laser.png",
        components: [
            Component["Servo"],
            Component["Laser Head"],
            Component["Laser Compressor"],
            Component["High Capacity Lens"],
            Component["Laser Modulator"],
            Component["Steel"],
            Component["Crystal"]
        ]
    },
    "Anti Fighter": {
        version: "2.3.1",
        icon: "/assets/img/anti-fighter-gun.png",
        components: [
            Component["Servo"],
            Component["High Pressure Tube"],
            Component["Ammunition M"],
            Component["Explosive Charge"],
            Component["Steel"],
            Component["Aluminum"]
        ]
    }
}
