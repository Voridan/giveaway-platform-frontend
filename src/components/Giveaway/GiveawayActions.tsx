import { Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Giveaway } from '../../models/Giveaway';
import { FC } from 'react';

interface GiveawayActionsProps {
  giveaway: Giveaway | undefined;
  setGiveaway(data: Giveaway): void;
  setIsLoading(data: boolean): void;
}

const GiveawayActions: FC<GiveawayActionsProps> = ({
  giveaway,
  setGiveaway,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`/giveaways/${giveaway?.id}`);
      setGiveaway(response.data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnd = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.post(
        `/giveaways/${giveaway?.id}/end`
      );
      setGiveaway(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {giveaway && (
        <Grid container justifyContent='space-around' mb={4}>
          <Link to={`edit`} state={{ giveaway }}>
            <Button variant='outlined' color='primary'>
              Edit
            </Button>
          </Link>
          <Link to={`results`} state={{ giveawayId: giveaway.id }}>
            <Button variant='outlined' color='primary'>
              Results
            </Button>
          </Link>
          <Button
            disabled={giveaway.ended}
            variant='outlined'
            color='warning'
            onClick={handleEnd}
          >
            End
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      )}
    </>
  );
};

export default GiveawayActions;
