import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { GiveawayResultsModel } from '../models/GiveawayResults';
import Loader from '../components/general/Loader/Loader';
import { Box, Container, Typography } from '@mui/material';
import { AxiosError } from 'axios';

const GiveawayResultsPage = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [winner, setWinner] = useState<string>();
  const [participants, setParticipants] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getResults = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get<GiveawayResultsModel>(
          `/giveaways/${id}/results`
        );
        const { participants, winner } = response.data;
        if (response.statusText === 'OK') {
          setParticipants(participants);
          setWinner(winner);
        } else {
          alert('smth went wrong');
        }
      } catch (error) {
        error instanceof AxiosError && alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Container>
          <Typography
            textAlign={'center'}
            variant='h4'
            pt={2}
            pb={2}
            height={'10%'}
          >
            {winner || 'No winner yet.'}
          </Typography>
          <Box
            sx={{
              margin: '10px 0',
              padding: '20px',
              overflowY: 'auto',
              height: 'calc(90% - 60px)',
              background: 'rgba(95, 181, 222, 0.31)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: '2px solid rgba(0, 105, 154, 0.7)',
            }}
            className='need-scrollbar'
          >
            {participants?.map((participant, idx) => (
              <Typography key={participant}>
                {idx + 1}) {participant}
              </Typography>
            ))}
          </Box>
        </Container>
      )}
    </>
  );
};

export default GiveawayResultsPage;
