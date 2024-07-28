import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from '../api/axios';
import { Auth } from '../models';
import useAuth from '../hooks/useAuth';
import { AdminRoutes, Routes } from '../router/routes';
import { useNavigate } from 'react-router-dom';
import usePopup from '../hooks/usePopup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Popup from './general/Popup';

let SIGNUP_URL = 'auth/local/signup';

const SignupForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { setAuth } = useAuth();
  const popupState = usePopup();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const userName = data.get('userName');
    const password = data.get('password');
    try {
      if (isAdmin) SIGNUP_URL += `?admin=${data.get('adminSecret')}`;
      const response = await axios.post<Auth>(
        SIGNUP_URL,
        JSON.stringify({ email, password, userName }),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setAuth({ ...response.data });
      navigate(isAdmin ? `/${AdminRoutes.ADMIN}` : `/${Routes.CABINET}`, {
        replace: true,
      });
    } catch (err: unknown) {
      console.log(err);
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
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id='userName'
              label='User Name'
              name='userName'
              autoComplete='family-name'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
            />
          </Grid>
          {isAdmin && (
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='adminSecret'
                label='Secret'
                id='adminSecret'
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => setIsAdmin((prev) => !prev)}
                  name='isAdmin'
                  color='primary'
                />
              }
              label='Signup as Admin'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
      <Popup
        content={popupState.popupFields.popupContent}
        isError={popupState.popupFields.isError}
        onClose={popupState.popupHandlers.closePopup}
        open={popupState.popupFields.openPopup}
        title={popupState.popupFields.popupTitle}
      />
    </Box>
  );
};

export default SignupForm;
