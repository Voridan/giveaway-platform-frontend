import AuthPage from '../pages/AuthPage';
import { createBrowserRouter } from 'react-router-dom';
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
import NotFoundPage from '../pages/NotFound';
import { CabinetLayout } from '../components/CabinetLayout';

export const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <Layout />,
    children: [
      // public
      {
        path: Routes.AUTH,
        element: <AuthPage />,
      },
      {
        path: Routes.UNAUTHORIZED,
        element: <Unauthorized />,
      },
      {
        path: Routes.RESET_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      // protected
      {
        element: <PersistentLogin />,
        path: Routes.CABINET,
        children: [
          {
            element: <CabinetLayout />,
            path: '',
            children: [
              {
                path: Routes.PROFILE,
                element: <RequiresAuth isAdmin={false} />,
                children: [
                  {
                    path: '',
                    element: <ProfilePage />,
                  },
                ],
              },
              {
                path: Routes.PARTNERED,
                element: <RequiresAuth isAdmin={false} />,
                children: [
                  {
                    path: '',
                    index: true,
                    element: <PartneredGiveaways />,
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
                    path: '',
                    index: true,
                    element: <GiveawaysPage />,
                  },
                  {
                    path: ':id',
                    index: true,
                    element: <GiveawayPage />,
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
      {
        element: <PersistentLogin />,
        path: AdminRoutes.ADMIN,
        children: [
          {
            path: '',
            element: <AdminLayout />,
            children: [
              {
                path: AdminRoutes.GIVEAWAYS,
                element: <RequiresAuth isAdmin={true} />,
                children: [
                  {
                    path: '',
                    index: true,
                    element: <GiveawaysModerationPage />,
                  },
                  {
                    path: ':id',
                    element: <GiveawayPage />,
                  },
                ],
              },
              {
                path: AdminRoutes.PROFILE,
                element: <RequiresAuth isAdmin={true} />,
                children: [
                  {
                    path: '',
                    element: <ProfilePage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // catch all
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
