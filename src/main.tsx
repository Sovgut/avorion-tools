import "@fontsource/inter";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { TurretPlannerPage } from "~pages/turret-planner";
import { GettingStartedPage } from "~pages/getting-started";
import { IntlContextProvider } from "~contexts/intl";
import { CACHE_THEME } from "~constants/common";
import { App } from "~layouts/app";
import { store } from "~store";
import { AnimatePresence } from "framer-motion";
import { AnimationControlContextProvider } from "~contexts/animation-control";
import { FactoriesPage } from "~pages/factories";
import { GlobalSearchProvider } from "~components/search/provider";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "var(--joy-palette-background-level1)",
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "factories",
        children: [
          {
            index: true,
            element: <FactoriesPage />,
          },
        ],
      },
      {
        path: "turret-planner",
        children: [
          {
            index: true,
            element: (
              <AnimatePresence mode="wait">
                <TurretPlannerPage />
              </AnimatePresence>
            ),
          },
          {
            path: "getting-started",
            element: (
              <AnimatePresence mode="wait">
                <GettingStartedPage />
              </AnimatePresence>
            ),
          },
        ],
      },
      {
        index: true,
        element: <Navigate to="/turret-planner" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/turret-planner" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider
      theme={theme}
      defaultMode="dark"
      modeStorageKey={CACHE_THEME}
      disableNestedContext
    >
      <CssBaseline />

      <GlobalSearchProvider>
        <Provider store={store}>
          <IntlContextProvider>
            <AnimationControlContextProvider>
              <RouterProvider router={router} />
            </AnimationControlContextProvider>
          </IntlContextProvider>
        </Provider>
      </GlobalSearchProvider>
    </CssVarsProvider>
  </StrictMode>
);
