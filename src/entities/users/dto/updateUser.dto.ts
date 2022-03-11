import MessageDto from 'src/entities/messages/dto/message.dto';

export class UpdateUserDto {
  username?: string;
  password?: string;
  name?: string;
  aboutMe?: string;
  message?: MessageDto;
  notifications?: MessageDto;
}
