import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <Outlet />
    </Box>
  );
};
