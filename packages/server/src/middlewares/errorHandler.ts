import { Response } from 'express';
import { HttpError } from '../helpers/httpError';

const errorHandler = (
  error: HttpError | Error,
  req: any,
  res: Response,
  next: any
) => {
  if (error instanceof HttpError) {
    return res.fail(error.message, error.getCode());
  }

  console.error(error);
  if (process.env.NODE_ENV === 'development') {
    return res.fail({ message: error.message, stack: error.stack }, 500);
  } else {
    return res.fail(error.message, 500);
  }
};

export default errorHandler;
