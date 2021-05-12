/* eslint-disable import/prefer-default-export */
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { refreshToken } from '../utils/refreshToken';
import { AxiosRequestCache, createPromiseCache } from '../utils/requestCache';
import { HttpStatusCode } from '../utils/statusCode';

export const axiosConfig = (
  config: AxiosRequestConfig
): AxiosRequestConfig => ({
  ...config,
  withCredentials: true,
});

export const refreshAuthToken = (() => {
  let isRefreshingToken = false;
  const requestCache: AxiosRequestCache[] = [];

  return <T = unknown>(instance: AxiosInstance, error: AxiosError<T>) => {
    if (error.response) {
      const {
        response: { config, status },
      } = error;

      if (
        !config.url?.includes('/api/auth') &&
        status === HttpStatusCode.UNAUTHORIZED
      ) {
        if (isRefreshingToken && requestCache.length > 0) {
          return createPromiseCache(instance, error, requestCache);
        }

        isRefreshingToken = true;

        refreshToken(instance)
          .then(() =>
            requestCache.forEach((request) =>
              request.resolve(request.error.config)
            )
          )
          .catch(() =>
            requestCache.forEach((request) => request.reject(request.error))
          )
          .finally(() => {
            requestCache.forEach((request) => request.reject(request.error));
            isRefreshingToken = false;
          });

        return createPromiseCache(instance, error, requestCache);
      }
    }

    return Promise.reject(error);
  };
})();
