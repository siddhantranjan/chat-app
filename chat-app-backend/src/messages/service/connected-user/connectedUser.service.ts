import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUser } from 'src/messages/entity/connected-user/connectedUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUser) private repo: Repository<ConnectedUser>,
  ) {}

  async create(connectedUser: any) {
    return this.repo.save(connectedUser);
  }

  async findByUser(user: any) {
    return this.repo.find({ user });
  }

  async deleteBySocketId(socketId: string) {
    return this.repo.delete({ socketId });
  }

  async deleteAll() {
    await this.repo.createQueryBuilder().delete().execute();
  }
}
