import { Commodity } from "src/data/commodities/enums";

export function serializeCommodity(value: string): Commodity {
    if (!Object.keys(Commodity).includes(value)) {
        throw ReferenceError("Invalid commodity type");
    }

    return Number(value) as Commodity;
}

export function serializeCommoditites(values: string[]): Commodity[] {
    return values.map(value => serializeCommodity(value));
}