import { ListAltRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AdminRoutes } from '../router/routes';
import useAuth from '../hooks/useAuth';

const AdminNavigation = () => {
  const { auth } = useAuth();

  return (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        <ListItem disablePadding>
          <Link to={AdminRoutes.PROFILE} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary={auth?.userName} />
            </ListItemButton>
          </Link>
        </ListItem>
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
      </List>
    </Box>
  );
};

export default AdminNavigation;
