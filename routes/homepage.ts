import { Request, Response } from 'express';
import { Router } from 'express';

export const homepageRoute = Router();

homepageRoute.get('/', (req: Request, res: Response) => {
  res.render('../views/index.njk', {
    data: {
      title: 'Homepage',
    }
  });
});