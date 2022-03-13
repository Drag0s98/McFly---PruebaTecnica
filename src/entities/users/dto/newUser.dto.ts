import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class NewUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsObject()
  @IsNotEmpty()
  name: string;

  @IsString()
  aboutMe?: string;
}
