import { NextFunction, Response, Request } from 'express';
import AuthHelper from '../helpers/auth';
import { Unthorized } from '../helpers/httpError';

const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Unthorized('Unthorized');
    }
    const decoded = AuthHelper.verify(token.split('Bearer ')[1]);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log('failed?', error);
    next(new Unthorized(error));
  }
};

export default authorize;
