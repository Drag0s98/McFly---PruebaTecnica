import { IsOptional, IsString } from 'class-validator';
import { MessageDto } from 'src/entities/messages/dto/message.dto';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;

  @IsString()
  @IsOptional()
  message?: MessageDto;

  @IsString()
  @IsOptional()
  notifications?: MessageDto;
}
