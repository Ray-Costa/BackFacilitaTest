import User from '../entities/User.entity';
import AppError from '../errors/AppError.error';
import { locationRepo, userRepo } from '../repositories';
import { LocationEntity } from '../entities/Location.entity';
import { userRouter } from '../routes/user.router';

const companyLocation = { x: 0, y: 0 } as LocationEntity;

export class UserService {


  calculateDistance(location1: LocationEntity, location2: LocationEntity): number {
    return Math.sqrt((location1.x - location2.x) ** 2 + (location1.y - location2.y) ** 2);
  }

  calculateTotalDistance(route: User[]): number {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += this.calculateDistance(route[i].location, route[i + 1].location);
    }

    // Adiciona a distância de volta para a empresa
    totalDistance += this.calculateDistance(route[route.length - 1].location, companyLocation);

    return totalDistance;
  }

  nearestNeighborAlgorithm(customers: User[]): User[] {
    const unvisitedCustomers = [...customers];
    const initialCustomer = unvisitedCustomers.splice(0, 1)[0];
    let currentLocation = initialCustomer.location;
    const route: User[] = [initialCustomer];

    while (unvisitedCustomers.length > 0) {
      let nearestCustomer: User | null = null;
      let minDistance = Number.MAX_SAFE_INTEGER;

      for (const customer of unvisitedCustomers) {
        const distance = this.calculateDistance(currentLocation, customer.location);

        if (distance < minDistance) {
          minDistance = distance;
          nearestCustomer = customer;
        }
      }

      if (nearestCustomer) {
        route.push(nearestCustomer);
        currentLocation = nearestCustomer.location;
        unvisitedCustomers.splice(unvisitedCustomers.indexOf(nearestCustomer), 1);
      }
    }

    return route;
  }

  public async createUser({ email, phoneNumber, name, x, y }: {
    email: string;
    phoneNumber: string;
    name: string;
    x: string;
    y: string;
  }): Promise<User> {

    const [location] = await locationRepo.query('INSERT INTO location ("x", "y") VALUES ($1, $2) RETURNING id', [x, y]);
    const [result] = await userRepo.query('INSERT INTO users (name, email, "phoneNumber", "locationId") VALUES ($1, $2, $3, $4) RETURNING id', [name, email, phoneNumber, location.id]);

    return this.readUserByID(result.id);
  };

  public async readUsers(queryParams: any): Promise<User[]> {
    const { term } = queryParams;

    const baseQuery = `SELECT *
                       FROM users u
                                LEFT JOIN location l ON u."locationId" = l.id`;

    if (!term) {
      const users: User[] = await userRepo.query(baseQuery);

      return users;
    }

    const completeQuery = this.buildQueryWithFilters(baseQuery, term);

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

  async calculateRoute(): Promise<{
    route: User[];
    totalDistance: number;
  }> {
    const users = await userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.location', 'location') // Inner join with 'location' relation
      .getMany();

    const optimizedRoute = this.nearestNeighborAlgorithm(users);

    const totalDistance = this.calculateTotalDistance(optimizedRoute);

    return { route: optimizedRoute, totalDistance };
  }

  private buildQueryWithFilters(baseQuery: string, term: string) {
    const query = `${baseQuery} WHERE`;

    const conditions: string[] = [];

    conditions.push(`name iLike '%${term}%'`);
    conditions.push(`email iLike '%${term}%'`);
    conditions.push(`"phoneNumber" iLike '%${term}%'`);
    conditions.push(`"x" iLike '%${term}%'`);
    conditions.push(`"y" iLike '%${term}%'`);

    return `${query} ${conditions.join(' OR ')}`;
  }
}


