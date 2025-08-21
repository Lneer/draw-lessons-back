import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../user.type';

export class CreateUserDto implements IUser {
  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  @IsString()
  user_password: string;
}
