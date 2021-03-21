import { Router, Request } from 'express';
import authorize from '../../middlewares/authorize';
import services from '../../services';
import { TRegisterParams } from '../../services/user';
import { registerValidations } from './validations';

const router = Router();

/**
 * @swagger
 * api/v1/user/me:
 *   get:
 *     summary: Get currently logged-in user
 *     tags:
 *       - User
 */
router.get('/me', authorize, (req, res, next) => {
  services.user.getCurrentUser(req.user.id).then(res.success).catch(next);
});

/**
 * @swagger
 * api/v1/user:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - User
 */
router.post(
  '/',
  ...registerValidations,
  (req: Request<any, any, TRegisterParams>, res, next) => {
    const { email, password, name } = req.body;
    services.user
      .register({ email, password, name })
      .then(res.success)
      .catch(next);
  }
);

/**
 * @swagger
 * api/v1/user:
 *   delete:
 *     summary: Unregister a user
 *     tags:
 *       - User
 */
router.delete('/', authorize, (req, res, next) => {
  services.user
    .unregister(req.user.id)
    .then(() => res.success(null))
    .catch(next);
});

export default router;
