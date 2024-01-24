import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User.entity';

@Entity('location')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @OneToOne(() => User)
  user: User;
}
