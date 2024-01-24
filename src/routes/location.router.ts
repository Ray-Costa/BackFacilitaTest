import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';

export const locationRouter: Router = Router();

const userController = new UserController(new UserService());

locationRouter.get('/', (req, res) => userController.calculateRoute(req, res));

