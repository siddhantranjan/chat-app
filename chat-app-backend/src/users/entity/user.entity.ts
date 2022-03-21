import { ConnectedUser } from 'src/messages/entity/connected-user/connectedUser.entity';
import { JoinedRoom } from 'src/messages/entity/joined-room/joinedRoom.entity';
import { Messages } from 'src/messages/entity/messages/messages.entity';
import { Room } from 'src/messages/entity/room/room.entity';
import { Relationship } from 'src/relationship/entities/relationship.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  phoneNo: number;

  @OneToMany(
    () => Relationship,
    (Relationship) => Relationship.sender || Relationship.recepient,
  )
  relation: Relationship[];

  @OneToMany(() => ConnectedUser, (connection) => connection.user)
  connections: ConnectedUser[];

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  @OneToMany(() => JoinedRoom, (joinedRoom) => joinedRoom.room)
  joinedRooms: JoinedRoom[];

  @OneToMany(() => Messages, (messages) => messages.user)
  messages: Messages[];
}
