import { AxiosInstance } from 'axios';

export const refreshToken = async (instance: AxiosInstance) => {
  const result = await instance.get<boolean>('/refresh', {
    withCredentials: true,
  });
  return result;
};
