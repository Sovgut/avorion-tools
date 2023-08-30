import {IntlStorage} from "./types";
import English from "@/contexts/intl/storage/languages/en-US";
import Russian from "@/contexts/intl/storage/languages/ru";

export const INTL_STORAGE: IntlStorage = {
    COMPONENT: {"en-US": English.COMPONENT, ru: Russian.COMPONENT},
    SELLER: {"en-US": English.SELLER, ru: Russian.SELLER},
    TURRET: {"en-US": English.TURRET, ru: Russian.TURRET},
    UI: {"en-US": English.UI, ru: Russian.UI}
}