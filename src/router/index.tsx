import AuthPage from '../pages/AuthPage';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import StatsPage from '../pages/StatsPage';
import { Layout } from '../components/Layout';
import ProfilePage from '../pages/ProfilePage';
import Unauthorized from '../components/Unauthorized';
import GiveawaysModerationPage from '../pages/admin/GiveawaysModerationPage';
import RequiresAuth from '../components/RequiresAuth';
import AdminLayout from '../components/AdminLayout';
import PersistentLogin from '../components/PersistentLogin';
import CreateGiveawayPage from '../pages/CreateGiveawayPage';
import GiveawaysPage from '../pages/GiveawaysPage';
import GiveawayPage from '../pages/GiveawayPage';
import EditGiveawayPage from '../pages/EditGiveawayPage';
import GiveawayResultsPage from '../pages/GiveawayResultsPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { AdminRoutes, Routes } from './routes';
import PartneredGiveaways from '../pages/PartneredGiveawaysPage';

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Navigate to={Routes.CABINET} />,
  },
  { path: Routes.UNAUTHORIZED, element: <Unauthorized /> },
  {
    path: Routes.AUTH,
    element: <AuthPage />,
  },
  {
    path: Routes.CABINET,
    element: <PersistentLogin />,
    children: [
      {
        path: '',
        element: <RequiresAuth isAdmin={false} />,
        children: [
          {
            path: '',
            element: <Layout />,
            children: [
              {
                path: Routes.PROFILE,
                element: <ProfilePage />,
              },
              {
                // element: <RequiresAuth isAdmin={false} />,
                path: Routes.STATS,
                // children: [
                // {
                //   path: '',
                element: <StatsPage />,
                // },
                // ],
              },
              {
                path: Routes.PARTNERED,
                element: <RequiresAuth isAdmin={false} />,
                children: [
                  {
                    element: <PartneredGiveaways />,
                    path: '',
                    index: true,
                  },
                  {
                    path: ':id',
                    element: <GiveawayPage />,
                  },
                ],
              },
              {
                element: <RequiresAuth isAdmin={false} />,
                path: Routes.GIVEAWAYS,
                children: [
                  {
                    element: <GiveawaysPage />,
                    index: true,
                    path: '',
                  },
                  {
                    path: Routes.ADD_GIVEAWAY,
                    element: <CreateGiveawayPage />,
                  },
                  {
                    path: ':id',
                    element: <GiveawayPage />,
                  },
                  {
                    path: ':id/edit',
                    element: <EditGiveawayPage />,
                  },
                  {
                    path: ':id/results',
                    element: <GiveawayResultsPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: Routes.RESET_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: AdminRoutes.ADMIN,
    element: <PersistentLogin />,
    children: [
      {
        path: '',
        element: <RequiresAuth isAdmin={true} />,
        children: [
          {
            path: '',
            element: <AdminLayout />,
            children: [
              {
                path: AdminRoutes.GIVEAWAYS,
                element: <GiveawaysModerationPage />,
              },
              {
                path: AdminRoutes.GIVEAWAYS + '/:id',
                element: <GiveawayPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
