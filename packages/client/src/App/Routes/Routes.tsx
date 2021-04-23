import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { Loader } from '@template/components';
import { useMountedEffect } from '@template/common';
import { useQuery } from '../../hooks/useQuery';
import userService from '../../services/user';
import { useDispatch, useSelector } from '../../context/global/config';
import { loginAction } from '../../context/global/user/action';

const Home = lazy(() => import('../../pages/Home'));
const Login = lazy(() => import('../../pages//Login'));
const Register = lazy(() => import('../../pages/Register'));

type RouteTypes = 'unauthenticated' | 'normal';

const routes: Record<RouteTypes, JSX.Element[]> = {
  unauthenticated: [
    <Route key="/login" path="/login" component={Login} />,
    <Route key="/register" path="/register" component={Register} />,
  ],
  normal: [<Route key="/" path="/" component={Home} />],
};

const Routes = () => {
  const [routeType, setRouteType] = useState<RouteTypes>('unauthenticated');
  const [status, me, error] = useQuery(() => userService.getMe());
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (me && !error) {
      dispatch(loginAction(me));
      setRouteType('normal');
    } else if (error) {
      history.push('/login');
    }
  }, [me, error]);

  useMountedEffect(() => {
    setRouteType(user ? 'normal' : 'unauthenticated');
  }, [user]);

  if (status === 'loading') {
    return <Loader size="large" />;
  }

  return (
    <Switch>
      <Suspense fallback={<Loader size="large" color="secondary" />}>
        {routes[routeType]}
      </Suspense>
    </Switch>
  );
};

export default Routes;
