import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  return res.success({ value: Math.random() * 10 });
});

export default router;
