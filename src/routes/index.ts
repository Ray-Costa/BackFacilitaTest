import {Router} from 'express';
import { userRouter } from './user.router';
import { locationRouter } from './location.router';

export const routes: Router = Router();

routes.use('/users', userRouter);
routes.use('/location-routes', locationRouter);
