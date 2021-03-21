/* eslint-disable import/prefer-default-export */
import { AxiosRequestConfig } from 'axios';
import Storage from '../../utils/storage';

export const requestInterceptor = [
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = Storage.get('token');
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  },
  Promise.reject,
];
