import { Grid, Link } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../router/routes';

interface AuthFooterProps {
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

const AuthFooter: React.FC<AuthFooterProps> = (props) => {
  return (
    <Link
      href='#'
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.setLogin((prev) => !prev);
      }}
      variant='body2'
    >
      {props.login
        ? "Don't have an account? Sign Up"
        : ' Already have an account? Sign in'}
    </Link>
  );
};

export default AuthFooter;
