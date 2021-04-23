import React, { DependencyList } from 'react';
import { Status } from '@template/common';
import Response from '../services/base/response';
import { useMutation } from './useMutation';

// TODO: Use 'react-query'

export const useQuery = <T>(
  request: () => Promise<Response<T | null>>,
  deps: DependencyList = []
): [Status, T | null, string | null] => {
  const [doQuery, status, value, err] = useMutation(request, deps);

  React.useEffect(() => {
    doQuery();
  }, [doQuery]);

  return [status, value, err];
};
