import { NextFunction, Response, Request } from 'express';
import AuthHelper from '../helpers/auth';
import { Unthorized } from '../helpers/httpError';

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies as Record<string, string>;
    if (!token) {
      throw new Unthorized('Unthorized');
    }
    const decoded = AuthHelper.verify(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    next(new Unthorized(error));
  }
};

export default authorize;
