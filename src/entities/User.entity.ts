import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')

export default class User{

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({length: 50})
  name: string;

  @Column({length: 50, unique: true})
  phoneNumber: string;

  @Column({length: 50, unique: true})
  email: string;
}
