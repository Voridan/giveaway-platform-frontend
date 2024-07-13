import { ListAltRounded, Logout } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AdminRoutes } from '../router/routes';
import useLogout from '../hooks/useLogout';

const AdminNavigation = () => {
  const logout = useLogout();

  return (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        <ListItem disablePadding>
          <Link to={AdminRoutes.GIVEAWAYS} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <ListAltRounded color={'primary'} />
              </ListItemIcon>
              <ListItemText primary={'Giveaways'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout color={'primary'} />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminNavigation;
