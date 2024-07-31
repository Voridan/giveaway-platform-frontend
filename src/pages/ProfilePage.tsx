import { Avatar, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Logout } from '@mui/icons-material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {
  RESET_PASSWORD_CHANNEL,
  ResetPasswordEvent,
} from '../types/reset-password';

const ProfileContainer = styled(Container)({
  marginTop: '20px',
});

const ProfileBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: 'white',
});

const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '20px',
});

const InfoItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
});

function ProfilePage() {
  const { auth, setAuth } = useAuth();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    return () => {
      if (channel) {
        channel.close();
        setChannel(null);
      }
    };
  }, []);

  const forgotPassword = async () => {
    try {
      await axiosPrivate.post('/auth/forgot-password');
      const newChannel = new BroadcastChannel(RESET_PASSWORD_CHANNEL);
      newChannel.onmessage = (event: MessageEvent<ResetPasswordEvent>) => {
        if (
          !['http://localhost:5173', 'http://127.0.0.1:5173'].includes(
            event.origin
          )
        )
          return;
        if (event.data.didPasswordChanged) {
          setAuth(null);
        }
      };
      setChannel(newChannel);
      alert('Check your mail box');
    } catch (error) {
      alert('Error: ' + (error as AxiosError).message);
    }
  };

  return (
    <ProfileContainer maxWidth='sm'>
      <ProfileBox>
        <Box mb={2}>
          <Avatar alt='User Avatar' sx={{ width: 80, height: 80 }} />
        </Box>
        <InfoBox>
          <InfoItem>
            <Typography variant='subtitle1' color='textSecondary'>
              Email
            </Typography>
            <Typography variant='body1'>{auth?.email}</Typography>
          </InfoItem>
          <InfoItem>
            <Typography variant='subtitle1' color='textSecondary'>
              Username
            </Typography>
            <Typography variant='body1'>{auth?.userName}</Typography>
          </InfoItem>
        </InfoBox>
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          onClick={logout}
          fullWidth
          style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
          <span>Logout</span>
          <Logout />
        </Button>
        <Button
          onClick={forgotPassword}
          variant='outlined'
          color='secondary'
          sx={{ mt: 1 }}
          fullWidth
        >
          Forgot Password
        </Button>
      </ProfileBox>
    </ProfileContainer>
  );
}

export default ProfilePage;
