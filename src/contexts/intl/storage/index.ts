import {IIntlStorage} from "./types";
import {EN_US_COMPONENT, EN_US_STATION, EN_US_TURRET, EN_US_UI} from "./languages/en-US";
import {RU_COMPONENT, RU_STATION, RU_TURRET, RU_UI} from "./languages/ru";

export const INTL_STORAGE: IIntlStorage = {
    COMPONENT: {"en-US": EN_US_COMPONENT, ru: RU_COMPONENT},
    STATION: {"en-US": EN_US_STATION, ru: RU_STATION},
    TURRET: {"en-US": EN_US_TURRET, ru: RU_TURRET},
    UI: {"en-US": EN_US_UI, ru: RU_UI}
}