import { useEffect, useState } from 'react';
import GiveawaysBarChart from '../../components/Giveaway/GiveawaysBarChart';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { StatsParticipant } from '../../types';
import { AxiosError } from 'axios';
import Loader from '../../components/general/Loader/Loader';

const ChartPage = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<StatsParticipant[]>();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const endPoint = '/giveaways/stats-participants/users/' + auth?.id;
        const res = await axiosPrivate.get<StatsParticipant[]>(endPoint, {
          signal: controller.signal,
        });
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        if (error instanceof AxiosError) console.error(error.response?.data);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return <>{data ? <GiveawaysBarChart data={data} /> : <Loader />};</>;
  // return <p>{JSON.stringify(data)}</p>;
};

export default ChartPage;
