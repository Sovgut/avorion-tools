import React from 'react';
import '@fontsource/public-sans';
import ReactDOM from 'react-dom/client';
import './index.css';
import {IntlContextProvider} from "./contexts/intl";
import {CssBaseline, CssVarsProvider, extendTheme} from "@mui/joy";
import {TurretContextProvider} from "./contexts/turret";
import {ComponentContextProvider} from "./contexts/component";
import {CargoContextProvider} from "./contexts/cargo";
import {CalculatorContextProvider} from "./contexts/calculator";
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import {Layout} from "./components/layout";
import {TurretGrid} from "./components/turret-grid";

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
                                <TurretGrid/>
                            </Layout>
                        </CalculatorContextProvider>
                    </CargoContextProvider>
                </ComponentContextProvider>
            </TurretContextProvider>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/turret-planner" replace/>
    }
]);

root.render(
    <CssVarsProvider theme={theme} defaultMode="system" modeStorageKey="theme" disableNestedContext>
        <CssBaseline/>

        <IntlContextProvider>
            <RouterProvider router={router}/>
        </IntlContextProvider>
    </CssVarsProvider>
);
