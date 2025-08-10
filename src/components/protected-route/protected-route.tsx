import store, { useDispatch, useSelector } from '../../services/store';
import { ReactElement, useEffect } from 'react';
import {
  checkUserAuthentication,
  userSelectors
} from '../../services/slices/user/userSlice';

import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoading = useSelector(userSelectors.selectorIsLoading);
  const user = useSelector(userSelectors.selectorUser);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' state={{ from: location }} />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
