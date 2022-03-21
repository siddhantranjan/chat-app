import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUser } from './dtos/create-use.dto';
import { UpdateUser } from './dtos/update-user.dto';
import { UserSignIn } from './dtos/user-signin.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Serialize(UserDto)
  @Get('/all')
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(
    @Body() body: UserSignIn,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, accessToken } = await this.authService.login(body);
    response.cookie('token', accessToken, { httpOnly: true });
    return user;
  }

  @Serialize(UserDto)
  @Post('/signup')
  async signUp(
    @Body() body: CreateUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, accessToken } = await this.authService.signUp(body);
    response.cookie('token', accessToken, { httpOnly: true });

    return user;
  }

  @Get('/signout')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', null, { httpOnly: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async removeUser(@Param('id') id: string, @Request() req) {
    const currentUser = req.user;

    if (currentUser.userId !== parseInt(id)) {
      throw new UnauthorizedException('Invalid operation');
    }

    const user = await this.usersService.findOne(id);
    return this.usersService.remove(user);
  }

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() attrs: UpdateUser,
    @Request() req,
  ) {
    const currentUser = req.user;

    if (currentUser.userId !== parseInt(id)) {
      throw new UnauthorizedException('Invalid operation');
    }

    return this.usersService.update(id, attrs);
  }
}
