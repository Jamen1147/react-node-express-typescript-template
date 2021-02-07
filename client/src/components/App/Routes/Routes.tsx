import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTypedSelector } from '../../../stores/store';
import storage from '../../../utils/storage';
import ErrorPage from '../../ErrorPage';
import Home from '../../HomePage';
import Loader from '../../shared/Loader';
import ConditionalRoute from './ConditionalRoute';

const Login = React.lazy(() => import('../../LoginPage'));

const Routes = () => {
  const loggedIn = useTypedSelector((state) => state.user.loggedIn);

  return (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <ConditionalRoute
          condition={!loggedIn && !storage.token}
          component={Login}
          path="/login"
          exact
          redirect="/"
        />
        <ConditionalRoute
          component={Home}
          condition={!!storage.token}
          path="/"
          exact
        />
        <Route render={() => <ErrorPage code={404} />} />
      </Switch>
    </React.Suspense>
  );
};

export default Routes;
