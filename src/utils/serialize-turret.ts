import { Turret } from "src/data/turrets/enums";

export function serializeTurret(value: string): Turret {
    if (!Object.keys(Turret).includes(value)) {
        throw ReferenceError("Invalid turret type");
    }

    return Number(value) as Turret;
}

export function serializeTurrets(values: string[]): Turret[] {
    return values.map(value => serializeTurret(value));
}