import { Router, Request, Response } from 'express';

const router = Router();

router.get('/ServerHealth', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

module.exports = router;
