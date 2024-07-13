import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../router/routes';
import useAuth from '../hooks/useAuth';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate(Routes.AUTH, { replace: true });
    }
  }, [navigate, user]);

  return children;
}
