import { Box, Button, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {
  RESET_PASSWORD_CHANNEL,
  ResetPasswordEvent,
} from '../types/reset-password';

interface ResetPasswordModel {
  oldPassword: string;
  newPassword: string;
  secret: string;
}

const ForgotPasswordPage = () => {
  const search = useLocation().search;
  const axiosPrivate = useAxiosPrivate();
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: ResetPasswordModel = {
      newPassword: formValues.newPassword,
      oldPassword: formValues.oldPassword,
      secret: new URLSearchParams(search).get('secret')!,
    };

    try {
      setLoading(true);
      await axiosPrivate.post('/auth/reset-password', body);
      const channel = new BroadcastChannel(RESET_PASSWORD_CHANNEL);
      const message: ResetPasswordEvent = {
        didPasswordChanged: true,
      };
      channel.postMessage(message);
      channel.close();
      alert('done');
      window.close();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        opacity: loading ? 0.4 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      <Typography variant='h5' component='h2' sx={{ mb: 2 }}>
        Reset Password
      </Typography>
      <TextField
        label='Old Password'
        type='password'
        name='oldPassword'
        value={formValues.oldPassword}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label='New Password'
        type='password'
        name='newPassword'
        value={formValues.newPassword}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type='submit' variant='contained' color='primary' fullWidth>
        Submit
      </Button>
      {error && (
        <Typography color='#f44336' variant='body1'>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ForgotPasswordPage;
