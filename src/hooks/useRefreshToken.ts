import axios from '../api/axios';
import { Auth } from '../models';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await axios.get<Auth>('/auth/refresh', {
      withCredentials: true,
    });
    setAuth({ ...response.data });
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
