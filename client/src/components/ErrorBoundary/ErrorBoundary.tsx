/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import env from '../../env';
import ErrorPage from '../ErrorPage';

export default class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean }
> {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error);
    if (env.current === 'development') {
      console.error(info.componentStack);
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorPage />;
    }

    return children;
  }
}
