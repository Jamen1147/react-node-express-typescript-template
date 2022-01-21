import { RequestHandler } from 'express';
import { LoginParams } from '@template/common';
import services from '../../services';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../constants/cookie';

const login: RequestHandler<any, any, LoginParams> = (req, res, next) => {
  const { email, password } = req.body;
  services.auth
    .login({
      email,
      password,
    })
    .then(({ user, token, refreshToken }) => {
      res.setCookie(TOKEN_KEY, token);
      res.setCookie(REFRESH_TOKEN_KEY, refreshToken);
      return user;
    })
    .then(res.success)
    .catch(next);
};

const logout: RequestHandler = (req, res, next) => {
  res.clearCookie(TOKEN_KEY);
  res.clearCookie(REFRESH_TOKEN_KEY);
  services.auth.revokeToken(req.user.id).then(res.success).catch(next);
};

const refresh: RequestHandler = (req, res, next) => {
  services.auth
    .refreshToken(req.cookies[REFRESH_TOKEN_KEY])
    .then(({ newToken, newRefreshToken }) => {
      res.setCookie(TOKEN_KEY, newToken);
      res.setCookie(REFRESH_TOKEN_KEY, newRefreshToken);
      return true;
    })
    .then(res.success)
    .catch(next);
};

export default {
  login,
  logout,
  refresh,
};
