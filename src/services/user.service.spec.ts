import { UserService } from './user.service';
import { userRepo } from '../repositories';

describe('UserService', () => {
  const service = new UserService();
  let mockedUser = {
    name: 'John Doe',
    email: 'email',
    phoneNumber: '123456789',
  };

  const mockRepositorySave = jest.fn().mockResolvedValue(mockedUser);
  const mockRepositoryQuery = jest.fn().mockResolvedValue([mockedUser]);

  it('should create a user', async () => {
    userRepo.save = mockRepositorySave;

    const result = await service.createUser(mockedUser);

    expect(result).toEqual(mockedUser);
    expect(mockRepositorySave).toHaveBeenCalledWith(mockedUser);
  });

  it('should read all users', async () => {
    userRepo.query = mockRepositoryQuery;

    const result = await service.readUsers({});

    expect(result).toEqual([mockedUser]);
    expect(mockRepositoryQuery).toHaveBeenCalledWith('SELECT * FROM users');
  });

  it('should read all users with filters', async () => {
    userRepo.query = mockRepositoryQuery;

    const result = await service.readUsers({ name: 'John Doe', email: 'email', phoneNumber: '123456789' });

    expect(result).toEqual([mockedUser]);
    expect(mockRepositoryQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE UPPER(name) = \'JOHN DOE\' AND UPPER(email) = \'EMAIL\' AND phoneNumber = \'123456789\'');
  });

  it('should read a user by id', async () => {
    userRepo.findOne = jest.fn().mockResolvedValue(mockedUser);

    const result = await service.readUserByID(1);

    expect(result).toEqual(mockedUser);
  });
});
