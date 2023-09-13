import '@fontsource/public-sans';
import '@/index.css';
import ReactDOM from 'react-dom/client';
import {CssBaseline, CssVarsProvider, extendTheme} from "@mui/joy";
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/store";
import {TurretPlannerPage} from "pages/turret-planner";
import {GettingStartedPage} from "@/pages/getting-started";
import {IntlContextProvider} from "@/contexts/intl";
import {CACHE_THEME} from "@/constants/common";
import {inject as VercelAnalytics} from '@vercel/analytics';
import {sendToVercelAnalytics} from "@/vitals";
import reportWebVitals from "@/reportWebVitals";
import {App} from "@/layouts/app";

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
        children: [
            {
                index: true,
                element: <TurretPlannerPage/>
            },
            {
                path: "getting-started",
                element: <GettingStartedPage/>
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/turret-planner" replace/>
    }
]);

root.render(
    <CssVarsProvider theme={theme} defaultMode="dark" modeStorageKey={CACHE_THEME} disableNestedContext>
        <CssBaseline/>

        <Provider store={store}>
            <IntlContextProvider>
                <App>
                    <RouterProvider router={router}/>
                </App>
            </IntlContextProvider>
        </Provider>
    </CssVarsProvider>
);

VercelAnalytics();
reportWebVitals(sendToVercelAnalytics);
