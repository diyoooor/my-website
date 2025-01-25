import { Router, Request, Response } from 'express';

const router = Router();

router.get('/check', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

export default router;
