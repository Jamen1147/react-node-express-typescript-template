import { Router, Request } from 'express';
import authorize from '../../middlewares/authorize';
import services from '../../services';
import { TLoginParams } from '../../services/auth';
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
  (req: Request<any, any, TLoginParams>, res, next) => {
    const { email, password } = req.body;
    services.auth
      .login({ email, password })
      .then(({ user, token }) => {
        res.setCookie('token', token);
        return res.success(user);
      })
      .catch(next);
  }
);

router.post('/logout', authorize, (req, res) => {
  res.clearCookie('token');
  return res.success(true);
});

export default router;
