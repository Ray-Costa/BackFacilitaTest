import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocationEntity } from './Location.entity';

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  phoneNumber: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ nullable: true })
  locationId: number;

  @OneToOne(() => LocationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'locationId', referencedColumnName: 'id'})
  location: LocationEntity;
}
