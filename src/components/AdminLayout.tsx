import { Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import { Box } from '@mui/material';

const AdminLayout = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
      }}
    >
      <AdminNavigation />
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
