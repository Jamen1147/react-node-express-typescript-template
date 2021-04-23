/* eslint-disable import/prefer-default-export */
import { AxiosRequestConfig } from 'axios';

export const requestInterceptor = [
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return {
      ...config,
      withCredentials: true,
    };
  },
  Promise.reject,
];
