import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Relationship } from './entities/relationship.entity';

@Injectable()
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship) private repo: Repository<Relationship>,
  ) {}

  create(sender, recepient, status) {
    const relation = this.repo.create({ sender, recepient, status });
    return this.repo.save(relation);
  }

  findRelation(senderId, recepientId) {
    return this.repo
      .createQueryBuilder()
      .select([
        'id AS id',
        'status AS status',
        'senderId AS sender',
        'recepientId AS recepient',
      ])
      .where('senderId IN (:...sender)', { sender: [senderId, recepientId] })
      .andWhere('recepientId IN (:...recepient)', {
        recepient: [senderId, recepientId],
      })
      .getRawOne();
  }

  findAllRelation(status: string, id: number) {
    return this.repo
      .createQueryBuilder()
      .select([
        'id AS id',
        'status AS status',
        'senderId AS sender',
        'recepientId AS recepient',
      ])
      .where('status = :status', { status })
      .andWhere(
        new Brackets((qb) => {
          qb.where('recepientId = :id', { id }).orWhere('senderId = :id', {
            id,
          });
        }),
      )
      .getRawMany();
  }

  async update(sender, recepient, status) {
    const relation = await this.findRelation(sender, recepient);

    if (!relation) {
      throw new NotFoundException('Relation not found');
    }

    if (sender === relation.recepient && relation.status === 'blocked') {
      throw new UnauthorizedException('Invalid Operation');
    }

    Object.assign(relation, { sender, recepient, status });
    return this.repo.save(relation);
  }

  async deleteAll() {
    await this.repo.createQueryBuilder().delete().execute();
  }
}
