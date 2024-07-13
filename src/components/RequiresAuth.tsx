import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Routes } from '../router/routes';
import { FC } from 'react';

interface RequiresAuthProps {
  isAdmin: boolean;
}

const RequiresAuth: FC<RequiresAuthProps> = ({ isAdmin }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.isAdmin === isAdmin ? (
    <Outlet />
  ) : auth ? (
    <Navigate to={Routes.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={Routes.AUTH} state={{ from: location }} replace />
  );
};

export default RequiresAuth;
