import {useContext, useEffect} from "react";
import {TurretContext} from "../contexts/turret";
import {IntlContext} from "../contexts/intl";

export function ComponentList() {
    const turretContext = useContext(TurretContext)
    const intlContext = useContext(IntlContext);

    useEffect(() => {
    }, [turretContext.turrets, intlContext.language]);

    const list = Object.keys(turretContext.turrets).reduce((acc: any, cur: any) => {
        const components = turretContext.turrets[cur];

        for (const component of Object.keys(components)) {
            if (!acc[component]) {
                acc[component] = 0;
            }

            // @ts-ignore
            acc[component] += components[component];
        }

        return acc;
    }, {})

    return <ul>
        {Object.keys(list).map(item => <li key={item}>"{intlContext.text("GOODS", item)}": {list[item]}</li>)}
    </ul>
}