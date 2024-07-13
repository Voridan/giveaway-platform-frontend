import {
  BarChartRounded,
  ListAltRounded,
  PageviewRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Routes } from '../router/routes';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { auth } = useAuth();

  return (
    <Box sx={{ width: 250 }} role='presentation'>
      <List>
        <ListItem disablePadding>
          <Link to={Routes.PROFILE} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary={auth?.userName} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to={Routes.GIVEAWAYS} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <ListAltRounded color={'primary'} />
              </ListItemIcon>
              <ListItemText primary={'Giveaways'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Routes.EXPLORE} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <PageviewRounded color={'primary'} />
              </ListItemIcon>
              <ListItemText primary={'Explore'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to={Routes.STATS} style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <BarChartRounded color={'primary'} />
              </ListItemIcon>
              <ListItemText primary={'Stats'} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Navigation;
