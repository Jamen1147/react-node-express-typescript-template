import { Router } from 'express';
import authorize from '../../middlewares/authorize';
import validations from './validation';
import handlers from './handlers';

const router = Router();

router.get('/me', authorize, handlers.getMe);

router.post('/', ...validations, handlers.register);

router.delete('/', authorize, handlers.unregister);

export default router;
