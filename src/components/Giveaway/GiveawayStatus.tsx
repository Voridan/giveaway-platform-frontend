import { Grid } from '@mui/material';
import { FC } from 'react';
import { NewReleases } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VerifiedIcon from '@mui/icons-material/Verified';

interface GiveawayStatusProps {
  onModeration: boolean;
  ended: boolean;
  expanded: boolean;
}

const GiveawayStatus: FC<GiveawayStatusProps> = ({
  ended,
  onModeration,
  expanded,
}) => {
  return (
    <Grid display={'flex'} alignItems={'center'} gap={'15px'}>
      <Grid width={'auto'} item container alignItems={'center'} gap={'5px'}>
        {onModeration ? (
          <>
            {expanded && 'Not Moderated '}
            <NewReleases color='warning' />
          </>
        ) : (
          <>
            {expanded && 'Moderated '}
            <VerifiedIcon color='success' />
          </>
        )}
      </Grid>
      {ended && (
        <Grid width={'auto'} item container alignItems={'center'} gap={'5px'}>
          {expanded && 'Ended '}
          <TaskAltIcon />
        </Grid>
      )}
    </Grid>
  );
};

export default GiveawayStatus;
