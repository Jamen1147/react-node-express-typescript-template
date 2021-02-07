import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import env from '../env';
import Response from './types/response';
import { requestInterceptor } from './interceptors';

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

  constructor() {
    this.api = axios.create({
      baseURL: env.baseUrl,
    });

    this.api.interceptors.request.use(...requestInterceptor);

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
      result = new Response<T>(response.data);
    } catch (error) {
      result = new Response(error.response, error.message);
    }

    return result;
  }
}