import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  return res.success({ today: 'cloudy' });
});

export default router;
