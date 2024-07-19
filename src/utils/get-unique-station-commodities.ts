import { IStationCommodity } from "~data/stations/types";

export function getUniqueStationCommodities(
  commodities: IStationCommodity[],
): IStationCommodity[] {
  const buffer: IStationCommodity[] = [];

  for (const commodity of commodities) {
    if (!buffer.find((i) => i.type === commodity.type)) {
      buffer.push(commodity);
    }
  }

  return buffer;
}
