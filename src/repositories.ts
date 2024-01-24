import { Repository } from 'typeorm';
import { AppDataSource } from './data-source';
import User from './entities/User.entity';
import { LocationEntity } from './entities/Location.entity';

export const userRepo: Repository<User> =  AppDataSource.getRepository(User);

export const locationRepo: Repository<LocationEntity> =  AppDataSource.getRepository(LocationEntity);
