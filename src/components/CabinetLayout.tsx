import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export const CabinetLayout = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
      }}
    >
      <Navigation />
      <Outlet />
    </Box>
  );
};
