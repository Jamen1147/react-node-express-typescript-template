/* eslint-disable no-console */
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?:
    | React.ReactNode
    | ((
        error: Error | null,
        errorInfo: React.ErrorInfo | null
      ) => React.ReactNode);
};

type States = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<Props, States> {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report the error to server from here.
    console.error({ error, errorInfo });
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return typeof fallback === 'function'
          ? fallback(error, errorInfo)
          : fallback;
      }
      return <h3>Something went wrong</h3>;
    }

    return children;
  }
}
