import { LoginParams } from '@template/common';
import { Router, Request } from 'express';
import { COOKIE } from '../../constants/cookie';
import authorize from '../../middlewares/authorize';
import services from '../../services';
import { loginValidations } from './validations';

const router = Router();

/**
 * @swagger
 * api/v1/auth/login:
 *   post:
 *     summary: Log a user in
 *     tags:
 *       - Auth
 */
router.post(
  '/login',
  ...loginValidations,
  (req: Request<any, any, LoginParams>, res, next) => {
    const { email, password } = req.body;
    services.auth
      .login({ email, password })
      .then(({ user, token, refreshToken }) => {
        res.setCookie(COOKIE.TOKEN, token);
        res.setCookie(COOKIE.REFRESH_TOKEN, refreshToken);
        return user;
      })
      .then(res.success)
      .catch(next);
  }
);

router.post('/logout', authorize, (req, res, next) => {
  res.clearCookie(COOKIE.TOKEN);
  res.clearCookie(COOKIE.REFRESH_TOKEN);
  services.auth.revokeToken(req.user.id).then(res.success).catch(next);
});

router.get('/refresh', (req, res, next) => {
  services.auth
    .refreshToken(req.cookies[COOKIE.REFRESH_TOKEN])
    .then(({ newToken, newRefreshToken }) => {
      res.setCookie(COOKIE.TOKEN, newToken);
      res.setCookie(COOKIE.REFRESH_TOKEN, newRefreshToken);
      return true;
    })
    .then(res.success)
    .catch(next);
});

export default router;
