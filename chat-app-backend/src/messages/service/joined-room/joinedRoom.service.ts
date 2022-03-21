import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedRoom } from 'src/messages/entity/joined-room/joinedRoom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectRepository(JoinedRoom) private repo: Repository<JoinedRoom>,
  ) {}

  async create(joinedRoom: any) {
    return this.repo.save(joinedRoom);
  }

  async findByUser(user: any) {
    return this.repo.find({ user });
  }

  async findByRoom(room: any) {
    return this.repo.find({ room });
  }

  async deleteBySocketId(socketId: string) {
    return this.repo.delete({ socketId });
  }

  async deleteAll() {
    await this.repo.createQueryBuilder().delete().execute();
  }
}
