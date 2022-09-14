import express from 'express';
import { homepageRoute } from './homepage';
import { formRoute } from './form';
import { completeRoute } from './complete';

export const routes = express.Router();

routes.use(homepageRoute);
routes.use(formRoute);
routes.use(completeRoute);