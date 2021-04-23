import React, { DependencyList } from 'react';
import { useIsMounted, Status } from '@template/common';
import Response from '../services/base/response';

// TODO: Use 'react-query'

export const useMutation = <A extends any[], T>(
  request: (...args: A) => Promise<Response<T | null>>,
  deps: DependencyList = []
): [
  (...args: A) => Promise<Response<T>>,
  Status,
  T | null,
  string | null,
  () => void
] => {
  const [status, setStatus] = React.useState<Status>('idle');
  const [value, setValue] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const isMounted = useIsMounted();

  const doMutation = React.useCallback(async (...args: A) => {
    setStatus('loading');
    const result = await request(...args);
    if (isMounted.current) {
      if (!result.hasError && result.value) {
        setStatus('succeeded');
        setValue(result.value);
      } else {
        setStatus('failed');
        setError(result.error || 'Failed to get advisors');
      }
    }
    return result as Response<T>;
  }, deps);

  const resetState = React.useCallback(() => {
    setValue(null);
    setError(null);
    setStatus('idle');
  }, []);

  return [doMutation, status, value, error, resetState];
};
