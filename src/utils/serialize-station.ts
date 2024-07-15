import { Station } from "~data/stations/enums";

export function serializeStation(value: string): Station {
    if (!Object.keys(Station).map(Number).includes(Number(value))) {
        throw ReferenceError("Invalid station type");
    }

    return Number(value) as Station;
}

export function serializeStations(values: string[]): Station[] {
    return values.map(value => serializeStation(value)).filter(Boolean);
}