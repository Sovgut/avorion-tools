import '@fontsource/public-sans';
import '@/index.css';
import ReactDOM from 'react-dom/client';
import {CssBaseline, CssVarsProvider, extendTheme} from "@mui/joy";
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/store";
import {inject as VercelAnalytics} from "@vercel/analytics";
import {Layout} from "@/common/components/layout";
import {TurretBuilder} from "@/pages/turret-builder";
import {GettingStarted} from "@/pages/getting-started";
import {IntlContextProvider} from "@/contexts/intl";
import {CACHE_THEME} from "@/constants/common";
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
            <Layout>
                <TurretBuilder/>
            </Layout>
        ),
    },
    {
        path: "/turret-planner/getting-started",
        element: (
            <GettingStarted/>
        )
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
                <RouterProvider router={router}/>
            </IntlContextProvider>
        </Provider>
    </CssVarsProvider>
);

VercelAnalytics();
reportWebVitals(sendToVercelAnalytics);
