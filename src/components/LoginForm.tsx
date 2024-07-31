import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExtendedLocation } from '../types';
import axios from '../api/axios';
import Popup from './general/Popup';
import { AxiosError } from 'axios';
import usePopup from '../hooks/usePopup';
import { Auth } from '../models';
import { AdminRoutes, Routes } from '../router/routes';
import { useEffect } from 'react';

const LOGIN_URL = '/auth/local/login';

const LoginForm = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const popupState = usePopup();
  const navigate = useNavigate();
  const location = useLocation() as ExtendedLocation;
  let from = location.state?.from?.pathname || Routes.CABINET;

  useEffect(() => localStorage.setItem('persist', `${persist}`), [persist]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    try {
      const response = await axios.post<Auth>(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setAuth({ ...response.data });
      if (response.data.isAdmin) from = AdminRoutes.ADMIN;
      navigate('/' + from);
    } catch (err: unknown) {
      popupState.popupHandlers.setOpenPopup(true);
      popupState.popupHandlers.setPopupTitle('Request error');
      popupState.popupHandlers.setIsError(true);

      if (err instanceof AxiosError) {
        if (!err?.response) {
          popupState.popupHandlers.setPopupContent('No Server Response');
        } else if (err.response?.status === 400) {
          popupState.popupHandlers.setPopupContent(err.response.data.message);
        } else if (err.response?.status === 401) {
          popupState.popupHandlers.setPopupContent('Unauthorized');
        } else {
          popupState.popupHandlers.setPopupContent('Login Failed');
        }
      } else {
        popupState.popupHandlers.setPopupContent('Unknown error');
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setPersist((prev) => !prev)}
              checked={persist}
              name='persist'
              color='primary'
            />
          }
          label='Trust this Device'
        />
      </Box>
      <Popup
        open={popupState.popupFields.openPopup}
        content={popupState.popupFields.popupContent}
        title={popupState.popupFields.popupTitle}
        onClose={popupState.popupHandlers.closePopup}
        isError={popupState.popupFields.isError}
      />
    </Box>
  );
};

export default LoginForm;
