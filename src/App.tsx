import {Container} from "@mui/joy";
import {TurretList} from "./components/turret/list";

function App() {
    return (
        <Container maxWidth={false}>
            <TurretList/>
        </Container>
    );
}

export default App;
