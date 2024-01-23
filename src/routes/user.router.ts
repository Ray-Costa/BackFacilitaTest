import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

export const userRouter: Router = Router();

const userController = new UserController(new UserService());

userRouter.post('/', (req, res) => userController.createUser(req, res));
userRouter.get('/', (req, res) => userController.readUsers(req, res));
userRouter.get('/:userId', (req, res) => userController.readUserById(req, res));

