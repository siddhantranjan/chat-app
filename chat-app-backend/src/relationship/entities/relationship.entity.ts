import { User } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['sender', 'recepient'])
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (User) => User.id)
  sender: number;

  @ManyToOne(() => User, (User) => User.id)
  recepient: number;

  @Column()
  status: string;
}
