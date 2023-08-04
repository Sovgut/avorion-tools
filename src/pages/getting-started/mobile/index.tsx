import {useContext, useState} from "react";
import {TurretType} from "../../../constants";
import {IntlContext} from "../../../contexts/intl";
import {TurretContext} from "../../../contexts/turret";

export function GettingStartedMobile() {
    const [selected, setSelected] = useState<TurretType>(TurretType.Chaingun);

    const intlContext = useContext(IntlContext);
    const turretContext = useContext(TurretContext);

    function onSelectTurret(value: TurretType | null) {
        if (value) {
            setSelected(value);
        }
    }

    function onAddTurret() {
        if (!selected) return;

        turretContext.add(selected);
    }

    return null;
}