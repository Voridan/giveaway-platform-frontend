import { useEffect, useRef, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { GiveawayListItem } from '../../models/GiveawayListItem';
import useObserver from '../../hooks/useObserver';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import GiveawaysList from '../../components/Giveaway/GiveawaysList';
import { Container } from '@mui/material';
import InputOnlySearch from '../../components/general/InputOnlySearch/InputOnlySearch';
import { Giveaway } from '../../models/Giveaway';

const GiveawaysModerationPage = () => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [giveaways, setGiveaways] = useState<GiveawayListItem[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const lastItemRef = useRef<GiveawayListItem | null>(null);
  const limit = 10;

  const [fetchFn, loading, error] = useFetching(
    async (limit: number, lastItemId: number, controller: AbortController) => {
      const endPoint = `/giveaways`;

      const response = await axiosPrivate.get<GiveawayListItem[]>(endPoint, {
        signal: controller.signal,
        params: {
          limit,
          lastItemId,
        },
      });

      setGiveaways((prev) => [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
      lastItemRef.current = response.data[response.data.length - 1];
    }
  );

  useObserver({
    canLoad: hasMore,
    loading,
    node: bottomRef,
    callback() {
      setPage(page + 1);
    },
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    isMounted && fetchFn(limit, lastItemRef.current?.id || -1, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page]);

  const handleSearch = (giveawaysResponse: Giveaway[] | null) => {
    if (giveawaysResponse === null) {
      setPage(1);
    } else {
      setGiveaways([
        ...giveawaysResponse.filter((giveaway) => giveaway.onModeration),
      ]);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{ overflow: 'auto', paddingTop: 2 }}
      className='need-scrollbar'
    >
      {error && <p>{error}</p>}
      <InputOnlySearch
        queryParam='query'
        setSearchResult={handleSearch}
        url='/giveaways/search'
        label='search giveaway'
      />
      <GiveawaysList giveaways={giveaways} />
      <div
        ref={bottomRef}
        style={{
          width: '100%',
          height: '60px',
        }}
      ></div>
    </Container>
  );
};

export default GiveawaysModerationPage;
