import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  phoneNo: number;
}
