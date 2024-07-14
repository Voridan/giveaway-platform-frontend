import { Box, Grid } from '@mui/material';

import { GiveawayListItem as GiveawayListItemModel } from '../../models/GiveawayListItem';
import { FC } from 'react';
import GiveawayListItem from './GiveawayListItem';
import useAuth from '../../hooks/useAuth';
import GiveawayListItemWrapper from './GiveawayListItemWrapper';

interface GiveawaysListProps {
  giveaways: GiveawayListItemModel[];
  partnered?: boolean;
}

const GiveawaysList: FC<GiveawaysListProps> = ({ giveaways, partnered }) => {
  const { auth } = useAuth();

  return (
    <Box>
      <Grid container spacing={3}>
        {giveaways.map((giveaway, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {auth?.isAdmin ? (
              <GiveawayListItem giveaway={giveaway} />
            ) : (
              <GiveawayListItemWrapper
                giveaway={giveaway}
                partnered={partnered}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GiveawaysList;
