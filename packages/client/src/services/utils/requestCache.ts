import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export type AxiosRequestCache = {
  resolve: (value: AxiosRequestConfig) => void;
  reject: (reason: AxiosError) => void;
  error: AxiosError;
};

export const createPromiseCache = (
  instance: AxiosInstance,
  error: AxiosError,
  cache: AxiosRequestCache[]
) =>
  new Promise<AxiosRequestConfig>((resolve, reject) => {
    cache.push({
      resolve,
      reject,
      error,
    });
  }).then(instance);
