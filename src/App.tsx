import React, {useContext, useState} from 'react';
import {TurretComponent} from "./components/turret";
import {nanoid} from "nanoid";
import {ComponentList} from "./components/list";
import {TurretContext} from "./contexts/turret";
import {IntlContext} from "./contexts/intl";

function App() {
    const [turrets, setTurrets] = useState<string[]>([]);

    const turretContext = useContext(TurretContext);
    const intlContext = useContext(IntlContext);

    function createTurret() {
        const id = nanoid();

        setTurrets(prevTurrets => ([...prevTurrets, id]))
    }

    function removeTurret(id: string) {
        setTurrets((prevState) => {
            return prevState.filter(turret => turret !== id);
        });

        turretContext.remove(id);
    }

    return (
        <div>
            <select defaultValue={intlContext.language} onChange={(e) => intlContext.selectLanguage(e.target.value)}>
                <option value={"en-US"}>en-US</option>
                <option value={"ru"}>ru</option>
            </select>
            <button onClick={createTurret}>{intlContext.text("UI", "add-turret")}</button>
            {turrets.map(turret => <TurretComponent id={turret} key={turret} onRemove={removeTurret}/>)}
            <ComponentList/>
        </div>
    );
}

export default App;
