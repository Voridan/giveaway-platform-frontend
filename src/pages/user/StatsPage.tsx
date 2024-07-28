import { useEffect, useState } from 'react';
import GiveawaysBarChart from '../../components/Giveaway/GiveawaysBarChart';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { GiveawayListItem } from '../../models/GiveawayListItem';
const data = [
  { name: 'Giveaway 1', participantsCount: 120 },
  { name: 'Giveaway 2', participantsCount: 90 },
  { name: 'Giveaway 3', participantsCount: 150 },
  { name: 'Giveaway 4', participantsCount: 200 },
];
export default function StatsPage() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [giveaways, setGiveaways] = useState<GiveawayListItem[]>([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fn = async () => {
      const endPoint =
        '/giveaways/users/' +
        auth?.id +
        `?limit=${10}&offset=${0}&lastItemId=${undefined}&next=${true}`;

      const response = await axiosPrivate.get<GiveawayListItem[]>(endPoint, {
        signal: controller.signal,
      });
      setGiveaways(response.data);
    };
    fn();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <GiveawaysBarChart data={data}></GiveawaysBarChart>;
}
