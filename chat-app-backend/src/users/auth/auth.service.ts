import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from '../dtos/create-use.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const [user] = await this.userService.findAll(email);

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    const [salt, storedHashedPassword] = user.password.split('.');
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHashedPassword !== hashedPassword.toString('hex')) {
      throw new BadRequestException('Invalid Password');
    }

    return user;
  }

  async login(credentials: any) {
    const [user] = await this.userService.findAll(credentials.username);

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    const payload = { username: credentials.username, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async signUp(body: CreateUser) {
    const users = await this.userService.findAll(body.email);

    if (users.length) {
      throw new BadRequestException('Email Already exist');
    }

    const usernameExist = await this.userService.findUsername(body.username);

    if (usernameExist.length) {
      throw new BadRequestException('Username already exist;');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');
    body.password = hashedPassword;

    const user = await this.userService.create(body);

    const payload = { username: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
