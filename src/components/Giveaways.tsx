import { Box, Button, Container, Typography } from '@mui/material';
import GiveawaysList from '../components/Giveaway/GiveawaysList';
import { useCallback, useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Pagination from '../components/general/Pagination';
import SearchInput from '../components/general/SearchInput';
import useReorder from '../hooks/useReorder';
import Loader from '../components/general/Loader/Loader';
import { Link } from 'react-router-dom';
import { useSorted } from '../hooks/useSorted';
import { Routes } from '../router/routes';
import { AxiosError } from 'axios';
import { GiveawayListItem } from '../models/GiveawayListItem';

export default function GiveawaysPage() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [giveaways, setGiveaways] = useState<GiveawayListItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 4;
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [next, setNext] = useState(true);

  const reorderHandler = useReorder<GiveawayListItem>('title');
  const firstItemRef = useRef<GiveawayListItem | null>(null);
  const lastItemRef = useRef<GiveawayListItem | null>(null);
  const sorted = useSorted<GiveawayListItem>(giveaways, 'createdAt');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchFn = useCallback(
    async (
      limit: number,
      offset: number,
      next: boolean,
      lastItemId: number | undefined,
      controller: AbortController
    ) => {
      try {
        setIsLoading(() => true);
        const endPoint =
          '/giveaways/users/' +
          auth?.id +
          `?limit=${limit}&offset=${offset}&lastItemId=${lastItemId}&next=${next}`;

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
      } catch (error) {
        if (error instanceof AxiosError && error.code !== 'ERR_CANCELED') {
          setError(error);
        }
      } finally {
        setIsLoading(() => false);
      }
    },
    [axiosPrivate, auth?.id]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > page) {
      setNext(true);
    } else {
      setNext(false);
    }
    setPage(newPage);
    setPrevPage(page);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const lastItem = next ? lastItemRef.current : firstItemRef.current;
    const pageDiff = Math.abs(page - prevPage);
    const lastItemId = pageDiff === 1 ? lastItem?.id : undefined;

    let offset;
    if (next) {
      offset = pageDiff > 1 ? (page - 1) * limit : 0;
    } else {
      offset = (page - 1) * limit;
    }

    isMounted && fetchFn(limit, offset, next, lastItemId, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page, fetchFn]);

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
        {isLoading && <Loader />}
        {error && (
          <Typography variant='h3' color={'tomato'}>
            {error.message}
          </Typography>
        )}
        {!isLoading && !error && !!sorted.length && (
          <GiveawaysList giveaways={sorted} />
        )}
      </Box>
      <Pagination
        isLoading={isLoading}
        totalPages={totalPages}
        slotSize={3}
        changePage={handlePageChange}
        page={page}
      ></Pagination>
    </Container>
  );
}
