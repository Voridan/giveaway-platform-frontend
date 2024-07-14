import { Box, Grid, Typography } from '@mui/material';

import { GiveawayListItem as GiveawayListItemModel } from '../../models/GiveawayListItem';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import GiveawayStatus from './GiveawayStatus';

interface GiveawayProps {
  giveaway: GiveawayListItemModel;
  partnered?: boolean;
}

const GiveawayListItem: FC<GiveawayProps> = ({ giveaway, partnered }) => {
  return (
    <Box position={'relative'}>
      <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
        <GiveawayStatus
          ended={giveaway.ended}
          expanded={false}
          onModeration={giveaway.onModeration}
        />
      </Box>
      <Link
        to={`${giveaway.id}`}
        state={{ partnered }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            border: '2px solid #1698de87',
            padding: 2,
            width: '100%',
            margin: '10px auto',
            borderRadius: '14px',
            transition: 'all 0.3s ease 0s',
            '&:hover': {
              backgroundColor: '#3eb9fc59',
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant='h6'>Image</Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: 'bold' }}
                      color={'#115293'}
                    >
                      {giveaway.title}
                    </Typography>
                    <Typography variant='body2'>
                      Created:{' '}
                      {new Date(giveaway.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant='body2'>
                      {giveaway.participantsCount} participants
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  );
};

export default GiveawayListItem;
