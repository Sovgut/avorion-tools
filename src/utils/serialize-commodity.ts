import { Commodity } from "~data/commodities/enums";

export function serializeCommodity(value: string): Commodity {
    if (!Object.keys(Commodity).map(Number).includes(Number(value))) {
        throw ReferenceError("Invalid commodity type");
    }

    return Number(value) as Commodity;
}

export function serializeCommoditites(values: string[]): Commodity[] {
    return values.map(value => serializeCommodity(value)).filter(Boolean);
}