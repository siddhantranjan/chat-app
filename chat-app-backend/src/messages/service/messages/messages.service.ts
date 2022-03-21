import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Messages } from 'src/messages/entity/messages/messages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Messages) private repo: Repository<Messages>) {}

  async create(message: any) {
    const newMessage = this.repo.create(message);
    return this.repo.save(newMessage);
  }

  async findMessagesForRoom(roomId: any, options: IPaginationOptions) {
    const query = this.repo
      .createQueryBuilder('messages')
      .leftJoin('messages.room', 'room')
      .where('room.id = :roomId', { roomId })
      .leftJoinAndSelect('messages.user', 'user')
      .orderBy('messages.created_at', 'ASC');

    return paginate(query, options);
  }
}
