import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelector, getFeeds } from '../../services/slices/feed/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] =
    useSelector((state) => state.feed.orders?.orders) || [];
  const isLoading = useSelector((state) => state.feed.isLoading);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
