import { Grid, Link } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

interface AuthFooterProps {
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
}

const AuthFooter: React.FC<AuthFooterProps> = (props) => {
  return (
    <Grid container>
      <Grid item xs>
        {props.login && (
          <Link
            href='#'
            onClick={(e: MouseEvent<HTMLElement>) => {
              e.preventDefault();
            }}
            variant='body2'
          >
            Forgot password?
          </Link>
        )}
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default AuthFooter;
