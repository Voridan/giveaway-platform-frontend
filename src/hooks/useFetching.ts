import { AxiosError } from 'axios';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type callable = (...args: any[]) => Promise<void>;

const useFetching = (callback: callable) => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetching: callable = async (...args) => {
    try {
      setLoading(true);
      await callback(...args);
    } catch (error) {
      if (error instanceof AxiosError && error.code !== 'ERR_CANCELED') {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return [fetching, loading, error] as const;
};

export default useFetching;
