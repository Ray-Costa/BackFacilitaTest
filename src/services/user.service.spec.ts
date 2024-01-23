import { Repository } from 'typeorm';
import { UserService } from './user.service';

jest.mock('../repositories', () => {
  let mockedUser = {
    name: 'John Doe',
    email: 'email',
    phoneNumber: '123456789',
  };

  const mockRepositorySave = jest.fn().mockResolvedValue(mockedUser);
  const mockRepositoryQuery = jest.fn().mockResolvedValue([mockedUser]);
  const mockRepositoryFindOne = jest.fn().mockResolvedValue(mockedUser);

  return {
    userRepo: {
      save: mockRepositorySave,
      query: mockRepositoryQuery,
      findOne: mockRepositoryFindOne,
    },
    mockRepositorySave,
    mockRepositoryQuery,
    mockRepositoryFindOne,
  };
});

describe('UserService', () => {
  let mockedUser = {
    name: 'John Doe',
    email: 'email',
    phoneNumber: '123456789',
  };

  const service = new UserService();

  it('should create a user', async () => {
    const result = await service.createUser(mockedUser);

    expect(result).toEqual(mockedUser);
  });

  it('should read all users', async () => {
    const result = await service.readUsers({});

    expect(result).toEqual([mockedUser]);
  });

  it('should read all users with filters', async () => {
    const result = await service.readUsers({ name: 'John Doe', email: 'email', phoneNumber: '123456789' });

    expect(result).toEqual([mockedUser]);
  });

  it('should read a user by id', async () => {
    const result = await service.readUserByID(1);

    expect(result).toEqual(mockedUser);
  });
});
