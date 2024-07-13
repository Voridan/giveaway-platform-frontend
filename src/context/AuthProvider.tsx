import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { Auth } from '../models';

export interface AuthContextType {
  auth: Auth | null;
  persist: boolean;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
  setPersist: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || 'false')
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
