/* eslint-disable import/prefer-default-export */
import { AxiosRequestConfig } from 'axios';
import storage from '../utils/storage';

export const requestInterceptor = [
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(storage.token && { Authorization: `Bearer ${storage.token}` }),
      },
    };
  },
  Promise.reject,
];
