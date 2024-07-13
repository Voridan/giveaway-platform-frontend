import { FC } from 'react';
import { Giveaway } from '../../models/Giveaway';
import { Button, Grid } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

interface GiveawayActionsProps {
  giveaway: Giveaway | undefined;
}

const GiveawayAdminActions: FC<GiveawayActionsProps> = ({ giveaway }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleApprovement = async () => {
    const response = await axiosPrivate.patch(
      `/giveaways/moderation/${giveaway?.id}/approve`
    );
    alert(response.data.message);
    navigate(-1);
  };

  const handleDelete = async () => {
    const response = await axiosPrivate.delete(
      `/giveaways/moderation/${giveaway?.id}/delete`
    );
    alert(response.data.message);
    navigate(-1);
  };

  return (
    <>
      {giveaway && (
        <Grid container justifyContent='space-around' mb={4}>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleApprovement}
          >
            APPROVE
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      )}
    </>
  );
};

export default GiveawayAdminActions;
