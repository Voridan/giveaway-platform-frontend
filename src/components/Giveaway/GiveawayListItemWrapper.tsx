import { Box } from '@mui/material';

import { GiveawayListItem as GiveawayListItemModel } from '../../models/GiveawayListItem';
import { FC } from 'react';
import GiveawayListItem from './GiveawayListItem';

interface GiveawayProps {
  giveaway: GiveawayListItemModel;
  partnered?: boolean;
}

const GiveawayListItemWrapper: FC<GiveawayProps> = ({
  giveaway,
  partnered,
}) => {
  return (
    <Box
      sx={{
        pointerEvents: giveaway.onModeration ? 'none' : 'auto',
        opacity: giveaway.onModeration ? 0.4 : 1,
      }}
    >
      <GiveawayListItem giveaway={giveaway} partnered={partnered} />
    </Box>
  );
};

export default GiveawayListItemWrapper;
