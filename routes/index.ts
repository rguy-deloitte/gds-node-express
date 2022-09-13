import express from 'express';
import { homepageRoute } from './homepage';
import { formRoute } from './form';

export const routes = express.Router();

routes.use(homepageRoute);
routes.use(formRoute);