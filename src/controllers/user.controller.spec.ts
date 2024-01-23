import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  const controller = new UserController(new UserService());

  it('should create a user', async () => {
    const createUserServiceMock = UserService.prototype.createUser = jest.fn();

    const mockUser = {
      name: 'John Doe',
      email: 'mock@email.com',
      phoneNumber: '123456789',
    };

    const req = {
      body: mockUser,
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await controller.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(createUserServiceMock).toHaveBeenCalledWith(mockUser);
  });

  it('should get all users', async () => {
    const getAllUsersServiceMock = UserService.prototype.readUsers = jest.fn();

    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await controller.readUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(getAllUsersServiceMock).toHaveBeenCalled();
  });

  it('should get a user by id', async () => {
    const getUserByIdServiceMock = UserService.prototype.readUserByID = jest.fn();

    const req = {
      params: {
        userId: 1,
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await controller.readUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(getUserByIdServiceMock).toHaveBeenCalledWith(1);
  });
});
