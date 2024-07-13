import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant='h1' component='h1'>
          Unauthorized
        </Typography>
        <Typography variant='h6' component='p' sx={{ mt: 2 }}>
          Access denied
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(-1)}
          sx={{ mt: 3 }}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
