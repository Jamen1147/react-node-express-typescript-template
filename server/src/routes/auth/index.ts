import { Router, Request } from 'express';
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
    services.auth.login({ email, password }).then(res.success).catch(next);
  }
);

export default router;
