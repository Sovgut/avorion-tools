import { Turret } from "~data/turrets/enums";

export function serializeTurret(value: string): Turret {
    if (!Object.keys(Turret).map(Number).includes(Number(value))) {
        throw ReferenceError("Invalid turret type");
    }

    return Number(value) as Turret;
}

export function serializeTurrets(values: string[]): Turret[] {
    return values.map(value => serializeTurret(value)).filter(Boolean);
}