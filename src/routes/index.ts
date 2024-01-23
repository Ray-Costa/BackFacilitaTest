import {Router} from 'express';
import { userRouter } from './user.router';

export const routes: Router = Router();

routes.use('/users', userRouter);
