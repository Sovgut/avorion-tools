import { Station } from "src/data/stations/enums";

export function serializeStation(value: string): Station {
    if (!Object.keys(Station).includes(value)) {
        throw ReferenceError("Invalid station type");
    }

    return Number(value) as Station;
}

export function serializeStations(values: string[]): Station[] {
    return values.map(value => serializeStation(value));
}