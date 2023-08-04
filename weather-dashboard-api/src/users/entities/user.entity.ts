import { City } from '../../cities/entities/city.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 50 })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => City, (city) => city.user)
  cities: City[];
}
