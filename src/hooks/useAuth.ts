import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useTrackContext must be used within a TrackProvider');
  }

  return context;
};

export default useAuth;
