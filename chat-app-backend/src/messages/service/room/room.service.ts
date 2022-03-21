import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Room } from 'src/messages/entity/room/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private repo: Repository<Room>) {}

  async createRoom(room: any, creater: any) {
    const newRoom = await this.addUserToRoom(room, creater);
    newRoom['sourceId'] = creater.id;
    return this.repo.save(newRoom);
  }

  async getRoom(roomId: number) {
    const rooms = await this.repo.findOne(roomId, { relations: ['users'] });

    if (!rooms) {
      throw new NotFoundException('Room not found');
    }
    return rooms;
  }

  async getRoomsForUser(userId: number, options: IPaginationOptions) {
    const query = this.repo
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updated_at', 'DESC');

    return paginate(query, options);
  }

  async addUserToRoom(room: any, creater: any) {
    room.users.push(creater);
    return room;
  }
}
