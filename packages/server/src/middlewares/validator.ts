import { validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const requestValidator = (checks: RequestHandler[]) => {
  return [
    ...checks,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.fail(errors.array()[0].msg);
      }
      next();
    },
  ];
};

export default requestValidator;
