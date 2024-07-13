import { Avatar, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Logout } from '@mui/icons-material';

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
  const { auth } = useAuth();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const forgotPssword = async () => {
    await axiosPrivate.post('/auth/forgot-password');
    alert('Check your mail box');
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
          onClick={forgotPssword}
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
