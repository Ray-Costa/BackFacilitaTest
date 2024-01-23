import User from '../entities/User.entity';
import AppError from '../errors/AppError.error';
import { userRepo } from '../repositories';

export class UserService {
  public async createUser(data: Omit<User, 'id'>): Promise<User> {

    const [result] = await userRepo.query('INSERT INTO users (name, email, "phoneNumber") VALUES ($1, $2, $3) RETURNING id', [data.name, data.email, data.phoneNumber]);

    return this.readUserByID(result.id);
  };

  public async readUsers(queryParams: any): Promise<User[]> {
    const { name, email, phoneNumber } = queryParams;

    const baseQuery = `SELECT *
                       FROM users`;

    if (!name && !email && !phoneNumber) {
      const users: User[] = await userRepo.query(baseQuery);

      return users;
    }

    const completeQuery = this.buildQueryWithFilters(baseQuery, name, email, phoneNumber);

    const users: User[] = await userRepo.query(completeQuery);

    return users;
  };

  public async readUserByID(userId: number): Promise<User> {

    const user: User | null = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  };

  private buildQueryWithFilters(baseQuery: string, name: string, email: string, phoneNumber: string) {
    const query = `${baseQuery} WHERE`;

    const conditions: string[] = [];

    if (name) {
      conditions.push(`UPPER(name) = '${name.toUpperCase()}'`);
    }

    if (email) {
      conditions.push(`UPPER(email) = '${email.toUpperCase()}'`);
    }

    if (phoneNumber) {
      conditions.push(`phoneNumber = '${phoneNumber}'`);
    }

    return `${query} ${conditions.join(' AND ')}`;
  }
}

