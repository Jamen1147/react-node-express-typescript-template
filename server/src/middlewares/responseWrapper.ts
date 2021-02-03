import { Response, NextFunction } from 'express';

const response = <T, M>(
  status: number,
  data: T | null = null,
  message?: M
) => ({
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
