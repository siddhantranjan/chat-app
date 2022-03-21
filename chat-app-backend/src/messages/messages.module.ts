import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessagesService } from './service/messages/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entity/messages/messages.entity';
import { Room } from './entity/room/room.entity';
import { ConnectedUser } from './entity/connected-user/connectedUser.entity';
import { JoinedRoom } from './entity/joined-room/joinedRoom.entity';
import { UsersModule } from 'src/users/users.module';
import { RoomService } from './service/room/room.service';
import { JoinedRoomService } from './service/joined-room/joinedRoom.service';
import { ConnectedUserService } from './service/connected-user/connectedUser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Messages, Room, ConnectedUser, JoinedRoom]),
    UsersModule,
  ],
  providers: [
    MessageGateway,
    MessagesService,
    RoomService,
    JoinedRoomService,
    ConnectedUserService,
  ],
  exports: [MessageGateway],
})
export class MessagesModule {}
