import '@fontsource/public-sans';
import './index.css';
import ReactDOM from 'react-dom/client';
import {IntlContextProvider} from "./contexts/intl";
import {CssBaseline, CssVarsProvider, extendTheme} from "@mui/joy";
import {TurretContextProvider} from "./contexts/turret";
import {ComponentContextProvider} from "./contexts/component";
import {CargoContextProvider} from "./contexts/cargo";
import {CalculatorContextProvider} from "./contexts/calculator";
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import {Layout} from "./components/layout";
import {TurretBuilder} from "./pages/turret-builder";
import {GettingStarted} from "./pages/getting-started";
import {inject as VercelAnalytics} from '@vercel/analytics';
import {sendToVercelAnalytics} from "@/vitals";
import reportWebVitals from "@/reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
    "colorSchemes": {
        "light": {
            "palette": {
                "background": {
                    "body": "var(--joy-palette-background-level1)"
                }
            }
        },
        "dark": {
            "palette": {}
        }
    }
});

const router = createBrowserRouter([
    {
        path: "/turret-planner",
        element: (
            <TurretContextProvider>
                <ComponentContextProvider>
                    <CargoContextProvider>
                        <CalculatorContextProvider>
                            <Layout>
                                <TurretBuilder/>
                            </Layout>
                        </CalculatorContextProvider>
                    </CargoContextProvider>
                </ComponentContextProvider>
            </TurretContextProvider>
        ),
    },
    {
        path: "/turret-planner/getting-started",
        element: (
            <TurretContextProvider>
                <ComponentContextProvider>
                    <CargoContextProvider>
                        <CalculatorContextProvider>
                            <GettingStarted/>
                        </CalculatorContextProvider>
                    </CargoContextProvider>
                </ComponentContextProvider>
            </TurretContextProvider>
        )
    },
    {
        path: "*",
        element: <Navigate to="/turret-planner" replace/>
    }
]);

root.render(
    <CssVarsProvider theme={theme} defaultMode="dark" modeStorageKey="avorion.tools-theme" disableNestedContext>
        <CssBaseline/>

        <IntlContextProvider>
            <RouterProvider router={router}/>
        </IntlContextProvider>
    </CssVarsProvider>
);

VercelAnalytics();
reportWebVitals(sendToVercelAnalytics);
