import { Router } from 'express';
import authorize from '../../middlewares/authorize';
import validations from './validation';
import handlers from './handlers';

const router = Router();

router.post('/login', ...validations, handlers.login);

router.get('/logout', authorize, handlers.logout);

router.get('/refresh', handlers.refresh);

export default router;
