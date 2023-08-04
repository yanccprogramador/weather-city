import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 50 })
  lat: string;
  @Column({ length: 50 })
  lon: string;
  @Column({ length: 50 })
  username: string;
  @ManyToOne(() => User, (user) => user.cities)
  user: User;
}
