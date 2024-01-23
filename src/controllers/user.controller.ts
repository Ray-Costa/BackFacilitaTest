import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import User from '../entities/User.entity';


export class UserController {
  constructor(
    private usersServices: UserService
  ) {}

  public async createUser(req:Request, res: Response): Promise<Response> {

    const user: User = await this.usersServices.createUser(req.body)

    return res.status(201).json(user)
  }
  public async readUsers(req:Request, res: Response): Promise<Response> {
    const queryParams = req.query

    const user: User[] = await this.usersServices.readUsers(queryParams)

    return res.status(200).json(user)
  }
  public async readUserById(req:Request, res: Response): Promise<Response> {

    const user: User= await this.usersServices.readUserByID(Number(req.params.userId))

    return res.status(200).json(user)
  }
}
