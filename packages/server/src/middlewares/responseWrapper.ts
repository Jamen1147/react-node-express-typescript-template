import { Response, NextFunction, CookieOptions } from 'express';
import env from '../helpers/env';

export type ApiResponse<T, E> = {
  ok: boolean;
  data: T | null;
  error: E | null;
  status: number;
};

const response = <T, E>(
  status: number,
  data: T | null = null,
  error?: E
): ApiResponse<T, E> => ({
  ok: status.toString().startsWith('2'),
  data,
  error: error || null,
  status,
});

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.current !== 'development',
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

const responseWrapper = (_: any, res: Response, next: NextFunction) => {
  res.success = <T>(data: T, code = 200) => {
    res.status(code).json(response(code, data));
  };

  res.fail = (error: Record<string, unknown> | string, code = 400) => {
    res.status(code).json(response(code, null, error));
  };

  res.setCookie = (name: string, value: string, options?: CookieOptions) =>
    res.cookie(name, value, { ...defaultCookieOptions, ...(options || {}) });

  next();
};

export default responseWrapper;
