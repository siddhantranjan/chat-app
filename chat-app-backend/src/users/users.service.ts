import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UpdateUser } from './dtos/update-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create({ email, username, firstName, lastName, password, phoneNo }) {
    const user = this.repo.create({
      email,
      username,
      firstName,
      lastName,
      password,
      phoneNo,
    });

    return this.repo.save(user);
  }

  async findOne(id) {
    const user = this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    return user;
  }

  async findAll(email: string) {
    return this.repo.find({ email });
  }

  async getAllUser() {
    return this.repo
      .createQueryBuilder()
      .select([
        'username AS username',
        'email AS email',
        'firstName AS firstName',
        'lastName AS lastName',
      ])
      .getRawMany();
  }

  async findAllIds(id: any[]) {
    return this.repo
      .createQueryBuilder()
      .select([
        'id AS id',
        'username AS username',
        'firstName AS firstName',
        'lastName as lastName',
      ])
      .where('id IN (:...id)', { id })
      .getRawMany();
  }

  async findUsername(username: string) {
    return this.repo.find({ username });
  }

  async update(id, attrs: UpdateUser) {
    const user = await this.findOne(id);
    let newHashedPassword: Buffer;
    let salt: string;

    if (attrs.password) {
      salt = user.password.split('.')[0];
      newHashedPassword = (await scrypt(attrs.password, salt, 32)) as Buffer;
    }

    attrs.password = salt + '.' + newHashedPassword.toString('hex');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(user: User) {
    return this.repo.remove(user);
  }
}
