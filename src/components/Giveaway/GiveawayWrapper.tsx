import useAuth from '../../hooks/useAuth';
import Giveaway from './Giveaway';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { Giveaway as GiveawayModel } from '../../models/Giveaway';
import GiveawayActions from './GiveawayActions';
import GiveawayAdminActions from './GiveawayAdminActions';
import Loader from '../general/Loader/Loader';
import { Container } from '@mui/material';

const GiveawayWrapper = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [giveaway, setGiveaway] = useState<GiveawayModel>();
  const [isLoading, setIsLoading] = useState(false);

  //TODO error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get<GiveawayModel>(
          '/giveaways/' + id
        );
        setGiveaway(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth={false} sx={{ margin: '10px 0' }}>
      {isLoading && <Loader />}
      <Giveaway giveaway={giveaway} />
      {auth?.isAdmin ? (
        <GiveawayAdminActions giveaway={giveaway} />
      ) : (
        <GiveawayActions
          giveaway={giveaway}
          setGiveaway={setGiveaway}
          setIsLoading={setIsLoading}
        />
      )}
    </Container>
  );
};

export default GiveawayWrapper;
