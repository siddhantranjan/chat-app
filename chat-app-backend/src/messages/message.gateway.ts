import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { RoomService } from './service/room/room.service';
import { ConnectedUserService } from './service/connected-user/connectedUser.service';
import { JoinedRoomService } from './service/joined-room/joinedRoom.service';
import { MessagesService } from './service/messages/messages.service';
import { join } from 'path';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class MessageGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private userService: UsersService,
    private roomService: RoomService,
    private connectedUserService: ConnectedUserService,
    private joinedRoomService: JoinedRoomService,
    private messagesService: MessagesService,
  ) {}

  @WebSocketServer() server: Server;

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedRoomService.deleteAll();
  }

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: any): void {
    this.server.to(client.handshake.query.roomId).emit('msgToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, room: any) {
    const messages = await this.messagesService.findMessagesForRoom(
      room.body.id,
      {
        limit: '',
        page: '',
      },
    );

    await this.joinedRoomService.create({
      socketId: client.id,
      user: JSON.parse(JSON.stringify(client.data.user)),
      room: room.body,
    });
    await this.server.to(client.id).emit('messages', [...messages.items]);
  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(client: Socket) {
    await this.joinedRoomService.deleteBySocketId(client.id);
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(client: Socket, room: any) {
    const createRoom = await this.roomService.createRoom(
      room,
      client.data.user,
    );

    for (const user of createRoom.users) {
      const connections = await this.connectedUserService.findByUser(user);
      const rooms = await this.roomService.getRoomsForUser(user.id, {
        page: 1,
        limit: 10,
      });

      for (const connection of connections) {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(client: Socket, messageBody: any) {
    messageBody = messageBody.body;
    const createdMessage: any = await this.messagesService.create({
      ...messageBody,
      user: JSON.parse(JSON.stringify(client.data.user)),
    });
    const room = await this.roomService.getRoom(createdMessage.room.id);
    const joinedUsers: any[] = await this.joinedRoomService.findByRoom(room);

    const message = { ...createdMessage };

    for (const user of joinedUsers) {
      await this.server.to(user.socketId).emit('messageAdded', message);
    }
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(client: Socket, page) {
    const rooms = await this.roomService.getRoomsForUser(
      client.data.user.id,
      this.handleIncomingPageRequest(page),
    );
    return this.server.to(client.id).emit('rooms', rooms);
  }

  async handleDisconnect(client: Socket) {
    await this.connectedUserService.deleteBySocketId(client.id);
    client.disconnect();
  }

  async handleConnection(client: Socket) {
    const userId: any = client.handshake.query.userId;
    const user = await this.userService.findOne(userId);
    client.data.user = user;
    const rooms = await this.roomService.getRoomsForUser(user.id, {
      page: 1,
      limit: 10,
    });
    await this.connectedUserService.create({ socketId: client.id, user });
    return this.server.to(client.id).emit('rooms', rooms);
  }

  private handleIncomingPageRequest(page) {
    page.limit = page.limit > 100 ? 100 : page.limit;
    return page;
  }
}
