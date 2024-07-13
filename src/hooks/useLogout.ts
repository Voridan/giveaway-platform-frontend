import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';
import { Routes } from '../router/routes';

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth(null);
    try {
      await axiosPrivate.get('/auth/logout');
      navigate(Routes.AUTH, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
