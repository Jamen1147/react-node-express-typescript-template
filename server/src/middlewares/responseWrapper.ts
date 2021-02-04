import { Response, NextFunction } from 'express';

export type ApiResponse<T, M> = {
  ok: boolean;
  data: T | null;
  message: M | null;
  status: number;
};

const response = <T, M>(
  status: number,
  data: T | null = null,
  message?: M
): ApiResponse<T, M> => ({
  ok: status.toString().startsWith('2'),
  data,
  message: message || null,
  status,
});

const responseWrapper = (_: any, res: Response, next: NextFunction) => {
  res.success = <T>(data: T, code = 200) => {
    res.status(code).json(response(code, data));
  };

  res.fail = (error: Record<string, unknown> | string, code = 400) => {
    res.status(code).json(response(code, null, error));
  };

  next();
};

export default responseWrapper;
