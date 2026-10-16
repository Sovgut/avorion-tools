import { createHashRouter, Navigate } from 'react-router';
import { DatabasePage } from '@/features/database/DatabasePage';
import { GalaxyPage } from '@/features/galaxy/GalaxyPage';
import { PlannerPage } from '@/features/planner/PlannerPage';
import { ErrorScreen } from './ErrorScreen';
import { Shell } from './Shell';

export const router = createHashRouter([
  {
    path: '/',
    element: <Shell />,
    errorElement: <ErrorScreen standalone />,
    children: [
      {
        errorElement: <ErrorScreen />,
        children: [
          { index: true, element: <Navigate to="/planner" replace /> },
          { path: 'planner', element: <PlannerPage /> },
          { path: 'galaxy', element: <GalaxyPage /> },
          { path: 'database', element: <Navigate to="/database/commodities" replace /> },
          { path: 'database/:section/:id?', element: <DatabasePage /> },
          // routes of the previous version
          { path: 'turret-planner/*', element: <Navigate to="/planner" replace /> },
          { path: 'factories/*', element: <Navigate to="/database/stations" replace /> },
          { path: '*', element: <Navigate to="/planner" replace /> },
        ],
      },
    ],
  },
]);
