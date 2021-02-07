/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type TProps = {
  condition: boolean;
  component: React.ComponentType<any>;
  redirect?: string;
} & Omit<RouteProps, 'component' | 'render'>;

const ConditionalRoute = ({
  condition,
  component: Component,
  redirect = '/login',
  ...routeProps
}: TProps) => {
  return (
    <Route
      {...routeProps}
      render={(props) => {
        if (condition) {
          return <Component {...props} />;
        }
        return <Redirect to={redirect} />;
      }}
    />
  );
};

export default ConditionalRoute;
