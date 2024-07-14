import { Station } from "../stations/enums";

export interface ICommodityMetadata {
    price: number,
    volume: number,
    illegal: boolean,
    dangerous: boolean,
    icon: string,
    stations: Station[]
}