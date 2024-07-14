import {English} from "~contexts/intl/storage/languages/en-US";
import {Russian} from "~contexts/intl/storage/languages/ru";

export const INTL_STORAGE = {
    COMMODITY: {"en-US": English.COMMODITY, ru: Russian.COMMODITY},
    STATION: {"en-US": English.STATION, ru: Russian.STATION},
    TURRET: {"en-US": English.TURRET, ru: Russian.TURRET},
    UI: {"en-US": English.UI, ru: Russian.UI}
} as const;