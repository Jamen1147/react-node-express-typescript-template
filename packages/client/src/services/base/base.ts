import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { refreshAuthToken, axiosConfig } from './interceptors';
import env from '../../env';
import Response from './response';

const methods = ['get', 'post', 'put', 'delete'] as const;

type Method = typeof methods[number];

type Request = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => Promise<Response<T>>;

export default abstract class BaseApi {
  private api: AxiosInstance;

  protected get!: Request;

  protected post!: Request;

  protected delete!: Request;

  protected put!: Request;

  constructor(basePath = '') {
    this.api = axios.create({
      baseURL: env.baseUrl + basePath,
    });

    this.api.interceptors.request.use(axiosConfig, Promise.reject);
    this.api.interceptors.response.use(
      (response) => response,
      (error) => refreshAuthToken(this.api, error)
    );

    methods.forEach((method) => {
      this[method] = this.request.bind(this, method) as Request;
    }, this);
  }

  private async request<T>(
    method: Method,
    url: string,
    data?: unknown,
    configurations: AxiosRequestConfig = {}
  ): Promise<Response<T>> {
    let result: Response<T> | null = null;
    const configs = configurations;

    try {
      const request =
        method === 'delete' || method === 'get'
          ? this.api[method](url, configs)
          : this.api[method](url, data, configs);

      const response = await request;
      result = new Response<T>(response.data.data);
    } catch (error) {
      result = new Response(
        error.response,
        error.response?.data?.error?.message || 'Request Failed Unexpectedly'
      );
    }

    return result;
  }
}
