import { NextFunction, Response, Request } from 'express';
import { COOKIE } from '../constants/cookie';
import { Unthorized } from '../helpers/httpError';
import services from '../services';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[COOKIE.TOKEN] as string;
    if (!token) {
      throw new Unthorized('Unthorized');
    }
    const decoded = await services.auth.verify({
      token,
      checkVersion: false,
    });
    req.user = decoded.user;
    next();
  } catch (error) {
    next(new Unthorized(error));
  }
};

export default authorize;
