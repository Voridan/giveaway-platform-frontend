import { Box, Button, Container, Typography } from '@mui/material';
import GiveawaysList from '../components/Giveaway/GiveawaysList';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Pagination from '../components/general/Pagination';
import SearchInput from '../components/general/SearchInput';
import useReorder from '../hooks/useReorder';
import Loader from '../components/general/Loader/Loader';
import { Link } from 'react-router-dom';
import { useSorted } from '../hooks/useSorted';
import { Routes } from '../router/routes';
import { GiveawayListItem } from '../models/GiveawayListItem';
import useFetching from '../hooks/useFetching';

const PartneredGiveawaysPage = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [giveaways, setGiveaways] = useState<GiveawayListItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const [page, setPage] = useState(1);

  const reorderHandler = useReorder<GiveawayListItem>('title');
  const firstItemRef = useRef<GiveawayListItem | null>(null);
  const lastItemRef = useRef<GiveawayListItem | null>(null);
  const sorted = useSorted<GiveawayListItem>(giveaways, 'createdAt');

  const [fetchFn, loading, error] = useFetching(
    async (limit: number, offset: number, controller: AbortController) => {
      const endPoint =
        '/giveaways/partners/' + auth?.id + `?offset=${offset}&limit=${limit}`;

      const response = await axiosPrivate.get<GiveawayListItem[]>(endPoint, {
        signal: controller.signal,
      });

      if (response.data.length > 0) {
        const totalCount = response.headers['giveaways-total-count'];
        setTotalPages(Math.ceil(totalCount / limit));
        setGiveaways(response.data);
        firstItemRef.current = response.data[0];
        lastItemRef.current = response.data[response.data.length - 1];
      }
    }
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const offset = limit * (page - 1);
    isMounted && fetchFn(limit, offset, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page]);

  return (
    <Container
      maxWidth={false}
      sx={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.95rem',
      }}
      className='need-scrollbar'
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <SearchInput
          styles={{ flex: '1 1 auto' }}
          optionLabelKey='title'
          options={sorted}
          onChange={(selected) => {
            const reordered = reorderHandler(giveaways || [], selected);
            setGiveaways(reordered);
          }}
        />
        <Link to={Routes.ADD_GIVEAWAY} style={{ height: '100%' }}>
          <Button
            variant='outlined'
            sx={{ fontWeight: 600, height: '100%' }}
            color='info'
          >
            Add Giveaway
          </Button>
        </Link>
      </Box>
      <Box mt={4} sx={{ flex: '1 1 auto', position: 'relative' }}>
        {loading && <Loader />}
        {error && (
          <Typography variant='h3' color={'tomato'}>
            {error}
          </Typography>
        )}
        {!loading && !error && !!sorted.length && (
          <GiveawaysList giveaways={sorted} partnered={true} />
        )}
      </Box>
      <Pagination
        isLoading={loading}
        totalPages={totalPages}
        slotSize={3}
        changePage={handlePageChange}
        page={page}
      ></Pagination>
    </Container>
  );
};

export default PartneredGiveawaysPage;
