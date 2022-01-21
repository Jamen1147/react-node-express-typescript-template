import { RequestHandler } from 'express';
import { RegisterParams } from '../../services/user/user';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../constants/cookie';
import services from '../../services';

const getMe: RequestHandler = (req, res, next) =>
  services.user.getCurrentUser(req.user.id).then(res.success).catch(next);

const register: RequestHandler<any, any, RegisterParams> = (req, res, next) => {
  const { email, password, name } = req.body;
  services.user
    .register({ email, password, name })
    .then(res.success)
    .catch(next);
};

const unregister: RequestHandler = (req, res, next) => {
  services.user
    .unregister(req.user.id)
    .then(() => {
      res.clearCookie(TOKEN_KEY);
      res.clearCookie(REFRESH_TOKEN_KEY);
      return true;
    })
    .then(res.success)
    .catch(next);
};

export default {
  getMe,
  register,
  unregister,
};
