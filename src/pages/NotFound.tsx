import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h6' component='p' gutterBottom>
          Oops! The page you're looking for does not exist.
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          variant='contained'
          color='primary'
          sx={{ marginTop: 2 }}
        >
          Go back
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
