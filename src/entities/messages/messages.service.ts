import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import MessageDto from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(private usersService: UsersService) {}

  async addNotification(messageInput: MessageDto) {
    return await this.usersService.addNotification(messageInput.addressee, {
      notifications: messageInput,
    });
  }

  async sendMessage(messageInput: MessageDto) {
    await this.usersService.update(messageInput.sender, {
      message: messageInput,
    });

    return await this.addNotification(messageInput);
  }

  async getMessageByEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    console.log(user.message);
    return user.message;
  }
}
