import { Response, Request, NextFunction } from 'express';
import { TOKEN_KEY } from '../constants/cookie';
import { Unauthorized } from '../helpers/httpError';
import services from '../services';

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[TOKEN_KEY] as string;
    if (!token) throw new Unauthorized('Unauthorized');
    const decoded = await services.auth.verify({ token, checkVersion: false });
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
