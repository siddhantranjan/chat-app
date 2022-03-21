import { IsEmail, IsString } from 'class-validator';

export class UserSignIn {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
