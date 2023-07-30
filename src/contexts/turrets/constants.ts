import {Component} from "../../constants";
import {ITurretContext, TTurretMetadata} from "./types";

export const INITIAL_QUANTITY = 1;
export const INITIAL_PRICE = 0;
export const INITIAL_SELECTED = 0;

export const TurretMetadata: TTurretMetadata = {
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

export const INITIAL_CONTEXT_STATE: ITurretContext = {
    container: [],
    selected: Object.keys(TurretMetadata)[INITIAL_SELECTED] as keyof typeof TurretMetadata,

    remove(key) {
    },
    add() {
    },
    update(key, attribute, value) {
    },
    select(type) {
    }
}