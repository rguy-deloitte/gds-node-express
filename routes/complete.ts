import { Request, Response } from 'express';
import { Router } from 'express';

export const completeRoute = Router();

completeRoute.get('/complete', (req: Request, res: Response) => {
  res.render('../views/complete.njk');
});