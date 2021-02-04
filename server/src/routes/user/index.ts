import { Router, Request } from 'express';
import authorize from '../../middlewares/authorize';
import UserService, {
  TLoginParams,
  TRegisterParams,
} from '../../services/user';
import { loginValidations, registerValidations } from './validations';

const userService = new UserService();
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
  userService.getCurrentUser(req.user!.id).then(res.success).catch(next);
});

/**
 * @swagger
 * api/v1/user/register:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - User
 */
router.post(
  '/register',
  ...registerValidations,
  (req: Request<any, any, TRegisterParams>, res, next) => {
    const { email, password, name } = req.body;
    userService
      .register({ email, password, name })
      .then(res.success)
      .catch(next);
  }
);

/**
 * @swagger
 * api/v1/user/login:
 *   post:
 *     summary: Log a user in
 *     tags:
 *       - User
 */
router.post(
  '/login',
  ...loginValidations,
  (req: Request<any, any, TLoginParams>, res, next) => {
    const { email, password } = req.body;
    userService.login({ email, password }).then(res.success).catch(next);
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
  userService
    .unregister(req.user!.id)
    .then(() => res.success(null))
    .catch(next);
});

export default router;
