import { Component } from "./component";
import { Turret } from "./turret";
import { Rarity } from "~data/common";

export interface Blueprint {
    id: string;
    name: string;
    rarity: Rarity;
    turret: Turret;
    components: Component[];
}